import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Layout from '../views/Layout/Layout.vue'

Vue.use(VueRouter)

const routes = [

    {
        path: '',
        redirect: '/Home'
    },
    {
        path: '/users',
        redirect: '/users/users'
    },
    {
        path: '/roles',
        redirect: '/rights/roles'
    },
    {
        path: '/rights',
        redirect: '/rights/rights'
    },
    {
        path: '/goods',
        redirect: '/goods/goods'
    },
    {
        path: '/params',
        redirect: '/goods/params'
    },
    {
        path: '/categories',
        redirect: '/goods/categories'
    },
    {
        path: '/orders',
        redirect: '/orders/orders'
    },
    {
        path: '/reports',
        redirect: '/reports/reports'
    },
    {
        path: '/addGoods',
        redirect: '/goods/addGoods'
    },
    {
        path: '/Home',
        component: Layout,
        meta: {
            icon: 'el-icon-s-home',
            name: 'Home',
        },
        children: [
            {
                path: '',
                name: 'Home',
                component: Home,
                meta: {
                    icon: 'el-icon-s-home'
                }
            },
        ]
    },

    {
        path: '/users',
        component: Layout,
        meta: {
            icon: 'el-icon-user',
            name: 'users',
        },
        children: [
            {
                path: '/users/users',
                name: 'users',
                component: () => import('../views/users.vue'),
                meta: {
                    icon: 'el-icon-user-solid'
                }
            }
        ]
    },

    {
        path: '/rights',
        component: Layout,
        meta: {
            icon: 'el-icon-folder',
            name: 'rights',
        },
        children: [
            {
                path: '/rights/roles',
                name: 'roles',
                component: () => import('../views/rights/roles.vue'),
                meta: {
                    icon: 'el-icon-s-custom'
                }
            },
            {
                path: '/rights/rights',
                name: 'rights',
                component: () => import('../views/rights/rights.vue'),
                meta: {
                    icon: 'el-icon-s-tools'
                }
            }
        ]
    },

    {
        path: '/goods',
        component: Layout,
        meta: {
            icon: 'el-icon-goods',
            name: 'goods',
        },
        children: [
            {
                path: '/goods/goods',
                name: 'goods',
                component: () => import('../views/goods/goods.vue'),
                meta: {
                    icon: 'el-icon-s-goods'
                }
            },
            {
                path: '/goods/params',
                name: 'params',
                component: () => import('../views/goods/params.vue'),
                meta: {
                    icon: 'el-icon-c-scale-to-original'
                }
            },
            {
                path: '/goods/categories',
                name: 'categories',
                component: () => import('../views/goods/categories.vue'),
                meta: {
                    icon: 'el-icon-date'
                }
            },
            {
                path: '/goods/addGoods',
                name: 'addGoods',
                component: () => import('../views/goods/addGoods.vue'),
            }
        ]
    },

    {
        path: '/orders',
        component: Layout,
        meta: {
            icon: 'el-icon-s-order',
            name: 'orders',
        },
        children: [
            {
                path: '/orders/orders',
                name: 'orders',
                component: () => import('../views/orders.vue'),
                meta: {
                    icon: 'el-icon-folder-add'
                }
            }
        ]
    },

    {
        path: '/reports',
        component: Layout,
        meta: {
            icon: 'el-icon-tickets',
            name: 'reports',
        },
        children: [
            {
                path: '/reports/reports',
                name: 'reports',
                component: () => import('../views/reports.vue'),
                meta: {
                    icon: 'el-icon-edit-outline'
                }
            }
        ]
    },

    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue')
    },
    {
        path: '*',
        name: 'Err',
        component: () => import('../views/Err')
    },
   
    // {
    //     path: '/addGoods',
    //     component: Layout,
    //     children: [
    //         {
    //             path: '/goods/addGoods',
    //             name: 'addGoods',
    //             component: () => import('../views/goods/addGoods.vue'),
    //         }
    //     ]
    // },
]

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router