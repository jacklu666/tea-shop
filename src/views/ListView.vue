<template>
	<div class="list">
		<header v-show="isShow">
			<div class='returns'>
				<i class='iconfont icon-fanhui'></i>
			</div>
			<div class='search'>
				<i class='iconfont icon-fangdajing'></i>
				<span>搜您喜欢的...</span>
			</div>
			<div class='go-home'>
				<img src="@/assets/images/home.png" alt="">
			</div>
		</header>
		<section>
			<div class="list-l" ref="left">
				<ul class="l-item">
					<li :class="{active:index==currentIndex}" @click="goScroll(index)" v-for="(item,index) in leftData" :key="index">{{item.name}}</li>
				</ul>
			</div>
			<div class="list-r" ref="right">
				<div>
					<ul v-for="(item,index) in rightData" :key="index">
						<li class="shop-list" v-for="(k,i) in item">
							<h2>{{k.name}}</h2>
							<ul class="r-content">
								<li v-for="(j,idx) in k.list" :key="idx">
									<img :src="j.imgUrl" alt="">
									<span>{{j.name}}</span>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
		</section>
		<Tabber></Tabber>
	</div>
</template>

<script>
	import BetterScroll from 'better-scroll'
	import http from '@/common/api/request.js'
	import Tabber from '@/components/common/Tabbar.vue'
	export default {
		name: 'ListView',
		data() {
			return{
				isShow:true,
				leftData:[],
				rightData:[],
				rightBScroll:'',
				allHeight:[],
				scrollY:''
			}
		},
		computed:{
			currentIndex(){
				return this.allHeight.findIndex((item,index)=>{
					return this.scrollY>=item && this.scrollY<this.allHeight[index+1]
				})
			}
		},
		components: {
			Tabber
		},
		async created() {
			let res=await http.$axios({
				url:'/api/goods/list'
			})
			
			let leftArr=[]
			let rightArr=[]
			
			res.forEach(v=>{
				leftArr.push({
					id:v.id,
					name:v.name
				})
				rightArr.push(v.data)
			})
			
			this.leftData=leftArr
			this.rightData=rightArr
			
			this.$nextTick(()=>{
				new BetterScroll(this.$refs.left,{
					click:true,
					bounce:false
				})
				
				this.rightBScroll=new BetterScroll(this.$refs.right,{
					click:true,
					probeType:3,
					bounce:false
				})
				
				let height=0;
				this.allHeight.push(height)
				
				let uls =this.$refs.right.getElementsByClassName('shop-list')
				
				Array.from(uls).forEach(v=>{
					height+=v.clientHeight
					this.allHeight.push(height)
				})
				
				this.rightBScroll.on('scroll',(pos)=>{
					this.scrollY=Math.abs(pos.y)
					
					if(Math.abs(pos.y)>=50){
						this.isShow=false
					}else{
						this.isShow=true
					}
				})
			})
		},
		methods:{
			goScroll(index){
				this.rightBScroll.scrollTo(0,-this.allHeight[index],300)
			}
		}
	}
</script>

<style scoped lang="scss">
	.list {
		display: flex;
		flex-direction: column;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
	}

	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 1.173333rem;
		background-color: #b0352f;

		.returns {
			line-height: 1.173333rem;
			padding: 0 0.4rem;
			color: #fff;

			i {
				font-size: 0.64rem;
			}
		}

		.search {
			display: flex;
			align-items: center;
			flex: 1;
			padding: 0.16rem 0.266667rem;
			background-color: #fff;
			border-radius: 0.64rem;

			i {
				padding-right: 0.16rem;
				color: #666;
				font-size: 0.48rem;
			}

			span {
				color: #666;
				font-size: 0.373333rem;
			}
		}

		.go-home {
			padding: 0.266667rem;
			line-height: 1.173333rem;

			img {
				width: 0.533333rem;
				height: 0.533333rem;
			}
		}
	}

	section {
		display: flex;
		flex: 1;
		overflow: hidden;
	}

	.list-l {
		width: 2.48rem;
		background-color: #fff;
		overflow: hidden;
		border-right: 1px solid #ccc;
		.l-item {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			li {
				width: 100%;
				padding: 0.08rem 0;
				margin: 0.533333rem 0;
				text-align: center;
				font-size: 0.373333rem;
			}
		}
	}

	.active {
		color: #b54f4a;
		border-left: 6px solid #b54f4a;
	}

	.list-r {
		flex: 1;
		overflow: hidden;
		.shop-list{
			text-align: center;
			h2{
				padding: 0.533333rem 0;
				font-size: 0.64rem;
				font-weight: 400;
			}
			.r-content{
				display: flex;
				flex-wrap: wrap;
				li{
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					width: 33.3%;
					padding: 0.266667rem 0;
					img{
						width: 1.413333rem;
						height: 1.413333rem;
					}
					span{
						font-size: 0.426667rem;
					}
				}
			}
		}
	}
	::v-deep.tabbar{
		border-top: 1px solid #ccc;
	}
</style>