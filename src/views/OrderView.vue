<template>
	<div class="order container">
		<header>
			<i class='iconfont icon-fanhui' @click="$router.back()"></i>
			<slot>
				<span>提交订单</span>
			</slot>
			<i class="iconfont icon-kefu"></i>
		</header>
		<section>
			<div class="path">
				<h3 class="path-title">收货信息</h3>
				<div class="path-content" @click="goPath">
					<div>
						<span>{{path.name}}</span>
						<span>{{path.tel}}</span>
					</div>
					<div>
						<span>{{path.province}}</span>
						<span>{{path.city}}</span>
						<span>{{path.county}}</span>
						<span>{{path.addressDetail}}</span>
					</div>
				</div>
			</div>
			<div class="payment">
				<div class="payment-title">支付方式：</div>
				<van-radio-group v-model="radioPayment">
					<van-radio name="wx">微信支付</van-radio>
					<van-radio name="zfb">支付宝支付</van-radio>
				</van-radio-group>
			</div>
			<div class="goods">
				<ul>
					<li v-for="(item,index) in goodsList" :key="index">
						<div>
							<img :src="item.goods_imgUrl" alt="">
						</div>
						<div class="goods-content">
							<h4>{{item.goods_name}}</h4>
							<div class="goods-total">
								<span>￥{{item.goods_price}}</span>
								<span>x{{item.goods_num}}</span>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</section>
		<footer>
			<div class="order-total">
				<span>共</span>
				<b>{{total.num}}</b>
				<span>件，</span>
				<span>总金额：</span>
				<em>￥{{total.price}}</em>
			</div>
			<div class="topay" @click="goPayment">
				提交订单
			</div>
		</footer>
	</div>
</template>


<script>
	import {
		Toast
	} from 'mint-ui';
	import http from '@/common/api/request.js'
	import bus from '@/common/bus.js'
	import {mapGetters,mapMutations,mapState} from 'vuex'
	import qs from 'qs'
	export default {
		data() {
			return{
				radioPayment:'wx',
				path:{},
				item:[],
				total:{
					price:0,
					num:0
				}
			}
		},
		created() {
			this.goodsList = JSON.parse( this.$route.query.goodsList );
			this.selectAddress();
			
		},
		activated(){
		    bus.$on('selectPath', function(data){
		         
		        this.path = JSON.parse(data);
		         
		    }.bind(this));
		    //选中的商品id号
		    this.item = JSON.parse( this.$route.query.detail );
		    this.goodsList = JSON.parse( this.$route.query.goodsList );
		    this.selectOrder();
		},
		computed:{
			...mapState({
				order_id:state=>state.order.order_id,
				selectList:state=>state.cart.selectList
			}),
			...mapGetters(['defaultPath'])
		},
		methods:{
			...mapMutations(['initData','initOrder']),
			goPath(){
				this.$router.push({
					path:'/path',
					query:{
						type:'select'
					}
				})
			},
			selectAddress(){
			    http.$axios({
			    	url:'/api/selectAddress',
			        method:"post",
			        headers:{
			            token:true
			        }
			    }).then(res=>{
			        this.initData( res.data );
			        //有默认收货地址
			        if( this.defaultPath.length ){
			            this.path = this.defaultPath[0];
			        }else{
			            this.path = res.data[0];
			        }
			    })
			},
			//查询订单
			selectOrder(){
			    http.$axios({
			    	url:'/api/selectOrder',
			        method:"post",
			        headers:{
			            token:true
			        },
			        data:{
			            order_id:this.order_id
			        }
			    }).then(res=>{
			        this.initOrder(res.data);
			        
			        this.total = {
			            price : res.data[0].goods_price,
			            num : res.data[0].goods_num
			        }
			    })
			},
			goPayment(){
				if(!this.path)return Toast('请填写收货地址')
				
				http.$axios({
					url:'/api/submitOrder',
				    method:"post",
				    headers:{
				        token:true
				    },
				    data:{
				        order_id:this.order_id,
						shopArr:this.selectList
				    }
				}).then(res=>{
					
					let newArr=[];
					this.goodsList.forEach(v=>{
						newArr.push(v.goods_name)
					})
					
					let dataOrder={
						order_id:this.order_id,
						name:newArr.join(''),
						price:this.total.price
					}
					
				    if(res.success){
						http.$axios({
							url:'/api/payment',
						    method:"post",
						    headers:{
						        token:true,
								'Content-Type':'application/x-www-form-urlencoded'
						    },
						    data:qs.stringify(dataOrder)
						}).then(res=>{
							if(res.success){
								window.location.href=res.paymentUrl;
							}
						})
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #fff;
		width: 100%;
		height: 1.173333rem;
		background-color: #b0352f;

		i {
			padding: 0 0.4rem;
			font-size: 0.586667rem;
		}

		span {
			font-weight: 400;
			font-size: 0.48rem;
		}
	}
	section{
		background-color: #f7f7f7;
		.path-title{
			padding: 0.4rem;
			font-size: 0.48rem;
		}
		.path-content{
			padding: 0.16rem 0.4rem;
			font-size: 0.373333rem;
			background-color: #fff;
			span{
				padding-right: 0.16rem;
			}
		}
		.payment{
			padding:0.16rem 0.4rem;
			background-color: #fff;
			font-size: 0.426667rem;
			margin-top: 0.266667rem;
			.van-radio-group{
				padding: 0.16rem 0;
				display: flex;
				.van-radio{
					padding-right: 0.266667rem;
				}
			}
		}
		.goods{
			padding:0.16rem 0.4rem;
			background-color: #fff;
			font-size: 0.426667rem;
			margin-top: 0.266667rem;
			ul{
				li{
					display: flex;
					img{
						width: 1.973333rem;
						height: 1.973333rem;
					}
					.goods-content{
						flex: 1;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						padding-left: 0.4rem;
						.goods-total{
							display: flex;
							justify-content: space-between;
						}
					}
				}
			}
		}
	}
	footer{
		width: 100%;
		height: 1.2rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-top: 1px solid #ccc;
		.order-total{
			font-size: 0.426667rem;
			span{
				padding: 0 0.16rem;
			}
			b{
				color: #b0352f;
			}
			em{
				font-size: 0.48rem;
				color: #b0352f;
			}
		}
		.topay{
			width: 3.2rem;
			line-height: 1.2rem;
			color: #fff;
			font-size: 0.426667rem;
			text-align: center;
			background-color: #b0352f;
		}
	}
</style>