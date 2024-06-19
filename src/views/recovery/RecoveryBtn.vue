<template>
	<div class="login container">
		<Header>
			<span>找回密码</span>
		</Header>
		<section>
			<div class="login-tel">
				<input type="text" v-model="userPwd"  placeholder="请输入新的密码">
			</div>
			<div class="login-btn" @click="submitBtn">确认</div>
		</section>
		<Tabber></Tabber>
	</div>
</template>

<script>
	import {
		Toast
	} from 'mint-ui';
	import Header from '@/views/login/Header.vue'
	import http from '@/common/api/request.js'
	import Tabber from '@/components/common/Tabbar.vue'
	export default {
		data() {
			return {
				userPwd:'',
				rules: {
					userPwd: {
						rule: /^\w{6,12}$/,
						msg: '密码不能为空，并且是6-12位'
					}
				}
			}
		},
		components: {
			Tabber,
			Header
		},
		methods: {
			submitBtn(){
				if (!this.validate('userPwd')) return;
				
				http.$axios({
					url: '/api/recovery',
					method: 'POST',
					data: {
						phone:this.$route.query.phone,
						pwd:this.userPwd
					}
				}).then(res => {
					Toast('修改成功');
					if(res.success){
						this.$router.push({
							path:'/login'
						})
					}
				})
			},
			validate(key) {
				let bool = true;
				if (!this.rules[key].rule.test(this[key])) {
					Toast(this.rules[key].msg);
					bool = false
					return false
				}
				return bool
			}
		}
	}
</script>

<style scoped lang="scss">
	section {
		display: flex;
		align-items: center;
		flex-direction: column;
		background-color: #f5f5f5;

		div {
			margin: 0.266667rem 0;
			width: 8.933333rem;
			height: 1.173333rem;
		}

		input {
			box-sizing: border-box;
			padding: 0 0.266667rem;
			line-height: 1.173333rem;
			background-color: #fff;
			border: 1px solid #ccc;
			border-radius: 6px;
		}

		.login-tel {
			margin-top: 0.8rem;

			input {
				width: 100%;
			}
		}

		.login-code {
			display: flex;

			input {
				flex: 1;
			}

			button {
				padding: 0 0.266667rem;
				height: 1.173333rem;
				color: #fff;
				background-color: #b0352f;
				border: 0;
				border-radius: 6px;
			}
		}

		.login-btn {
			text-align: center;
			font-size: 0.426667rem;
			color: #fff;
			line-height: 1.173333rem;
			background-color: #b0352f;
			border-radius: 6px;
		}
	}
</style>