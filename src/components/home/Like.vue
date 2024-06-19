<template>
	<div class="like">
		<Card>
			<span>猜你喜欢</span>
		</Card>
		<ul>
			<li v-for="(item,index) in likeList" :key="index" @click="goDetail(item.id)">
				<h2><img v-lazy="item.imgUrl" alt=""></h2>
				<h3>{{item.name}}</h3>
				<div>
					<span>￥</span>
					<b>{{item.price}}</b>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	// import { Lazyload } from 'mint-ui';
	import Card from '@/components/home/Card.vue'
	export default{
		props:{
			likeList:Array
		},
		data() {
			return{
				
			}
		},
		components:{
			Card
		},
		methods:{
			goDetail(id){
				this.$router.push({
					path:'/detail',
					query:{
						id
					}
				})
			}
		}
	}
</script>

<style scoped>
	.like ul{
		display: flex;
		flex-wrap: wrap;
	}
	.like ul li{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 50%;
	}
	.like h3{
		padding: 0.16rem;
		font-weight: 400;
		width: 4.693333rem;
		font-size: 0.426667rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		color: #222;
	}
	
	.like ul li > div{
		width: 4.693333rem;
		padding: 0.16rem;
		text-align: left;
	}
	
	.like ul li > div span{
		font-size: 0.32rem;
		color: #ff0000;
	}
	
	.like ul li > div b{
		color: #ff0000;
		font-weight: 600;
		font-size: 0.48rem;
	}
	
	.like img{
		width: 4.693333rem;
		height: 4.693333rem;
	}
</style>