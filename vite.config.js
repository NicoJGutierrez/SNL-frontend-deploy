import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  /* En caso de no funcionar borrar lo siguiente*/
  server: {
    watch: {
      usePolling: true,
    }
  },
})
