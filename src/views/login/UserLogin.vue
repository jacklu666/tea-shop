<template>
	<div class="login container">
		<Header></Header>
		<section>
			<div class="login-tel">
				<input type="text" v-model="userTel" placeholder="请输入手机号" pattern="[0-9]*">
			</div>
			<div class="login-tel">
				<input type="text" v-model="userPwd" placeholder="请输入密码">
			</div>
			<div class="login-btn" @click="login">登录</div>
			<div class="tab">
				<span @click="goLogin">短信登录</span>
				<span @click="goRecovery">找回密码</span>
				<span @click="goRegister">快速注册</span>
			</div>
		</section>
		<Tabber></Tabber>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	import http from '@/common/api/request.js'
	import Header from './Header.vue'
	import {mapMutations} from 'vuex'
	import Tabber from '@/components/common/Tabbar.vue'
	export default {
		data() {
			return{
				userTel:'',
				userPwd:'',
				rules:{
					userTel:{
						rule:/^1[23456789]\d{9}$/,
						msg:'手机号不能为空，并且是11位数字'
					},
					userPwd:{
						rule:/^\w{6,12}$/,
						msg:'密码不能为空，并且要求6,12位'
					}
				}
			}
		},
		components: {
			Tabber,
			Header
		},
		methods:{
			...mapMutations(['USER_LOGIN']),
			goLogin(){
				this.$router.push('/login')
			},
			login(){
				if(!this.validate('userTel'))return;
				if(!this.validate('userPwd'))return;
				http.$axios({
					url:'/api/login',
					method:'POST',
					data:{
						userTel:this.userTel,
						userPwd:this.userPwd
					}
				}).then(res=>{
					Toast(res.msg)
					if(!res.success)return
					console.log(res.data)
					this.USER_LOGIN(res.data)
					this.$router.push({
						path:'/my'
					})
				})
			},
			validate(key){
				let bool= true;
				if(!this.rules[key].rule.test(this[key])){
					Toast(this.rules[key].msg);
					bool=false
					return false
				}
				return bool
			},
			goRegister(){
				this.$router.push('/register')
			},
			goRecovery(){
				this.$router.push('/recovery')
			}
		}
	}
</script>

<style scoped lang="scss">
section{
	display: flex;
	align-items: center;
	flex-direction: column;
	background-color: #f5f5f5;
	div{
		margin: 0.266667rem 0;
		width: 8.933333rem;
		height: 1.173333rem;
		font-size: 0.32rem;
	}
	input{
		box-sizing: border-box;
		padding: 0 0.266667rem;
		line-height: 1.173333rem;
		background-color: #fff;
		border: 1px solid #ccc;
		border-radius: 6px;
	}
	.login-tel{
		margin-top: 0.8rem;
		input{
			width: 100%;
		}
	}
	.login-code{
		display: flex;
		input{
			flex: 1;
		}
		button{
			padding: 0 0.266667rem;
			height: 1.173333rem;
			color: #fff;
			background-color: #b0352f;
			border: 0;
			border-radius: 6px;
		}
	}
	.login-btn{
		text-align: center;
		font-size: 0.426667rem;
		color: #fff;
		line-height: 1.173333rem;
		background-color: #b0352f;
		border-radius: 6px;
		font-size: 0.48rem;
	}
	.tab{
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 0.426667rem;
	}
}
</style>