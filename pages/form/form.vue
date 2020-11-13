<template>
	<div>
		<cu-custom bgColor="bg-gradual-pink" v-bind:isBack="true">
			<view slot="backText">返回</view>
			<view slot="content">表单</view>
		</cu-custom>
			<view class="cu-bar bg-white margin-top">
				<view class="action">
					简历照片上传
				</view>
				<view class="action">
					{{imgList.length}}/就一张哦
				</view>
			</view>
			
			
				<view class="cu-form-group">
					<view class="grid col-4 grid-square flex-sub">
						<view class="bg-img" v-for="index in imgList"  @tap="ViewImage" :data-url="imgList[index]">
							<image v-bind:src='imgList[0]' mode='aspectFill'></image>
							<view class="cu-tag bg-red" @tap="DelImg" :data-index="index">
								<text class="cuIcon-close"></text>
							</view>
						</view>
						<view class="solids" @tap="ChooseImage">
							<text class="cuIcon-cameraadd"></text>
						</view>
					</view>
				</view>
			
			
			<view class="cu-form-group margin-top">
				<view class="title">姓名</view>
				<input value="" v-model='form.username' type="text" placeholder="您的姓名"></input>
			</view>
			
				<view class="cu-form-group">
					<switch @tap="changesex" class="switch-sex" checked></switch>
					<view  class="title">性别</view>
				</view>
			<view class="cu-form-group margin-top">
				<view class="title">年龄</view>
				<input value="" v-model='form.age' type="number" placeholder="您的年龄"></input>
			</view>
			
				<view class="cu-form-group margin-top">
					<view class="title">学历选择</view>
						<picker @change="PickerChange" value="index" :range="picker">
								<view class="picker">
									{{index?picker[index]:'请选择你的学历'}}
								</view>
							</picker>
				</view>
			
			
			<view class="cu-form-group margin-top">
				<view class="title">经验</view>
				<input value="" v-model='form.epx' type="text" placeholder="您的工作时间"></input>
			</view>
			
			<view class="cu-form-group margin-top">
				<view class="title">邮箱</view>
				<input value="" v-model='form.email' type="text" placeholder="您的邮箱"></input>
			</view>
			<view class="cu-form-group">
					<view class="title">手机号码</view>
					<input placeholder="输入框带标签" value="" v-model='form.phone' ></input>
					<view class="cu-capsule radius">
						<view class="cu-tag bg-blue">
							+86
						</view>
						<view class="cu-tag line-blue">
							中国大陆
						</view>
					</view>
				</view>
			
		
			<view class="cu-form-group margin-top">
				<view class="title">意向岗位</view>
				<input value="" v-model='form.work' type="text" placeholder="您的意向岗位"></input>
			</view>
			
				<view class="cu-form-group align-start">
					<view class="title">教育背景</view>
					<textarea v-model="form.study" value='' maxlength="-1" type='text' placeholder="多行文本输入框"></textarea>
				</view>
				<view class="cu-form-group align-start">
					<view class="title">项目经历</view>
					<textarea v-model="form.item" value='' maxlength="-1" type='text' placeholder="多行文本输入框"></textarea>
				</view>
				<view class="cu-form-group align-start">
					<view class="title">实习经历</view>
					<textarea v-model="form.internship" value='' maxlength="-1" type='text' placeholder="多行文本输入框"></textarea>
				</view>
				<view class="cu-form-group align-start">
					<view class="title">自我评价</view>
					<textarea v-model="form.self" value='' maxlength="-1" type='text' placeholder="多行文本输入框"></textarea>
				</view>
				<view class="cu-form-group align-start">
					<view class="title">技能描述</view>
					<textarea v-model="form.skill" value='' maxlength="-1" type='text' placeholder="多行文本输入框"></textarea>
				</view>
			
			<view class="padding flex flex-direction">
			 <button  type="primary" @tap='push' class="cu-btn bg-red margin-tb-sm lg">提交</button>
			</view>
			
					
	</div>
	
</template>

<script>
	export default {
		data() {
			return {
				form: {
					username: '',
					sex:'男',
					sex1:true,
					age:'',
					phone:'',
					email:'',
					learn:'',
					work:'',
					epx:'',
					modalName: null,
					study:'',
					textareaBValue:'',
					item:'',
					internship:'',
					self:'',
					skill:'',	
					openid:'null',
					imageurlhead:'',
					time: new Date().toISOString().slice(0,19),
				},
				index: null,
				picker: ['中专', '本科', '硕士','博士','其他'],
				imgList: []
			}
		},
		onLoad() {
		let _this=this
		const opid=uni.getStorage({
			key:'openid',
			success: function (res) {
			        console.log(res.data);
					_this.form.openid = res.data
					console.log(_this.form.openid);
			    }

			
			
		})
		},
		methods: {

			 
			async push() {		
					
					let res = await uniCloud.callFunction({
						name: 'user_self',
						data: Object.assign({}, this.form, {
							type: 'add'
						})
					})
					
					if (res.result.code === 0) {
						this.$toast('提交成功')
						this.$relaunch('/templatez/templatez')
					} else {
						this.$toast(res.result.msg)
					}
					
				
			},
			
			
			
			ChooseImage() {
			    uni.chooseImage({
			      count: 1, //默认9
			      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			      sourceType: ['album'], //从相册选择
			      success: (res) => {
			        if (res.tempFilePaths.length > 0) {
						let filePath = res.tempFilePaths[0]
						this.imgList=res.tempFilePaths
						this.form.imageurlhead=this.imgList[0]
						// promise方式
						let _this=this
						 const result1=uniCloud.uploadFile({
						        filePath: filePath,
						        cloudPath: 'a.jpg',
						        onUploadProgress: function(progressEvent) {
						          var percentCompleted = Math.round(
						            (progressEvent.loaded * 100) / progressEvent.total
						          );
						                },
						                success(res) {	
											console.log(res.fileID)	
											_this.$data.form.imageurlhead=res.fileID	
										},
						                fail() {},
						                complete() {}
						            });
			        } else {
			          console.log("图片上传失败哦")
			        
			        }
			      }
			    });
				
				
				
				
			  },
			  ViewImage(e) {
			    uni.previewImage({
			      urls: this.imgList,
			      current: e.currentTarget.dataset.url
			    });
			  },
			  DelImg(e) {
			    uni.showModal({
			      title: '靓仔',
			      content: '确定要删除这段回忆吗？',
			      cancelText: '再看看',
			      confirmText: '再见',
			      success: res => {
			        if (res.confirm) {
			        
			            this.imgList=[]
						this.form.imageurlhead=''
			         
			        }
			      }
			    })
			  },
			
			
			changesex(){
				this.form.sex1=!this.form.sex1
				
				if(this.form.sex1){
					this.form.sex='男'
				}else{
					this.form.sex='女'
				}
				console.log(this.form)
			},
			PickerChange(e) {
								    
				this.index= e.detail.value
				this.form.learn=this.picker[this.index]
				
		},
		}
	}
</script>

<style>
	.cu-form-group .title {
	  min-width: calc(4em + 30rpx);
	}

</style>
