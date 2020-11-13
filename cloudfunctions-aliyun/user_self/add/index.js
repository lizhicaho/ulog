// 增加人员
const db = uniCloud.database()
exports.add = async (data) => {
	const collection = db.collection('user_self')
	
		const res = await collection.add({			
			username:data.username,
			sex:data.sex,
			age:data.age,
			phone:data.phone,
			email:data.email,
			learn:data.learn,
			work:data.work,
			epx:data.epx,
			study:data.study,
			item:data.item,
			internship:data.internship,
			self:data.self,
			skill:data.skill,
			openid:data.openid,
			imageurlhead:data.imageurlhead,
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