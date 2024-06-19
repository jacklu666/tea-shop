<template>
	<div class="home">
		<div class="headers">
			<div class="headers-main">
				<Header></Header>
				<ly-tabs v-model="value" activeColor="#b0352f" @change="changeTab">
					<ly-tab-item name="1" title="推荐" />
					<ly-tab-item name="2" title="大红袍" />
					<ly-tab-item name="3" title="铁观音" />
					<ly-tab-item name="4" title="绿茶" />
					<ly-tab-item name="5" title="普洱" />
					<ly-tab-item name="6" title="茶具" />
					<ly-tab-item name="7" title="花茶" />
				</ly-tabs>
			</div>
		</div>
		<section class="wrapper">
			<div>
				<div v-for="(item,index) in newData" :key="index">
				<Swiper v-if="item.type=='swiperList'" :swiperList='item.data'></Swiper>
				<Icons v-if="item.type=='iconsList'" :iconsList="item.data"></Icons>
				<Recommend v-if="item.type=='recommendList'" :recommendList="item.data"></Recommend>
				<Like v-if="item.type=='likeList'" :likeList="item.data"></Like>
				<Ad v-if="item.type=='adList'" :adList="item.data"></Ad>
				</div>
			</div>
		</section>
		<Tabber></Tabber>
	</div>
</template>

<script>
	// @ is an alias to /src
	import Header from '@/components/home/Header.vue'
	import Swiper from '@/components/home/Swiper.vue'
	import Icons from '@/components/home/Icons.vue'
	import Recommend from '@/components/home/Recommend.vue'
	import Like from '@/components/home/Like.vue'
	import Ad from '@/components/home/Ad.vue'
	import BetterScroll from 'better-scroll'
	import http from '@/common/api/request.js'
	import Tabber from '@/components/common/Tabbar.vue'
	export default {
		name: 'HomeView',
		data() {
			return {
				value: '1',
				topBar:[],
				newData:[],
				oBetterScroll:'',
				tBetterScroll:''
			}
		},
		components: {
			Tabber,
			Header,
			Swiper,
			Icons,
			Recommend,
			Like,
			Ad
		},
		created() {
			this.getData()
		},
		methods:{
			changeTab(index){
				this.addData(index)
			},
			async getData(){
				
				let res=await http.$axios({
					url:'/api/index_list/1/data/1'
				})
				 
				this.topBar=Object.freeze(res.topBar);
				this.newData=Object.freeze(res.data);
				
				
				
				this.$nextTick(()=>{
					this.oBetterScroll= new BetterScroll('.wrapper', {
						movable: true,
						zoom: true,
						click:true
					})
				})
			},
			async addData(index){
				let res=await http.$axios({
					url:'/api/index_list/'+index+'/data/1'
				});
				
				if(res.constructor!=Array){
					this.newData=res.data;
				}else{
					this.newData=res;
				}
				
				this.$nextTick(()=>{
					this.tBetterScroll= new BetterScroll('.wrapper', {
						movable: true,
						zoom: true,
						click:true
					})
				})
			}
		}
	}
</script>

<style scoped>
	.home {
		display: flex;
		flex-direction: column;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
	}

	.ly-tabs {
		/* position: fixed;
		top: 60px;
		left: 0; */
		background-color: transparent;
		border-bottom: none;
	}

	.headers {
		width: 100%;
		height: 2.88rem;
	}

	.headers-main {
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
	}

	section {
		flex: 1;
		overflow: hidden;
		/* margin-top: 2.8rem; */
	}
</style>