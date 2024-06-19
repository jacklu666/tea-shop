<template>
	<header>
		<div>
			<h1>
				<img src="@/assets/images/logo.png" alt="">
			</h1>
		</div>
		<div class="search" @click="goSearch">
			<i class="iconfont icon-Magnifier"></i>
			<span>搜您喜欢的..</span>
		</div>
		<div class="kefu">
			<i class="iconfont icon-kefu"></i>
		</div>
	</header>
</template>

<script>
	export default {
		methods: {
			goSearch() {
				this.$router.push('/search')
			}
		}
	}
</script>

<style scoped>
	header {
		display: flex;
		justify-content: space-around;
		align-items: center;
		width: 100%;
		height: 1.6rem;
		background-color: #b0352f;
	}

	header h1 {
		width: 2.666667rem;
	}

	header h1 img {
		width: 100%;
		height: 100%;
	}

	.search {
		display: flex;
		align-items: center;
		width: 5.5rem;
		height: 30px;
		background-color: #fff;
		border-radius: 12px;
	}

	.search i {
		padding: 8px;
		color: #ccc;
	}

	.search span {
		font-size: 14px;
		color: #ccc;
	}

	.kefu i {
		font-size: 26px;
		color: #fff;
	}
</style>