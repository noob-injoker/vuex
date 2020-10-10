import api from '../../http/api'
// import { Message } from 'element-ui'

export default {
    namespaced: true,   //开启命名空间：这个文件就是单独的一个vuex的模块

    state: {
        ordersList: [],  //订单列表
        totals:0,
        kuaidi:[]
    },
    mutations: {
        setOrders(state, data) {
            state.ordersList = data
        },
        setTotals(state, data) {
            state.totals = data
        },
        setKuaidi(state, data) {
            state.kuaidi = data
        },
    },
    actions: {
        async getOrders({ commit }, { query, pagenum, pagesize, user_id,
            pay_status, is_send, order_fapiao_title,
            order_fapiao_company, order_fapiao_content, consignee_addr }) { // 编辑提交角色
            try {
                let res = await api.getOrders({
                    query, pagenum, pagesize, user_id,
                    pay_status, is_send, order_fapiao_title,
                    order_fapiao_company, order_fapiao_content, consignee_addr
                })
                console.log(res);
                if (res.meta.status === 200) {
                    res.data.goods.map((item,index) => {
                        item.num = index+ 1
                    })
                    //提交mutation
                    commit('setOrders', res.data.goods)
                    commit('setTotals', res.data.total)
                }
            } catch (err) {
                console.log(err);
            }
        },
        async getKuaidi({ commit }, { id}) { // 编辑提交角色
            try {
                let res = await api.getKuaidi({id})
                console.log(res);
                if (res.meta.status === 200) {
                    //提交mutation
                    commit('setKuaidi', res.data)
                }
            } catch (err) {
                console.log(err);
            }
        },
    }

}