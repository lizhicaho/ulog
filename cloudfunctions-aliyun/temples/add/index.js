// 增加人员
const db = uniCloud.database()
exports.add = async (data) => {
	const collection = db.collection('temples')
	
		const res = await collection.add({			
			username:data.username,
			type:data.types,
			fileurl:data.fileurl,
			imgurl:data.imgurl,
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