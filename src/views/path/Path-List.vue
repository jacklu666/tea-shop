<template>
	<div class="container">
		<Header>
			<span v-if="pathState">添加地址</span>
			<span v-else>编辑地址</span>
		</Header>
		<section>
			<van-address-edit
			v-if="pathState"
			  :area-list="areaList"
			  show-set-default
			  show-search-result
			  @save="onSave"
			/>
			
			<van-address-edit
				v-else
				:address-info="AddressInfo"
			  :area-list="areaList"
			  show-delete
			  show-set-default
			  show-search-result
			  @save="onUpdate"
			  @delete="onDelete"
			/>
		</section>
		<Tabbar></Tabbar>
	</div>
</template>

<script>
	import { Toast } from 'vant';
	import http from '@/common/api/request.js'
	import Header from '@/components/path/Header.vue'
	import Tabbar from '@/components/common/Tabbar.vue'
	export default{
		data() {
		    return {
				pathState:false,
		      areaList:{
				  province_list: {
				      110000: '北京市',
				      120000: '天津市',
				    },
				    city_list: {
				      110100: '北京市',
				      120100: '天津市',
				    },
				    county_list: {
				      110101: '东城区',
				      110102: '西城区',
					  120101: '塘沽区',
				      // ....
				    },
			  }
		    }
		  },
		components:{
			Header,
			Tabbar
		},
		created() {
			let key=JSON.parse(this.$route.params.key);
			if(key=='add'){
				this.pathState=true
			}else{
				this.AddressInfo=key
				this.AddressInfo.isDefault=this.AddressInfo.isDefault==1?true:false
			}
		},
		methods: {
		    onSave(content) {
				content.isDefault=content.isDefault==true?1:0
				http.$axios({
					url:'/api/addAddress',
					method:'post',
					headers:{
						token:true
					},
					data:{
						...content
					}
				}).then(res=>{
					if(!res.success)return;
					Toast(res.msg);
					this.$router.push('/path')
				})
				
		    },
			onUpdate(content){
				content.isDefault=content.isDefault==true?1:0
				http.$axios({
					url:'/api/updateAddress',
					method:'post',
					headers:{
						token:true
					},
					data:{
						...content
					}
				}).then(res=>{
					if(!res.success)return;
					Toast(res.msg);
					this.$router.push('/path')
				})
			},
			onDelete(content){
				Toast('delete');
				http.$axios({
					url:'/api/deleteAddress',
					method:'post',
					headers:{
						token:true
					},
					data:{
						id:content.id
					}
				}).then(res=>{
					if(!res.success)return;
					Toast(res.msg);
					this.$router.push('/path')
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	section{
		background-color: #f7f7f7;
		::v-deep .van-button--danger{
			background-color: #b0352f;
			border: none;
		}
	}
	::v-deep .tabbar{
		border-top: 2px solid #ccc;
	}
</style>