import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
    server: {
    port: 5173,
    proxy: {
      // 클라이언트에서 /api로 시작하는 요청은 localhost:8080으로 전달
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        // (선택) /api → /api 매핑을 그대로 쓸 거면 rewrite 생략 가능
        rewrite: (path) => path,
      },
    },
  },
})
