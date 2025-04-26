import { defineConfig } from 'vite';

// ✅ Tell Vite to treat ethers correctly
export default defineConfig({
  optimizeDeps: {
    include: ['ethers']
  }
});