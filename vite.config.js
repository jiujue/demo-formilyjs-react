import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

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
});
