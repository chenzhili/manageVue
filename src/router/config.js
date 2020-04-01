/* 业务 组件路由的 配置 */
/* 
    ***********************
        注意：这里 所有 的 引用 的 component 写法 ，分为  两种情况：
        1、 async 为 false，直接 找 modules的 值 的 时候，就直接 写 关于 views 下的  路径，如： home.vue;
        2、没有 写 async 字段的 时候 或者 为 true，需要 给 完整路径，如 '@/views/home.vue' ,原因 就是 在 做 动态 引入的 时候 import() 中 不能识别 变量值
    ***********************
    const config = [
    {
        keyword: 'home', // path 和 name 用的
        query: ['id', 'test'], // url 传参用的, 如果 只有 一个 参数 可以 写 string
        component: "url-OtherHome", // 如果 没有 这个 就用 keyword
        async: false, //默认为 true
        components: [ // 这个的 优先级 最高，有这个 就直接用这个， 特别注意 这块的 的处理，分 两种 数据结构； components：[ {} | [] ]
            {
                component: 'url-A',// 这个是 默认的 视图名，对应的 组件，用 对应 的 views 目录的 路径
            },
            {
                component: 'url-B',
                viewName: 'b', //如果 这个没有显示 声明，就用 component 的 字符 ，并且 将 首字母 小写 ，如 view/About/about.vue => about
            }
        ],
        children: [
            {
                keyword: 'home', // path
                query: 'id', // 传参用的
                component: "url-OtherHome", // 如果 没有 这个 就用 keyword
                components: [ // 这个的 优先级 最高，有这个 就直接用这个
                    {
                        component: 'url-A',// 这个是 默认的 视图名，对应的 组件，用 对应 的 views 目录的 路径
                    },
                    {
                        component: 'url-B',
                        viewName: 'b', //如果 这个没有显示 声明，就用 component 的 字符 ，并且 将 首字母 小写 ，如 view/About/about.vue => about
                    }
                ],
            }
        ],
        beforeEnter: (to, from, next) => {}
    }
];
*/
// const routes = [
//   {
//     path: '/:id/:test',
//     name: 'Home',
//     components: {
//       default: () => import('../views/Home.vue'),
//       about: () => import(/* webpackChunkName: "about" */ '../views/About.vue')

//     }
//   },
//   {
//     path: '/about',
//     name: 'About',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
//   }
// ]
// 如果 路由的 数据 相对 比较多了 后，就以 单独模块 配置导入的方式
const config = [
    {
        keyword: 'login',
        component: () => import('@/views/Login.vue')
    },
    {
        keyword: 'home',
        query: ['id', 'test'],
        async: false,
        // 不存在 async 或者 async = true
        components: {
            default: () => import(/*  */'@/views/Home.vue'),
            about: () => import(/*  */'@/views/About.vue')
        }
        // async 为 false 用这个 
        // components: [
        //     {
        //         component: 'Home.vue',
        //         // async: false,
        //     },
        //     {
        //         component: 'About.vue',
        //         viewName: 'about',
        //         async: false,
        //     },
        //     {
        //         component: 'Test.vue',
        //         viewName: 'test',
        //         // async: false,
        //     }

        // ]
    },
    {
        keyword: 'about',
        component: () => import(/*  */'@/views/About.vue'),
        // async: false,
    },
    {
        keyword: 'test',
        exact: true,
        component:  () => import(/*  */'@/views/Test.vue'),
        redirect: "/test/child1",
        children: [
            {
                keyword: 'child1',
                component: 'About.vue',
                async: false
            },{
                keyword: 'child2',
                component: 'Home.vue',
                async: false
            },
        ]
    }
]

export default config;