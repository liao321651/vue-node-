<template>
<div>
  <el-page-header @back="goBack()" content=""></el-page-header>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="" id="demo_ruleForm" class="demo-ruleForm">
        <el-form-item label="" prop="name">
              <el-input  v-model="ruleForm.name">
                 <template slot="prepend">手机号</template>
              </el-input>
        </el-form-item>
      

        <el-form-item label="" prop="pass">
            <el-input  type="password" v-model="ruleForm.pass" autocomplete="off">
                 <template slot="prepend">密**码 </template>
            </el-input>
        </el-form-item>

        <el-form-item label="" prop="checkPass">
             <el-input  type="password" v-model="ruleForm.checkPass" autocomplete="off">
                 <template slot="prepend">确认密码 </template>
            </el-input>
        </el-form-item>

        <el-form-item class="form-button">
            <el-button type="primary" @click="submitForm('ruleForm','userLogin')">登录</el-button>
            <el-button type="primary" @click="submitForm('ruleForm','setUser')">立即注册</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>
</div>
    
</template>


<script>
  export default {
     data() {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('手机号不能为空'));
        }
        setTimeout(() => {
          var telStr = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
          if (!(telStr.test(value))) {
            callback(new Error('请输入正确的手机号'));
          } else {
              callback();
            }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          pass: '',
          checkPass: '',
          name: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          name: [
            { validator: checkAge, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
       goBack(){
        this.$router.push('/')
      },
      submitForm(formName,api) {
        this.$refs[formName].validate((valid) => {
          console.log(valid)
          if (valid) {
            if(this.ruleForm.name&&this.ruleForm.checkPass){
              this.$store.dispatch('uesrlogo',{'api':api,'username':this.ruleForm.name,'password':this.ruleForm.checkPass});
              let _this = this;
              setTimeout(function(){
                _this.$router.push('/logo');
              },500)
            }else{
              alert('账号密码不能为空')
            }
          } else {
            console.log('验证失败')
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();//重置
      }
    }
  }
</script>
<style lang="scss" scoped>
   #demo_ruleForm{
     padding:  300px  40px 40px  40px;
     
    .form-button{
        text-align: center;
    }
    .el-form-item is-error{
      line-height: 40px;
    }

    .el-button--primary {
        color: #FFF;
        background-color: #d087ca;
        border-color: #409EFF;
        
    }
    .el-form-item{
      margin-bottom: 10px;
      color: #e44141e0;
    }
   
     
   }

</style>

