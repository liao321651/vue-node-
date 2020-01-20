<template>
        <div id="home_div">
            <el-container string="">
                <el-header >
                    <span class="heider_span1">博客首页</span>
                    <span class="header_span2" @click="header_span2()">
                        <i class="el-icon-s-custom">
                        </i>
                     
                    </span> 
                <hr/>
                </el-header>
                <el-container>
                    <el-main>
                        <ul>
                            <li v-for="(item,key) in goodsList" :key='key'>
                                <p> 
                                    <span>{{item.username}}  日期:<span v-text="new Date(parseInt(item.comment_count)).toLocaleString().split(' ')[0].replace('/', '年').replace('/', '月')+'日'"></span></span>  
                                </p>
                                <div class="odiv">
                                <h1>
                                    <el-row>
                                     <el-button @click="Blog_editor(item.Id)" type="primary" size="mini"  icon="el-icon-edit" circle></el-button>
                                        <!-- <el-button @click="Delete_blog(item.Id)" type="danger"  size="mini" icon="el-icon-delete" circle></el-button>  -->
                                      <el-button  @click="dialogVisible = true" type="danger"  size="mini" icon="el-icon-delete" circle></el-button>
                                       
                                    </el-row>
                                   
                                    <el-dialog 
                                        title="删除提示"
                                        :visible.sync="dialogVisible"
                                        width="80%"
                                        heigth="40%"
                                        top="50%"
                                        >
                                        <span>确定删除吗？</span>
                                        <span slot="footer" class="dialog-footer">
                                            <el-button @click="dialogVisible = false">取 消</el-button>
                                            <el-button type="primary" @click="Delete_blog(item.Id)">确 定</el-button>
                                        </span>
                                    </el-dialog>

                                    {{item.title}} 
                                    
                                </h1>
                                <hr/>
                                <div class="odiv2">
                                   {{item.view}} 
                                </div>
                                </div>
                            </li>
                        </ul>

                    </el-main>
             
                    <el-footer>
                        <i class="el-icon-circle-plus-outline" @click="Newly_build()"></i>
                    </el-footer>
                </el-container>
            </el-container>

             
        </div>
</template>
<script>
import axios from 'axios';
export default {
    data () {
        return {
            data_res:[],
            dialogVisible:false
        }
    },  
    computed: {
        goodsList(){
            //获取vuex 里面首页博客数据
            return   this.$store.getters['goodsList']
        }
    },
    mounted () {
      //请求vuex里面首页博客数据
      //console.log(this.$store);
      this.$store.dispatch('loadGoods');
    
    },
  
    methods: {
       
        Newly_build(){
            this.$router.push('/newly_build')
        },
        Blog_editor(){//重新编辑博客

        },
        Delete_blog(id){//删除一条博客]
            this.$store.dispatch('deleteBlog',{"id":id,'arr':this.goodsList});
            let is = this.$store.getters['dialogVisible'][0];
            if(is){
                console.log("请求失败");
                this.dialogVisible = false;
            }else{
                console.log(is);
                this.dialogVisible = is;
            }
        
        },
        header_span2(){ //个人中心
          this.$router.push('/logo');
        }
    },
  
    
}
</script>

<style lang="scss" scoped>
    // $backgrund:  rgba(253, 112, 159, 0.52);
     $backgrund:  rgba(255, 255, 255, 0.6);
    $icolor: rgba(232, 94, 190, 0.75);   
   #home_div{
   
     .el-header {
        color: #333;
        height: 50px !important;
        line-height: 50px;
        text-align: center;
        padding: 0;
       
        
        .heider_span1{
            display: inline-block;
            width:160px;
            height: 40px;
            line-height: 40px;
            background:$backgrund;
            border-radius: 10px;
            color: #000;
            font-size: 16px;

        }
        .header_span2{
            position: absolute;
            top: 14px;
            right: 8px;
            line-height: 0;
            i{
                font-size: 40px;
                color:$icolor;
            }
        
        }
    }
   .el-main{
        max-height: 15.4rem;
            ul{
                li{
                    text-align: center;
                    margin-bottom: 20px;
                    
                    h1{
                       min-width: 60px;
                       min-height: 34px;
                       line-height: 34px;
                       background: $backgrund;
                       border-radius: 6px;
                       word-break:break-all;
                       text-align: center;
                    }
                
                    p{
                        padding-left: 4px;
                        color: rgb(95, 0, 66);
                        display:flex;
                        justify-content:space-between;
                    }
                    .odiv{
                        width: 100%;
                        color: #000;
                        border-radius: 6px;
                        word-break:break-all;
                        text-align: initial;
                        padding: 0 6px;
                    }
                    .odiv2{
                        min-height: 160px;
                        background: $backgrund;
                       border-radius: 6px;
                    }
                    .el-row{
                        text-align: end;
                        float: right;
                          .el-button--primary{
                                background-color:$icolor !important;
                            }
                    }
                }
            }
    }
    .el-aside{
        width: 60px !important;
        padding-top:32px; 
        ul{
            li{
                height: 40px;
                line-height: 40px;
                text-align: center;
                background: #ffffff;
                margin-bottom: 6px;
                overflow: hidden;
                border-radius: 8px;
            }
        }
    }
  .el-footer{
      position: fixed;
      bottom: 60px;
      right: -10px;
      i{
          height: 60px;
          width: 60px;
          font-size:60px;
          color:$icolor;
      }
  }
  }
 
</style>

