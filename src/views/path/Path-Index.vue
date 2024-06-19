<template>
	<div class="container">
		<Header></Header>
		<section>
			<ul v-if="list.length">
				<li @click="goList(item)" v-for="(item,index) in list" :key="index">
					<div>
						<span>{{item.name}}</span>
						<span>{{item.tel}}</span>
					</div>
					<div class="city">
						<span class="active" v-if="item.isDefault==1">[默认]</span>
						<span>{{item.province}}</span>
						<span>{{item.city}}</span>
						<span>{{item.county}}</span>
						<span>{{item.addressDetail}}</span>
					</div>
				</li>
			</ul>
			<h1 v-else>暂无数据，请添加地址</h1>
			<div class="add-path" @click="goList('add')">添加地址</div>
		</section>
		<Tabbar></Tabbar>
	</div>
</template>

<script>
	import http from '@/common/api/request.js'
	import Header from '@/components/path/Header.vue'
	import Tabbar from '@/components/common/Tabbar.vue'
	import {mapState,mapMutations} from 'vuex'
	import bus from '@/common/bus.js'
	export default{
		data() {
			return{
				pathStatus:false
			}
		},
		components:{
			Header,
			Tabbar
		},
		created() {
			if(this.$route.query.type=='select'){
				this.pathStatus=true
			}
			
			this.getData()
		},
		computed:{
			...mapState({
				list:state=>state.path.list
			})
		},
		methods:{
			...mapMutations(['initData']),
			goList(option){
				
				//this.pathStatus为true代表从订单页面进入的：选择状态
				if( this.pathStatus ){
				    bus.$emit('selectPath', JSON.stringify(option) );
				    this.$router.back();
				    return;
				}
				
				this.$router.push({
					name:'path-list',
					params:{
						key:JSON.stringify(option)
					}
				})
			},
			getData(){
				http.$axios({
					url:'/api/selectAddress',
					method:'post',
					headers:{
						token:true
					}
				}).then(res=>{
					this.initData(res.data)
					console.log(res)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	section{
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #f7f7f7;
		ul{
			width: 100%;
			li{
				background-color: #fff;
				margin: 0.16rem 0;
				padding: 0.16rem 0.266667rem;
				span{
					padding-right: 0.4rem;
					font-size: 0.426667rem;
				}
				.active{
					color: #b0352f;
				}
				.city{
					span{
						padding-right: 0.16rem;
					}
				}
			}
		}
		.add-path{
			margin-top: 0.8rem;
			background-color: #b0352f;
			color: #fff;
			font-size: 0.48rem;
			text-align: center;
			width: 3.2rem;
			line-height: 1.173333rem;
			border-radius: 4px;
		}
	}
	::v-deep .tabbar{
		border-top: 2px solid #ccc;
	}
</style>