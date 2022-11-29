const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer:{
    port:8081,
    proxy:{
      '/api':{
        target:'http://127.0.0.1:3000',// 请求的目标服务器接口,内网穿透用http://114.132.201.62:3000，本地访问用：http://127.0.0.1:3000
        changeOrigin:true,// 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRewwrite:{ // 重写请求  
          '^/api':'/api'// 替换target中的请求地址，也就是说在请求http://127.0.0.1:8888/XXXXX这个地址的时候直接写成/api即可。
        }
      }
    }
  },
  lintOnSave:false,
})
