const db = uniCloud.database()
exports.get = async (data) => {
	const collection = db.collection('user_self')
	let user_message
	
	if (data.openid) {
		user_message = await collection.where({
			openid: data.openid
		}).orderBy('time','desc').limit(1).get()
		
		if (user_message.affectedDocs < 1) {
			// 没有就新增
			
			return {
				code: global.wrongCode,
				msg: "用户还未填表啊"
			}
		}
		
		return {
			code: global.successCode,
			msg: user_message
		}
	} else {
		
		
		
			return {
				code: global.wrongCode,
				msg: '用户还未登录啊！'
			
		}
	}
}