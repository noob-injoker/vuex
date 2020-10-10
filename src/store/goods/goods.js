import api from '../../http/api'
import { Message } from 'element-ui'
import router from '../../router'

export default {
    namespaced: true,   //开启命名空间：这个文件就是单独的一个vuex的模块

    state: {
        goodsList: [],  //商品列表
        total: 0,
    },
    mutations: {
        setGoods(state, data) {
            state.goodsList = data
        },
        setTotal(state, data) {
            state.total = data
        },

    },
    actions: {
        async getGoods({ commit }, { query, pagenum, pagesize }) { // 编辑提交角色
            try {
                let res = await api.getGoods({ query, pagenum, pagesize })
                console.log(res);
                if (res.meta.status === 200) {
                    res.data.goods.map((item, index) => {
                        item.num = index + 1
                    })
                    //提交mutation
                    commit('setGoods', res.data.goods)
                    commit('setTotal', res.data.total)
                }
            } catch (err) {
                console.log(err);
            }
        },
        async Addgoods({ dispatch }, { goods_name, goods_cat, goods_price, goods_number, goods_weight, goods_introduce, pics, attrs, }) {
            //添加商品
            try {
                let res = await api.Addgoods({ goods_name, goods_cat, goods_price, goods_number, goods_weight, goods_introduce, pics, attrs, })
                // console.log(res);
                if (res.meta.status === 201) {
                    Message.success(res.meta.msg)
                    //调用获取商品的接口
                    // dispatch('getGoods', {
                    //     pagenum,
                    //     pagesize,
                    //     query
                    // })
                    router.push('/goods')
                    console.log(dispatch);
                } else {
                    Message.error(res.meta.msg)
                }
            } catch (err) {
                console.log(err);
            }
        },
        async deleteGoods({ dispatch }, { id, pagenum, pagesize, query }) { //删除商品
            try {
                let res = await api.deleteGoods({
                    id, pagenum,
                    pagesize,
                    query
                })
                console.log(res);
                if (res.meta.status === 200) {
                    Message.success(res.meta.msg)
                    dispatch('getGoods', {
                        pagenum,
                        pagesize,
                        query
                    })
                } else {
                    Message.error(res.meta.msg)
                }
            } catch (err) {
                console.log(err);
            }
        },

    }

}