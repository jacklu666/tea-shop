<template>
	<header>
		<i class='iconfont icon-fanhui' @click="goBack"></i>
		<slot>
			<span>我的地址</span>
		</slot>
		<i class="iconfont icon-kefu"></i>
	</header>
</template>


<script>
	export default{
		methods:{
			goBack(){
				if(this.$route.name=='path-list'){
					this.$router.replace('/path')
					return
				}else{
					this.$router.push('/my')
				}
				
			}
		}
	}
</script>

<style scoped lang="scss">
	header{
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #fff;
		width: 100%;
		height: 1.173333rem;
		background-color: #b0352f;
		i{
			padding: 0 0.4rem;
			font-size: 0.586667rem;
		}
		span{
			font-weight: 400;
			font-size: 0.48rem;
		}
	}
</style>