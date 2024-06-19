<template>
	<header>
		<div class="search-return" @click="goBack">
			<i class="iconfont icon-fanhui"></i>
		</div>
		<div class="search-main">
			<i class="iconfont icon-fangdajing"></i>
			<form action="" onsubmit="return false" @keyup.enter="goSearchList">
				<input type="text" placeholder="搜索您喜欢的产品..." v-model="searchVal" autofocus/>
			</form>
		</div>
		<div class="search-btn" @click="goSearchList">搜索</div>
	</header>
</template>

<script>
	export default{
		data() {
			return{
				searchVal:this.$route.query.key||'',
				searchArr:[]
			}
		},
		mounted() {
			
		},
		methods:{
			goBack(){
				this.$router.back();
			},
			goSearchList(){
				
				if(!this.searchVal)return;
				
				if(!localStorage.getItem('searchList')){
					localStorage.setItem('searchList','[]')
				}else{
					this.searchArr= JSON.parse(localStorage.getItem('searchList'))
				}
				
				this.searchArr.unshift(this.searchVal)
				
				let newArr=new Set(this.searchArr)
				
				localStorage.setItem('searchList',JSON.stringify(Array.from(newArr)))
				
				if(this.searchVal===this.$route.query.key)return;
				
				this.$router.push({
					name:'slist',
					query:{
						key:this.searchVal
					}
				})
			}
		}
	}
</script>

<style scoped>
	header{
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		height: 1.173333rem;
		background-color: #b0352f;
		color: #fff;
	}
	.search-return{
		padding: 0 0.266667rem;
	}
	.search-return i{
		font-size: 0.746667rem;
	}
	
	.search-main{
		display: flex;
		align-items: center;
		width: 6.933333rem;
		height: 0.8rem;
		background-color: #fff;
		border-radius: 12px;
	}
	.search-main i{
		color: #666;
		padding: 0 0.266667rem;
	}
	
	.search-main form{
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
	}
	
	.search-main form input{
		font-size: 14px;
		width: 100%;
		color: #000;
	}
	
	.search-btn{
		padding: 0 0.266667rem;
		font-size: 0.426667rem;
	}
</style>