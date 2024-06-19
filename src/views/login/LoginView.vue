<template>
	<div class="login container">
		<Header></Header>
		<section>
			<div class="login-tel">
				<input type="text" v-model="userTel" placeholder="请输入手机号" pattern="[0-9]*">
			</div>
			<div class="login-code">
				<input type="text" placeholder="请输入短信验证码" pattern="[0-9]*" v-model="userCode" />
				<button :disabled="disabled" @click="sendCode">{{codeMsg}}</button>
			</div>
			<div class="login-btn" @click="login">登录</div>
			<div class="tab">
				<span @click="goUserLogin">密码登录</span>
				<span @click="goRegister">快速注册</span>
			</div>
		</section>
		<Tabber></Tabber>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	import Header from './Header.vue'
	import http from '@/common/api/request.js'
	import {mapMutations} from 'vuex'
	import Tabber from '@/components/common/Tabbar.vue'
	export default {
		data() {
			return{
				userCode:'',
				disabled:false,
				userTel:'',
				rules:{
					userTel:{
						rule:/^1[23456789]\d{9}$/,
						msg:'手机号不能为空，并且是11位数字'
					}
				},
				codeNum:6,
				codeMsg:'获取短信验证码',
				code:''
			}
		},
		components: {
			Tabber,
			Header
		},
		methods:{
			...mapMutations(['USER_LOGIN']),
			goUserLogin(){
				this.$router.push('/userLogin')
			},
			sendCode(){
				if(!this.validate('userTel'))return;
				
				http.$axios({
					url:'/api/code',
					method:'POST',
					data:{
						phone:this.userTel
					}
				}).then(res=>{
					if(res.success){
						console.log(res)
						this.code= res.data
					}
				})
				
				this.disabled=true
				
				let timer=setInterval(()=>{
					--this.codeNum
					this.codeMsg=`重新发送${this.codeNum}`;
				},1000)
				
				setTimeout(()=>{
					clearInterval(timer)
					this.codeNum=6
					this.disabled=false
					this.codeMsg="获取短信验证码"
				},6000)
				
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
			login(){
				if(this.code==this.userCode){
					http.$axios({
						url:'/api/addUser',
						method:'POST',
						data:{
							phone:this.userTel
						}
					}).then(res=>{
						if(!res.success)return
						console.log(res)
						this.USER_LOGIN(res.data)
						this.$router.push({
							path:'/my'
						})
					})
				}
			},
			goRegister(){
				this.$router.push('/register')
			}
		}
	}
</script>

<style scoped lang="scss">
section{
	display: flex;
	align-items: center;
	flex-direction: column;
	font-size: 0.32rem;
	background-color: #f5f5f5;
	div{
		margin: 0.266667rem 0;
		width: 8.933333rem;
		height: 1.173333rem;
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
		font-size: 0.48rem;
		line-height: 1.173333rem;
		background-color: #b0352f;
		border-radius: 6px;
	}
	.tab{
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 0.426667rem;
	}
}
</style>