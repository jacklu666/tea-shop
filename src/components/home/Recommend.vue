<template>
	<div class="recommend">
		<Card>
		</Card>
		<ul>
			<li v-for="(item,index) in recommendList" :key="index">
				<h2>
					<img :src="item.imgUrl" alt="" />
				</h2>
				<div>
					<h3>{{item.name}}</h3>
					<p>{{item.content}}</p>
					<div class="price">
						<span>￥</span>
						<b>{{item.price}}</b>
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import Card from '@/components/home/Card.vue'
	export default{
		props:{
			recommendList:Array
		},
		data() {
			return{
				
			}
		},
		components:{
			Card
		}
	}
</script>

<style scoped>
	.recommend ul li{
		position: relative;
	}
	.recommend ul li h2{
		text-align: center;
	}
	.recommend ul li img{
		width: 9.6rem;
		height: 3.84rem;
		border-radius: 12px;
	}
	.recommend ul li >div{
		position: absolute;
		right: 0;
		top: 0;
		display: flex;
		flex-direction: column;
		padding: 0.533333rem;
	}
	.recommend ul li >div h3{
		font-size: 12px;
	}
	.recommend ul li >div p{
		font-size: 0.426667rem;
	}
	.price{
		color: red;
		margin-top: 0.666667rem;
		text-align: right;
	}
	.price span{
		font-size: 0.373333rem;
	}
	.price b{
		font-size: 0.586667rem;
	}
	
	
</style>