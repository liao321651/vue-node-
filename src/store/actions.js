import Axios from 'axios'
export  const  actions = {
    loadGoods({commit}){ //首页博客数据
        Axios.get('/api/api/articles/').then(res=>{
            console.log(res.data);
            commit('LOADGOODS', res.data)
        },res=>{
            commit('LOADGOODS', ['请求失败'])
        })
    },
    deleteBlog({commit},data){//删除博客数据
        Axios.post('/api/api/delArticle/',{
            id:data.id
        }).then(res=>{
            if(res.status){
                let arr = data.arr;
                for(let i=0;i<arr.length;i++){
                    if(arr[i].Id == data.id){
                        arr.splice(i, 1);
                        commit('DELETEBLOG', [false])
                    }
                }
            }
        },res=>{
            // console.log('请求失败')
            commit('DELETEBLOG', [true])
        })
    },
    uesrlogo({commit},data){
        // console.log(api.data)
        Axios.post('/api/api/'+data.api,{ //登入账号
            username:data.username,
            password:data.password
        }).then(res => {
                console.log(res.data);
                if(res.data.status){
                    sessionStorage.setItem('user', JSON.stringify(data.username));
                    
                }else{
                    alert(res.data.msg)
                }
            }, res => {
            console.info('请求失败');
        }) 
    }
   
}