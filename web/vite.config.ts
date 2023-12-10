import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/web/dist' : undefined,
  define: {
    global: 'window',
  },
  build: {
    sourcemap: false,
  },
  optimizeDeps: {
    esbuildOptions: {
      mainFields: ['module', 'main'],
      resolveExtensions: ['.js', '.jsx'],
    },
  },
<<<<<<< HEAD
  plugins: [tsconfigPaths(), react(), ,],
=======
  plugins: [tsconfigPaths(), react()],
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
}));
