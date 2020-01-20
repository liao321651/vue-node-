<template>
<div>
  <el-page-header @back="goBack()" content=""></el-page-header>

  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="" id="demo_ruleForm" class="demo-ruleForm">
    <el-form-item label="标题" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>

    <el-form-item label="内容" prop="desc">
      <el-input type="textarea"  :autosize="{ minRows: 8, maxRows: 8888}"  v-model="ruleForm.desc"  class="nr_input"></el-input>
    </el-form-item>

    <el-form-item class="form-button">
      <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>

  </div>

</template>

<script>
import axios from 'axios';
  export default {
    data() {
      return {
        ruleForm: {
          name: '',
          desc: '',
        },
        rules: {
          name: [
            { required: true, message: '请输入标题名称', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
          ],
          desc: [
            { required: true, message: '请填写内容形式', trigger: 'blur' }
          ]
        }
      };
    },
   
    methods: {
      goBack(){
        this.$router.go(-1)
      },
      submitForm(formName) {
        var _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var userJsonStr = JSON.parse(sessionStorage.getItem('user'));
            console.log(userJsonStr);
            if(_this.ruleForm.name&&_this.ruleForm.desc){
                if(userJsonStr){
                    tijiao(userJsonStr.name);
                }else{
                    tijiao('游客');
                }
                function tijiao(username){
                //添加个人/游客博客数据
                axios.post('/api//api/articles/',{
					username:username,
					title:_this.ruleForm.name,
					content:_this.ruleForm.desc
				}).then(res => {
                    _this.$router.push('/')
					}, res => {
                    console.info('请求失败');
				})
            };
            }
            
          } else {
            // console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style lang="scss" scoped>
    #demo_ruleForm{
      padding: 150px 20px 60px 20px;
        .form-button{
            text-align: center;
      
            .el-button--primary{
                background-color: #945db7;
            }
        }
      
    }
     .el-textarea__inner{
                   background-color:rgba(255, 255, 255, 0.65) !important;
                }
</style>
