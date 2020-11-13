// 文件上传
const WUpload = (url, uploadName, token, data = {}, source) => {
	return new Promise(function(resolve, reject) {
		uni.showLoading({
			title: '上传中...',
			mask: true
		})
		// data['token'] = token
		console.log(source)
		var tempFilePaths = source.tempFiles[0].path
		var name='null'
		if(source.tempFiles[0].name){
			name=source.tempFiles[0].name
		}else{
			name="tupian.jpg"
		}
		
		// let is_test = ''
		// data['is_test'] = 1
		let _this=this
		
		 const result1=uniCloud.uploadFile({
			cloudPath: name, //仅为示例，非真实的接口地址
			filePath: tempFilePaths,
			onUploadProgress: function(progressEvent) {
			  var percentCompleted = Math.round(
			    (progressEvent.loaded * 100) / progressEvent.total
			  );
			        },
			success: function(res) {
				uni.hideLoading()
				// 如果返回json格式，转换成字符串
				
					resolve(res)	
					//_this.$data.form.imageurlhead=res.fileID	
				
			},
			fail: function(err) {
				uni.hideLoading()
				uni.showToast({
					title: '上传失败，请稍后重试！',
					icon: 'none',
					duration: 2000
				})
			},
			complete: function() {}
		})
		
	})
}
// 判断是否未json
const IsJsonString = (str) => {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
}
export {
	WUpload
}
