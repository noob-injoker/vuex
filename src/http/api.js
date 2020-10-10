import service from './index'

export default {
    // 登录
    login({ username, password }) {
        return service.post('/login', {
            username: username,
            password: password
        })
    },
    // 获取左侧导航
    getMenus() {
        return service.get('/menus')
    },
    // 获取用户列表
    getUsersList({ pagenum, pagesize, query }) {
        return service.get(`/users?pagenum=${pagenum}&pagesize=${pagesize}&query=${query}`)
    },
    // 修改用户信息
    getUsersEdit({ id, email, mobile }) {
        return service.put(`users/${id}`, {
            email,
            mobile
        })
    },
    // 删除单个用户
    getUsersDelete(id) {
        return service.delete(`users/${id}`)
    },
    //添加用户
    addUser({ username, password, email, mobile }) {
        return service.post(`/users`, {
            username,
            password,
            email,
            mobile
        })
    },
    //  修改用户状态
    state({ uId, type }) {
        return service.put(`users/${uId}/state/${type}`)
    },
    //  角色列表
    getRoles() {
        return service.get('/roles')
    },
    //  分配用户角色
    usersRoles({ id, rid }) {
        return service.put(`users/${id}/role`, { rid })
    },
    //  添加角色
    Addroles({ roleName, roleDesc }) {
        return service.post(`roles`, { roleName, roleDesc })
    },
    //   删除角色
    deleteroles(id) {
        return service.delete(`roles/${id}`)
    },
    //   根据 ID 查询角色
    getRolesOne(id) {
        return service.get(`roles/${id}`)
    },
    //    所有权限列表
    getRights(type) {
        return service.get(`rights/${type}`)
    },
    //    编辑提交角色
    putRoles({ id, roleName, roleDesc }) {
        return service.put(`roles/${id}`, {
            roleName, roleDesc
        })
    },
    //    订单数据列表
    getOrders({ query, pagenum, pagesize, user_id,
        pay_status, is_send, order_fapiao_title,
        order_fapiao_company, order_fapiao_content, consignee_addr }) {
        return service.get(`/orders?query=${query}&pagenum=${pagenum}&pagesize=${pagesize}&user_id=${user_id}&pay_status=${pay_status}&is_send=${is_send}&order_fapiao_title=${order_fapiao_title}&order_fapiao_company=${order_fapiao_company}&order_fapiao_content=${order_fapiao_content}&consignee_addr=${consignee_addr}`)
    },
    //    商品列表数据
    getGoods({ query, pagenum, pagesize }) {
        return service.get(`/goods?query=${query}&pagenum=${pagenum}&pagesize=${pagesize}`)
    },
    //  添加商品
    Addgoods({ goods_name, goods_cat, goods_price, goods_number, goods_weight, goods_introduce, pics, attrs }) {
        return service.post(`/goods`, { goods_name, goods_cat, goods_price, goods_number, goods_weight, goods_introduce, pics, attrs })
    },
    //   删除商品
    deleteGoods({ id }) {
        return service.delete(`goods/${id}`)
    },
    //    商品分类数据列表
    getCategories({ type, pagenum, pagesize }) {
        return service.get(`/categories?type=${type}&pagenum=${pagenum}&pagesize=${pagesize}`)
    },
    //  添加分类
    Addcategories({ cat_pid, cat_name, cat_level }) {
        return service.post(`/categories`, { cat_pid, cat_name, cat_level })
    },
    //   删除分类
    deleteCategories({ id }) {
        return service.delete(`categories/${id}`)
    },
    //    编辑提交分类
    putcategories({ id, cat_name }) {
        return service.put(`categories/${id}`, { cat_name })
    },
    //    参数列表
    getAttributes({ id, sel }) {
        return service.get(`/categories/${id}/attributes?sel=${sel}`)
    },
    //  添加动态参数或者静态属性
    Addattributes({ id, attr_name, attr_sel, attr_vals }) {
        return service.post(`/categories/${id}/attributes`, { attr_name, attr_sel, attr_vals })
    },
    //     根据 ID 查询参数
    getAttrId({ id, attrId }) {
        return service.get(`categories/${id}/attributes/${attrId}`)
    },
    //    编辑提交参数
    putAttributes({ id, attrId, attr_name, attr_sel, attr_vals }) {
        return service.put(`categories/${id}/attributes/${attrId}`, { attr_name, attr_sel, attr_vals })
    },
    //   删除参数
    deleteAttributes({ id, attrid }) {
        return service.delete(`categories/${id}/attributes/${attrid}`)
    },
    //     基于时间统计的折线图
    getReports() {
        return service.get(`reports/type/1`)
    },
    //    查看物流信息
    getKuaidi({ id }) {
        return service.get(`/kuaidi/${id}`)
    },
     //  角色授权
     postRights({ roleId,rids}) {
        return service.post(`roles/${roleId}/rights`,{rids})
    },
    //    删除角色指定权限
    deleteRights({ roleId, rightId }) {
        return service.delete(`roles/${roleId}/rights/${rightId}`)
    },
}