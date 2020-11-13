// 增加人员
const db = uniCloud.database()
exports.add = async (data) => {
	const collection = db.collection('square')
	
		const res = await collection.add({			
			textareaBValue:data.textareaBValue ,		
			imageurlhead:data.imageurlhead,
			userinfo:data.userinfo,
			openid:data.openid,
			time:data.time
		})
		if(res!= null){
			return {
				code: global.successCode,
				msg: global.successMsg
			}
		}else{
			return {
				code: global.successCode,
				msg: "提交失败喽"
			}
		}
		
	

}