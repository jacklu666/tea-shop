<template>
	<div class="login container">
		<Header>
			<span>注册</span>
		</Header>
		<section>
			<div class="login-tel">
				<input type="text" v-model="userTel" placeholder="请输入手机号" pattern="[0-9]*">
			</div>
			<div class="login-code">
				<input type="text" placeholder="请输入短信验证码" pattern="[0-9]*" v-model="userCode" />
				<button :disabled="disabled" @click="sendCode">{{codeMsg}}</button>
			</div>
			<div class="login-tel">
				<input type="text" v-model="userPwd" placeholder="请设置密码" pattern="[0-9]*">
			</div>
			<div class="login-btn" @click="register">注册</div>
		</section>
		<Tabber></Tabber>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	import Header from './Header.vue'
	import http from '@/common/api/request.js'
	import Tabber from '@/components/common/Tabbar.vue'
	export default {
		data() {
			return{
				userCode:'',
				disabled:false,
				userTel:'',
				userPwd:'',
				rules:{
					userTel:{
						rule:/^1[23456789]\d{9}$/,
						msg:'手机号不能为空，并且是11位数字'
					},
					userPwd:{
						rule:/^\w{6,12}$/,
						msg:'密码不能为空，并且是6-12位'
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
			register(){
				
				if(!this.validate('userPwd'))return;
				
				if(this.code!=this.userCode){
					Toast('验证码不正确');
					return
				}
				
					http.$axios({
						url:'/api/register',
						method:'POST',
						data:{
							phone:this.userTel,
							pwd:this.userPwd
						}
					}).then(res=>{
						console.log(res)
					})
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
	}
}
</style>