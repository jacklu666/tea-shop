import {USER_LOGIN,INIT_USER} from './mutations-types.js';
export default{
	
	state:{
		loginStatus:false,
		token:null,
		userInfo:{}
	},
	getters:{
		
	},
	mutations:{
		[USER_LOGIN](state,user){
			state.loginStatus=true;
			state.token=user.token;
			state.userInfo=user;
			
			localStorage.setItem('teaUserInfo',JSON.stringify(user))
		},
		[INIT_USER](state){
			let userInfo=JSON.parse(localStorage.getItem('teaUserInfo'))
			if(userInfo){
				state.loginStatus=true;
				state.token=userInfo.token;
				state.userInfo=userInfo;
			}
		},
		loginOut(state){
			state.loginStatus=false;
			state.token=null;
			state.userInfo={};
			localStorage.removeItem('teaUserInfo')
		}
	},
	actions:{
		
	}
	
}