# 初探 vue 的 全家桶 的使用 jS层面：vue 路由：vue-rotuer ，一样提供了钩子 函数 去获取 在 路由 从加载 到 销毁 过程 都 暴露了钩子 函数 复杂数据统一管理：Vuex ，其实思路 跟 redux 的 管理模式 很像，用 统一入口 放到 vue 的 全局上；

# 管理端参照网址 https://github.com/wdlhao/vue2-element-touzi-admin
这个项目对于 权限系统做到，页面 动态 载入的方式；并且对于 权限 按钮的 解决方案 是 按照 指令的方式解决；

# mockjs 的运用
简单理解为 可以 拦截 真是 请求 用 mock 的 数据替代，并且不会带有 侵入性，真是上线不会修改代码；

# 20200401 需要解决的问题 就是 集成 权限按钮组 以及 权限来异步 加载需要的 路由
权限按钮组实现： vue 的 指令 控制 按钮的显示；
权限加载路由：就是条件加载 路由，用 routerIns.addRoutes();

试着动态加入 页面；
注意点：当 动态 注入成功后，不要 重复的 在去 注入了，并且 vue-router 没有 提供删除的功能，本身也不需要

指令还未调研；注意绑定动态数据的实现