const User={
	queryUserTel(option){
		return 'select * from user where tel='+option.userTel+'';
	},
	queryUserPwd(option){
		return 'select * from user where (tel='+option.userTel+') and pwd ='+option.userPwd+'';
	},
	//新增用户
	inserData( option ){
		let userTel = option.userTel;
		let userPwd = option.userPwd || '666666';
		
		let jwt =require('jsonwebtoken');
		
		let payload={tel:userTel};
		
		let secret="xiaoluxian";
		
		let token=jwt.sign(payload,secret,{
			expiresIn:60
		});
		
		return 'insert into user (tel,pwd,imgUrl,nickName,token) values ("'+userTel+'","'+userPwd+'","/images/user.jpeg","'+userTel+'","'+token+'")';
	}
}
exports = module.exports=User