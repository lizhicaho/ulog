<template>
	<div>
		<cu-custom bgColor="bg-gradual-pink" v-bind:isBack="true">
			<view slot="backText">返回</view>
			<view slot="content">管理员简历上传</view>
		</cu-custom>
		<view class="cu-form-group margin-top">
			<view class="title">上传人</view>
			<input value="" v-model='form.username' type="text" placeholder="名称"></input>
		</view>
		<view class="cu-form-group margin-top">
			<view class="title">模板类型选择</view>
				<picker @change="PickerChange" value="index" :range="picker">
						<view class="picker">
							{{index?picker[index]:'请选择你的上传类型'}}
						</view>
					</picker>
		</view>
		
    <view class="w-upload">
		
        <button class="w-btn" type="primary" @click="uploadOpen" plain="true">上传</button>
        <w-upload
            ref="wUpload"
            :token="token"
            :fileShow="fileShow"
            :imgShow="imgShow"
            :uploadName="uploadName"
            :requestUrl="requestUrl"
            :fileType="fileType"
            :imgType="imgType"
            @updateImgList="updateImgList"
            @updateFileList="updateFileList"
            :fileList="fileList"
            :imgList="imgList"
            @imgSuccess="imgSuccess"
            @fileSuccess="fileSuccess"
        ></w-upload>
		
		<view class="padding">
		  <button  @tap='push' class="cu-btn block line-orange lg">
		    <text class="cuIcon-upload"></text> 提交</button>
		  
		</view> 
		  
		
    </view>
	 
	</div>
</template>

<script>
	
	import wUpload from '@/components/file-img-upload/w-upload.vue';
	export default {
	    components: { wUpload },
	    data() {
	        return {
				form: {
					username:'',
					types:0,
					fileurl:'',
					imgurl:'',
					openid:'null',
					// time:DateTime.Now.ToString("yyyy/MM/dd HH:mm:ss")
					time: this.gettime(),
					// new Date().toISOString().slice(0,19)
				},
				index: null,
	            imgShow: true,// 是否展示图片列表
	            fileShow: true,// 是否展示文件列表
	            token : '', // 非必填
	            requestUrl: '', // 上传文件/图片的请求地址，必填
	            uploadName: 'upload_resource', // 看上传文件/图片接口的名字关键字，必填
	            fileType : 'file', // 看上传接口要求的文件格式关键字，必填
	            imgType : 'pictures',// 看上传接口要求上传的图片格式关键字，必填
	            fileList: [],
	            imgList: [],
	            src : "" ,// 下载文件的网络地址
				picker: ['应届生标准简历', '技术类简洁简历', '互联网风格简历','通用简洁版简历','英文版简历'],
				
			};
	    },
	    created() {},
		onLoad() {
			console.log(new Date())
		let _this=this
		const opid=uni.getStorage({
			key:'openid',
			success: function (res) {
			        console.log(res.data);
					_this.form.openid = res.data
					console.log(_this.form.openid);
			    }
		
			
			
		})
		//console.log()
		},
	    methods: {
			async push() {
					console.log(this.form)
					let res = await uniCloud.callFunction({
						name: 'temples',
						data: Object.assign({}, this.form, {
							type: 'add'
						})
					})
					
					if (res.result.code === 0) {
						this.time=new Date().toISOString().slice(0,19)
						this.$toast('提交成功')
						//this.$relaunch('/templatez/templatez')
					} else {
						this.$toast(res.result.msg)
					}
					
				
			},
			gettime(){
				
				var year=new Date().getFullYear();//年
				if (year< 1900) year = year + 1900;
				var month = new Date().getMonth() + 1;//月
				if (month < 10) month = '0' + month;
				var day = new Date().getDate();//日
				if (day < 10) day = '0' + day;
				var hour = new Date().getHours();//小时
				if (hour < 10) hour = '0' + hour;
				var minute = new Date().getMinutes();//分钟
				if (minute < 10) minute = '0' + minute;
				var second = new Date().getSeconds();//秒
				if (second < 10) second = '0' + second;
				var str=year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
				console.log(str)
				return str
			},
	        // 打开上传文件弹窗
	        uploadOpen() {
	            this.$refs.wUpload.uploadOpen();
	        },
	        // 下载预览文件/图片
	        wpriven(url) {
	            this.$refs.wUpload.wpriven(url);
	        },
	        // 返回被删除的文件和索引号
	        updateFileList(val) {
	            this.fileList=[]
	        },
	        // 返回被删除的图片和索引号
	        updateImgList(val) {
	            console.log(val);
				this.imgList=[]
	        },
	        // 返回图片上传成功后的图片信息
	        imgSuccess(val) {
	            console.log(val);
				val.src=val.fileID
				this.imgList=[val]
				
				this.form.imgurl=val.fileID
	        },
	        // 返回文件/图片上传成功后的文件信息
	        fileSuccess(val) {
				 console.log(val);
				this.fileList=[val]
				this.form.fileurl=val.fileID
	        },
			PickerChange(e) {
									    
					this.index= e.detail.value
					if(e.detail.value==0){
						this.form.types=this.index
					}else if(e.detail.value==1){
						this.form.types=this.index
					}else if(e.detail.value==2){
						this.form.types=this.index
					}else if(e.detail.value==3){
						this.form.types=this.index
					}else {
						this.form.types=this.index
					}
					console.log(this.form.time)
					
			}
	    }
	};
</script>

<style>
	.cu-form-group .title {
	  min-width: calc(4em + 30rpx);
	}
	
</style>
