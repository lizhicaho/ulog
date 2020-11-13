const db = uniCloud.database()
exports.get = async (data) => {
	const collection = db.collection('square')
	let user_message
	if (true) {
		user_message = await collection.orderBy('time','desc').get()
		
		if (user_message.affectedDocs < 1) {
			// 没有就新增
			
			return {
				code: global.wrongCode,
				msg: "没有数据呢"
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