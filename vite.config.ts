import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import fs from 'fs';


const commonConfig = {
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
};


export default defineConfig(({ command, mode }) => {
  if (command === 'serve') {
    return {
      ...commonConfig,
      server: {
        https: {
          key: fs.readFileSync('C:/xampp/apache/crt/localhost/server.key'),
          cert: fs.readFileSync('C:/xampp/apache/crt/localhost/server.crt'),
        },
      },

    }
  }else{
    return {
      ...commonConfig,
      build: {
        root: 'src',
        outDir: 'docs'
      },

    }
  }

})










// https://vitejs.dev/config/
// export default defineConfig({

//   plugins: [vue(), vueJsx()],
//   resolve: {
//     alias: {
//       '@': fileURLToPath(new URL('./src', import.meta.url))
//     }
//   },
//   build: {
//     root: 'src',
//     outDir: 'docs'
//   },
//   server: {
//     https: {
//       key: fs.readFileSync('C:/xampp/apache/crt/localhost/server.key'),
//       cert: fs.readFileSync('C:/xampp/apache/crt/localhost/server.crt'),
//     },
//   },
// })

