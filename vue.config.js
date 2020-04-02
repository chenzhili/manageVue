const path = require("path")
const resolve = dir => {
    return path.join(__dirname, dir);
  };
module.exports = {
    devServer: {
        port: '8777',
        proxy: {
            '/': {
                target: 'http://112.19.171.231:1989/quotescenter/', //API服务器的地址
                ws: true,  //代理websockets
                changeOrigin: true, // 虚拟的站点需要更管origin
                // pathRewrite: {   //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
                //     '^/api': '/api'
                // }
            }
        }
    },
    // webpack相关配置
    chainWebpack: (config) => {
        config.entry.app = ['./src/main.js']
        config.resolve.alias
            .set('@', resolve('src'))
            .set('cps', resolve('src/components'))
    },
}