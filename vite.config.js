import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import createImportPlugin from 'vite-plugin-import';
import path from 'path';

const pathResolve = (pathStr) => path.resolve(__dirname, pathStr);
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), createImportPlugin({
    onlyBuild: false, // 是否只需要在生产环境中使用
    babelImportPluginOptions: [
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'es', // or 'css'
      },
    ],
  })],

  server: {
    // host: 'localhost',
    port: 3030,
    proxy: {
      // 这里是通过请求/api 来转发到 https://api.pingping6.com/
      // 假如你要请求https://api.*.com/a/b
      // 那么axios的url，可以配置为 /api/a/b
      '^/api': {
        target: 'http://localhost:3000/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        // configure: (proxy, options) => {
        //   // proxy 是 'http-proxy' 的实例
        // }
      },
    },
  },
  css: {
    //* css模块化
    modules: { // css模块化 文件以.module.[css|less|scss]结尾
      generateScopedName: '[name]_[local]_[hash:base64:5]',
      hashPrefix: 'prefix',
    },
    //* 预编译支持less
    preprocessorOptions: {
      less: {
        // 支持内联 JavaScript
        javascriptEnabled: true,
        modifyVars: {
          '@primary-color': 'gold',
        },
      },
    },
  },
  resolve: {
    alias: [
      { find: /^~/, replacement: '' },
    ],
  },

});
