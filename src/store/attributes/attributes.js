import api from '../../http/api'
import { Message } from 'element-ui'

export default {
    namespaced: true,   //开启命名空间：这个文件就是单独的一个vuex的模块

    state: {
        attributes: []
    },
    mutations: {
        setAttributes(state, data) {
            state.attributes = data
        },
    },
    actions: {
        async getAttributes({ commit }, { id, sel }) { // 参数列表
            try {
                let res = await api.getAttributes({ id, sel })
                console.log(res);
                if (res.meta.status === 200) {
                    res.data.map((item, index) => {
                        item.num = index + 1
                        item.attr_vals = item.attr_vals.split(",")
                    })
                    //提交mutation
                    commit('setAttributes', res.data)
                }
            } catch (err) {
                console.log(err);
            }
        },
        async Addattributes({ dispatch }, { id, attr_name, attr_sel, attr_vals, sel }) {
            // 添加动态参数或者静态属性
            try {
                let res = await api.Addattributes({ id, attr_name, attr_sel, attr_vals })
                // console.log(res);
                if (res.meta.status === 201) {
                    Message.success(res.meta.msg)
                    //调用获取 商品分类数据列表
                    dispatch('getAttributes', {
                        id, sel
                    })
                } else {
                    Message.error(res.meta.msg)
                }
            } catch (err) {
                console.log(err);
            }
        },

        async putAttributes({ dispatch }, { id, attrId, attr_name, attr_sel, attr_vals, sel }) { // 编辑提交参数
            try {
                let res = await api.putAttributes({ id, attrId, attr_name, attr_sel, attr_vals })
                console.log(res);
                if (res.meta.status === 200) {
                    Message.success('更改成功')
                    dispatch('getAttributes', {
                        id, sel
                    })
                } else {
                    Message.error(res.meta.msg)
                }
            } catch (err) {
                console.log(err);
            }
        },

        async deleteAttributes({ dispatch }, { id, attrid,sel }) { //删除参数
            try {
                let res = await api.deleteAttributes({ id, attrid })
                console.log(res);
                if (res.meta.status === 200) {
                    Message.success(res.meta.msg)
                    dispatch('getAttributes', {
                        id, sel
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