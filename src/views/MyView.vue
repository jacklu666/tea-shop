<template>
  <div class="my">
    <header>
		<div class="user-info" v-if="loginStatus">
			<img :src="userInfo.imgUrl" alt="">
			<span>{{userInfo.nickName}}</span>
		</div>
		<div class="login" @click="goLogin" v-else>登录/注册</div>
	</header>
	<section>
		<ul>
			<li @click="goPath">地址管理</li>
			<li v-if="loginStatus" @click="loginOut">退出登录</li>
		</ul>
	</section>
	<Tabber></Tabber>
  </div>
</template>

<script>
	import{mapState,mapMutations} from 'vuex'
	import Tabber from '@/components/common/Tabbar.vue'
	export default {
	  name: 'AboutView',
	  components:{
		  Tabber
	  },
	  computed:{
		...mapState({
			loginStatus:state=>state.user.loginStatus,
			userInfo:state=>state.user.userInfo
		})  
	  },
	  methods:{
		  ...mapMutations(['loginOut']),
		  goLogin(){
			  this.$router.push('/login')
		  },
		  goPath(){
			  this.$router.push('path')
		  }
	  }
	}
</script>

<style scoped lang="scss">
	.my{
		display: flex;
		flex-direction: column;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
	}
	header{
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 4.266667rem;
		background-color: #b0352f;
		.login{
			font-size: 0.426667rem;
			padding: 0.16rem 0.4rem;
			color: #fff;
			background-color: #f6ab32;
			border-radius: 6px;
		}
		.user-info{
			display: flex;
			flex-direction: column;
			align-items: center;
			img{
				width: 1.76rem;
				height: 1.76rem;
				border-radius: 50%;
			}
			span{
				padding: 0.533333rem 0;
				font-size: 0.48rem;
				color: #fff;
			}
		}
	}
	section{
		flex: 1;
		overflow: hidden;
		ul li{
			padding: 0.4rem;
			font-size: 0.426667rem;
		}
	}
</style>