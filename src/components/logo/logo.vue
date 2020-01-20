<template>
<div>
	<el-container>
		<el-header>
			<!-- <h2>用户中心</h2> -->
			<el-page-header @back="goBack()" content="用户中心"></el-page-header>

		</el-header>
		<el-container>
			<el-aside width="">
				<!-- <el-avatar icon="el-icon-user-solid" ></el-avatar> -->
				<!-- <el-avatar src="../../assets/img/main_6.png"></el-avatar> -->
				<div class="el-avatar_src"></div>
			</el-aside>
			<el-main>
				<span> 账号 : {{username}}</span>
				<br><hr/>
				<span>密码 : {{password}}</span>
				<hr/>
			</el-main>
		</el-container>
	</el-container>
	<h2>{{qm}}</h2>
	<hr/>
	<el-row>
		<el-button type="success"  @click=" goBack()">查看博客</el-button>
		<el-button type="info">敬请期待</el-button>
		<el-button type="warning">敬请期待</el-button>
		<el-button type="danger" @click="tc()">退出</el-button>
	</el-row>
</div>
</template>

<script>
import axios from 'axios';
export default {
	data () {
		return {
			username:'',
			password:'',
			qm:"青春是一个短暂的美梦,当你醒来时, 它早已消失无踪"
		}
	},
	beforeRouteEnter (to, from, next) {
		console.log(JSON.parse(sessionStorage.getItem('user')))
		if( JSON.parse(sessionStorage.getItem('user')) ){
			next();
		}else{
			alert('请先登入');
			next({path:'/center'});
		}
	
  	},
	mounted () {
		var userJsonStr = JSON.parse(sessionStorage.getItem('user'));
		// console.log(userJsonStr)
		if(userJsonStr){
			this.username= userJsonStr;
			this.password = '******';
		}
	},
	methods: {
		goBack(){
			this.$router.push('/')
		},
		tc(){//退出登录
			sessionStorage.removeItem('user');
			this.$router.push('/');
		}
		
	

	},
};

</script>
<style lang="scss" scoped>
	.el-header{
		padding: 0;
	}
	.el-aside{
		padding:10px 10px 20px 10px;
		.el-avatar{
			height: 80px;
			width: 80px;
			font-size: 80px;
	}
	}
	.el-main{
		padding-top:80px; 
		color: #000;
	}
	.el-avatar_src{
		      background:url('../../assets/img/main_6.png')no-repeat,
              url('../../assets/img/main_5.png')no-repeat,
              url('../../assets/img/main_4.png')no-repeat,
              url('../../assets/img/main_3.png')no-repeat,
              url('../../assets/img/main_2.png'),
              url('../../assets/img/main_1.jpg')no-repeat
			  ;
			  border: rgb(95, 85, 85)  solid 2px;
			border-radius: 50%;
			height: 150px;
			width: 90px;
			background-size: 100% 100%;
	}
	.el-row{
		padding-left: 20px;
		padding-right: 60%;
		// border-left: #000 solid 1px;
		text-align:initial; 
		.el-button{
			margin: 10px 0;
		}
		button{
			 background-color: rgba(139, 82, 175, 0.73);
		}

	}
	hr{
		background: #000;
	}
	h2{
		color: #000;
		text-align: center;
	}
  
</style>
