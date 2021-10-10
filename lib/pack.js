const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const { transformFromAst } = require('@babel/core');

function createAsset(filename) {
  const content = fs.readFileSync(filename, 'utf-8');
  const ast = parser.parse(content, {
    sourceType: 'module',
  });

  const dependencies = [];
  traverse(ast, {
    ImportDeclaration: ({ node }) => {
      dependencies.push(node.source.value);
    },
  });

  const { code } = transformFromAst(ast, null, {
    presets: ['@babel/preset-env'],
  });

  return {
    filename,
    dependencies,
    code,
  };
}

function createGraph(entry) {
  const entryAsset = createAsset(entry);

  const assetMap = {
    [entry]: entryAsset,
  };
  const queue = [entryAsset]; // queue 用来递归遍历所有模块及模块的依赖

  for (const asset of queue) {
    asset.mapping = {};

    const dirname = path.dirname(asset.filename);

    asset.dependencies.forEach((sourcePath) => {
      // sourcePath是该模块文件的相对位置，而filePath是根路径的相对位置
      // 只有filePath才能作为一个模块的唯一索引，存在assetMap中
      const filePath = './' + path.join(dirname, sourcePath);
      asset.mapping[sourcePath] = filePath;

      // 如果此模块未被处理
      if (!assetMap[filePath]) {
        const child = createAsset(filePath);
        queue.push(child);
        assetMap[filePath] = child;
      }
    });
  }

  return assetMap;
}

function bundle(graph, entry) {
  let modules = '';

  for (const key in graph) {
    const mod = graph[key];
    modules += `"${mod.filename}": [
        function (require, module, exports) { ${mod.code} },
        ${JSON.stringify(mod.mapping)},
      ],`;
  }

  const result = `
    (function (modules) {
        const module_cache = {};
        function require(id) {
          const [fn, mapping] = modules[id];
      
          function localRequire(name) {
            return require(mapping[name]);
          }
      
          const cachedModule = module_cache[id];
          if (cachedModule !== undefined) {
            return cachedModule.exports;
          }
      
          const module = (module_cache[id] = {
            exports: {},
          });
      
          fn(localRequire, module, module.exports);
      
          return module.exports;
        }
      
        require('${entry}');
    })({${modules}})
  `;

  return result;
}

const entry = './example/entry.js';
const graph = createGraph(entry);
const result = bundle(graph, entry);

fs.writeFileSync('output/index.js', result);
