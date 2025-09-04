// vite.config.ts
import { defineConfig } from 'vite'
import { resolve } from 'path' // Node.jsのpathモジュールをインポート

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        // ここに各HTMLファイルを登録する
        main: resolve(__dirname, 'index.html'),
        // counter: resolve(__dirname, '01-counter.html'),
        // todoList: resolve(__dirname, '02-todo-list.html'),
        // omikuji: resolve(__dirname, '03-omikuji.html'),
        calculator: resolve(__dirname, '04-calculator.html'),
        // formValidation: resolve(__dirname, '05-form-validation.html'),
      },
    },
  },
})