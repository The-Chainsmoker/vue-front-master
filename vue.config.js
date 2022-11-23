const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    }
  },
  assetsDir: 'static',
  publicPath: process.env.NODE_ENV === 'production' ? './' :'/',
  pages: {
      index: {
          entry: 'src/main.js',
          title: 'front_admin'
      }
  },
  devServer: {
    proxy: {
        '/api': {
            target: 'http://183.6.102.87:8889/server/',
            ws: true,
            //changeOrigin是false：请求头中host仍然是浏览器发送过来的host；
            //如果设置成true：发送请求头中host会设置成target
            changeOrigin: true,
            pathRewrite: {
                //告诉接口要用代理. html, css, js这些静态资源不需要代理.
                '^/api': ''
            }
        }
    },

    // 开启https 访问时使用https://172.31.120.61:8081
    // https://localhost:8081 也可以访问，不过自带info请求会报错 不清楚具体原因
    https: false
},
})
