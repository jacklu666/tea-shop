import {
	CART_LIST,
	CHECK_ALL,
	UN_CHECK_ALL,
	CHECK_ITEM
} from './mutations-types.js'
import {
	Toast,
	Dialog
} from 'vant';
import http from '@/common/api/request.js'
export default {
	state: {
		list: [],
		selectList: []
	},
	getters: {
		isCheckedAll(state) {
			return state.list.length == state.selectList.length
		},
		total(state) {
			let total = {
				num: 0,
				price: 0
			}
			state.list.forEach(v => {
				if (v.checked) {
					total.num += parseInt(v.goods_num);
					total.price += v.goods_price * v.goods_num
				}
			})
			return total
		}
	},
	mutations: {
		[CART_LIST](state, cartArr) {
			state.list = cartArr;
			
			// state.selectList=cartArr;
			
			state.selectList=state.list.map(v=>{
				return v.id
			})
		},
		[CHECK_ALL](state) {
			state.selectList = state.list.map(v => {
				v.checked = true;
				return v.id;
			})
		},
		[UN_CHECK_ALL](state) {
			state.list.forEach(v => {
				v.checked = false;
			})
			state.selectList = []
		},
		[CHECK_ITEM](state, index) {
			let id = state.list[index].id;
			let i = state.selectList.indexOf(id)
			if (i > -1) {
				return state.selectList.splice(i, 1)
			} else {
				state.selectList.push(id)
			}
		},
		delGoods(state){
			state.list=state.list.filter(v=>{
				return state.selectList.indexOf(v.id)==-1
			})
		}
	},
	actions: {
		checkAllFn({
			commit,
			getters
		}) {
			getters.isCheckedAll ? commit('unCheckAll') : commit('checkAll')
		},
		delGoodsFn({
			state,commit
		},id) {
			if (state.selectList.length == 0) {
				Toast('请选择商品')
			}
			
			let arrCart=[];

			Dialog.confirm({
				message: '确定要删除这些商品吗？',
			}).then(() => {
				
				if(typeof id =='number'){
					arrCart=[id]
					let index= state.list.findIndex(v=>{
						return v.id==id
					})
					state.list.splice(index,1)
				}else{
					arrCart=state.selectList
					commit('delGoods')
					// commit('unCheckAll')
				}
				
				http.$axios({
					url: '/api/deleteCart',
					method: 'post',
					data:{
						arrId:arrCart
					}
				}).then(res=>{
					if(res.success){
						Toast(res.msg)
					}
				})
			}).catch(()=>{
				return
			})
		}
	}
}