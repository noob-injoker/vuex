import api from '../../http/api'
import { Message } from 'element-ui'

export default {
    namespaced: true,   //开启命名空间：这个文件就是单独的一个vuex的模块

    state: {
        rolesList: [],  //角色列表
        RolesOne: {}, //单个角色信息
        RightsList: [], //所有权限列表
    },
    mutations: {
        setRoles(state, data) {
            state.rolesList = data
        },
        setRolesOne(state, data) {
            state.RolesOne = data
        },
        setRights(state, data) {
            state.RightsList = data
        },
    },
    actions: {
        async getRoles({ commit }) { //角色列表
            let res = await api.getRoles()
            console.log(res);
            if (res.meta.status === 200) {
                res.data.map((item, index) => {
                    item.num = index + 1
                    if (item.children) {
                        item.children.map(item1 => {
                            item1.label = item1.authName
                            if (item1.children) {
                                item1.children.map(item2 => {
                                    item2.label = item2.authName
                                    if(item2.children){
                                        item2.children.map(item3 => {
                                            item3.label = item3.authName
                                        })
                                    }
                                })
                            }
                        })

                    }
                })
                //提交mutation
                commit('setRoles', res.data)
            }
        },

        async Addroles({ dispatch }, { roleName, roleDesc }) { //添加角色
            let res = await api.Addroles({ roleName, roleDesc })
            console.log(res);
            if (res.meta.status === 201) {
                Message.success(res.meta.msg)
                dispatch('getRoles')
            }
            else {
                Message.error(res.meta.msg)
            }
        },

        async deleteroles({ dispatch }, id) { //删除角色
            try {
                let res = await api.deleteroles(id)
                console.log(res);
                if (res.meta.status === 200) {
                    Message.success(res.meta.msg)
                    dispatch('getRoles')
                } else {
                    Message.error(res.meta.msg)
                }
            } catch (err) {
                console.log(err);
            }
        },

        async getRolesOne({ commit }, id) { //根据 ID 查询角色
            let res = await api.getRolesOne(id)
            console.log(res);
            if (res.meta.status === 200) {
                // res.data.
                //提交mutation
                commit('setRolesOne', res.data)
            }
        },

        async getRights({ commit }, type) { //所有权限列表
            let res = await api.getRights(type)
            console.log(res);
            if (res.meta.status === 200) {
                res.data.map((item, index) => {
                    item.num = index + 1
                    item.label = item.authName
                        if(item.children){
                            item.children.map(item1 => {
                                item1.label = item1.authName
                                if(item1.children){
                                    item1.children.map(item2 => {
                                        item2.label = item2.authName
                                    })
                                }
                            })
                        }
                })
                //提交mutation
                commit('setRights', res.data)
            }
        },

        async putRoles({ dispatch }, { id, roleName, roleDesc }) { // 编辑提交角色
            try {
                let res = await api.putRoles({ id, roleName, roleDesc })
                console.log(res);
                if (res.meta.status === 200) {
                    Message.success('更改成功')
                    dispatch('getRoles')
                } else {
                    Message.error(res.meta.msg)
                }
            } catch (err) {
                console.log(err);
            }
        },

        async postRights({ dispatch }, { roleId,rids }) { // 角色授权
            try {
                let res = await api.postRights({ roleId,rids })
                console.log(res);
                if (res.meta.status === 200) {
                    Message.success('更新成功')
                    dispatch('getRoles')
                } else {
                    Message.error(res.meta.msg)
                }
            } catch (err) {
                console.log(err);
            }
        },
        async deleteRights({ dispatch }, { roleId, rightId}) { // 删除角色指定权限
            try {
                let res = await api.deleteRights({ roleId, rightId })
                console.log(res);
                if (res.meta.status === 200) {
                    Message.success(res.meta.msg)
                    dispatch('getRoles')
                } else {
                    Message.error(res.meta.msg)
                }
            } catch (err) {
                console.log(err);
            }
        },
    }

}