# dev 分支 是一个 完整的 管理端 vue 的 解决方案

## 20200406号遇到的问题 ======> 对于 我想在 vuex 中的 permission 中引入 对应的 路由配置值，始终无法引用到；
造成此问题的原因 是在 router/index.js 中 我其实 对于 store 中有引用 ，这时候 import 获取到的是 旧的值，这是相互引用导致的问题；
这种 引用说明 写法上就是有问题的；
ES6根本不会关心是否发生了"循环加载"，只是生成一个指向被加载模块的引用，需要开发者自己保证，真正取值的时候能够取到值

文件 src/whileTest 文件是对于 require 方式 的一个 检测；

循环引用 在 es6 和 commonjs 的处理是不同的；对于循环引用的解释：http://www.ruanyifeng.com/blog/2015/11/circular-dependency.html

## 为什么 store 中的 permission 的 加载顺序 在 最前面
感觉实在 request 和 router 中都进行引入了，这时候 routes 还没有 加入，这时候导致 state 的 值已经 附上，但是不是用的 引用对象，这里获取到了值(相当于只是值类型不存在引用)，这是 存入 permission 的 state 的 routes 就是 没有；

目前解决这个通过在 app.vue 中 重新 初始化路由；