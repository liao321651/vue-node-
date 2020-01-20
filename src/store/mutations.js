export const  mutations =  {
    LOADGOODS(state, data) {//首页博客数据
        state.goodsList = data
    },
    DELETEBLOG(state,data){ //删除博客数据状态返回
        console.log(data)
        state.dialogVisible = data
    }
}