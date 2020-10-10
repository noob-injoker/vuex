import api from '../../http/api'
import { Message } from 'element-ui'

export default {
    namespaced: true,   //开启命名空间：这个文件就是单独的一个vuex的模块

    state: {
        sortList: [],  //商品列表
        sortLists: [],  //商品列表2
        total: 0,
        Reports:[]
    },
    mutations: {
        setSort(state, data) {
            state.sortList = data
        },
        setTotal(state, data) {
            state.total = data
        },
        setSorts(state, data) {
            state.sortLists = data
        },
        setReports(state, data) {
            state.Reports = data
        },
    },
    actions: {
        async getCategories({ commit }, { type, pagenum, pagesize }) { //  商品分类数据列表
            try {
                let res = await api.getCategories({ type, pagenum, pagesize })
                console.log(res);
                if (res.meta.status === 200) {
                    if(res.data.result){
                    res.data.result.map((item, index) => {
                        item.num = index + 1
                        item.label = item.cat_name
                        item.value = item.cat_id
                        if (item.children) {
                            item.children.map(item1 => {
                                item1.label = item1.cat_name
                                item1.value = item1.cat_id
                                if (item1.children) {
                                    item1.children.map(item2 => {
                                        item2.label = item2.cat_name
                                        item2.value = item2.cat_id
                                    })
                                }
                            })
                        }
                    })
                    commit('setSort', res.data.result) 
                }
                else{
                    res.data.map(item => {
                        item.label = item.cat_name
                        item.value = item.cat_id
                        if (item.children) {
                            item.children.map(item1 => {
                                item1.label = item1.cat_name
                                item1.value = item1.cat_id
                                if (item1.children) {
                                    item1.children.map(item2 => {
                                        item2.label = item2.cat_name
                                        item2.value = item2.cat_id
                                    })
                                }
                            })
                        }
                    })
                    commit('setSorts', res.data)
                }
                    
                    //提交mutation
                    commit('setTotal', res.data.total)
                }
            } catch (err) {
                console.log(err);
            }
        },

        async Addcategories({ dispatch }, { cat_pid, cat_name, cat_level, type, pagenum, pagesize }) {
            //添加分类
            try {
                let res = await api.Addcategories({ cat_pid, cat_name, cat_level })
                // console.log(res);
                if (res.meta.status === 201) {
                    Message.success(res.meta.msg)
                    //调用获取 商品分类数据列表
                    dispatch('getCategories', {
                        type, pagenum, pagesize
                    })
                } else {
                    Message.error(res.meta.msg)
                }
            } catch (err) {
                console.log(err);
            }
        },

        async deleteCategories({ dispatch }, { id, pagenum, pagesize, type }) { //删除分类
            try {
                let res = await api.deleteCategories({ id })
                // console.log(res);
                if (res.meta.status === 200) {
                    Message.success(res.meta.msg)
                    //调用获取用户列表的接口
                    dispatch('getCategories', {
                        pagenum,
                        pagesize,
                        type
                    })
                } else {
                    Message.error(res.meta.msg)
                }
            } catch (err) {
                console.log(err);
            }
        },
        async putcategories({ dispatch }, { id, cat_name, type, pagenum, pagesize }) { // 编辑提交角色
            try {
                let res = await api.putcategories({ id, cat_name })
                console.log(res);
                if (res.meta.status === 200) {
                    Message.success('更改成功')
                    dispatch('getCategories', {
                        type, pagenum, pagesize
                    })
                } else {
                    Message.error(res.meta.msg)
                }
            } catch (err) {
                console.log(err);
            }
        },
        async getReports({ commit }) { //基于时间统计的折线图
            let res = await api.getReports()
            console.log(res);
            if (res.meta.status === 200) {
                //提交mutation
                commit('setReports', res.data)
            }
        },

    }

}