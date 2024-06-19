const { defineConfig } = require('@vue/cli-service')
let path=require("path")
// const { config } = require('vue/types/umd')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath:'./',
  devServer: {
    proxy: {
      '/api': {
        target: "http://localhost:3000",
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      }
    },
  },
  configureWebpack:(config)=>{
	  config.resolve={
		  extensions:['.js','.json','.vue'],
		  alias:{
		  		  '@':path.resolve(__dirname,'./src'),
		  }
	  }
  }
})
