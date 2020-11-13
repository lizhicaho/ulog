const db = uniCloud.database()
exports.get = async (data) => {
	const collection = db.collection('temples')
	let user_message
	
	if (data.types!=-1) {
		console.log(data)
		user_message = await collection.where({
			type: data.types
		}).get()
		
		if (user_message.affectedDocs < 1) {
			// 没有就新增
			
			return {
				code: global.wrongCode,
				msg: "未查到啊"
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