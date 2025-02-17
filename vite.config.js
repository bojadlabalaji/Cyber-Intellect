import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Cyber-Intellect/', // Add this line
  server: {
    port: 5000, // Specify the port here
    proxy: {
      '/api': {
        target: 'http://localhost:5050',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
// module.exports = {
//   publicPath: process.env.NODE_ENV === "production" ? "/Cyber-Intellect/" : "/",
// };
