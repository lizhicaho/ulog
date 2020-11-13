<template>
	<div>
    <view>
		
		<view>
			<cu-custom :bgColor="'bg-'+themeColor.name" :isBack="true" :icon="'sort'">
				
				<block slot="content">广场</block>
			</cu-custom> 				
		</view>
		<view>
			
			        <drag-button
			            :isDock="true"
			            :existTabBar="true"
			            @btnClick="showModal('DialogModal1')"
			            @btnTouchstart="btnTouchstart"
			            @btnTouchend="btnTouchend" />
			    
		</view>
		<view v-for="(item,index) in  form">
			<view class="cu-card dynamic" :class="isCard?'no-card':''">
				
				<view class="cu-item shadow">
					<view class="cu-list menu-avatar">
						<view class="cu-item">
							<view class="cu-avatar round lg" :style="'background-image:url('+item.userinfo.avatarUrl+')'"></view>
							<view class="content flex-sub">
								<view>{{item.userinfo.nickName}}</view>
								<view class="text-gray text-sm flex justify-between">
									{{item.time}}
								</view>
							</view>
						</view>
					</view>
					<view class="text-content">
						{{item.textareaBValue}}
					</view>
					<view class="grid flex-sub padding-lr" :class="isCard?'col-3 grid-square':'col-1'">
						<view class="bg-img" :class="isCard?'':'only-img'" :style="'background-image:url('+item.imageurlhead+')'">
						</view>
					</view>
				</view>
			</view>
			
		</view>
       
		
		
		
	
		
	</view>
	
				
				
			
			<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end">
						<view class="content">你的简小历瞬间</view>
						<view class="action" @tap="hideModal">
							<text class="cuIcon-close text-red"></text>
						</view>
					</view>
					<view class="padding-xl">
						<view class="cu-form-group align-start">
							<view class="title">文本框</view>
							<textarea maxlength="-1" @input="textareaBInput" placeholder="多行文本输入框"></textarea>
						</view>
						<view class="cu-bar bg-white margin-top">
							<view class="action">
								图片上传
							</view>
							<view class="action">
								{{imgList.length}}/4
							</view>
						</view>
						<view class="cu-form-group">
							<view class="grid col-4 grid-square flex-sub">
								<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
								 <image :src="imgList[index]" mode="aspectFill"></image>
									<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
										<text class='cuIcon-close'></text>
									</view>
								</view>
								<view class="solids" @tap="ChooseImage" v-if="imgList.length<4">
									<text class='cuIcon-cameraadd'></text>
								</view>
							</view>
						</view>
					</view>
					<view class="cu-bar bg-white justify-end">
						<view class="action">
							<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
							<button class="cu-btn bg-green margin-left" @tap="RLSUBMIT">确定</button>
						</view>
					</view>
				</view>
			</view>
			</div>
</template>
<script>
	import dragButton from "@/components/drag-button/drag-button.vue";
    export default {
		components: {
		        dragButton
		    },
        data() {
            return {			
								form:{},
								refreshing: false,
								imgList: [],
								textareaBValue: '',
								CustomBar: this.CustomBar,
								modalName: null,
								radio: 'radio1',
								imageurlhead:'',
								userinfo:{},
								openid:'',
								time:this.gettime()
            };
        },
		
		
		onLoad(){
			let _this=this
			
			const opid=uni.getStorage({
				key:'userinfo',
				success: function (res) {
				        //console.log(res.data);
						_this.userinfo = res.data
						//console.log(_this.userinfo);
				    }			
			})
			const openid=uni.getStorage({
				key:'openid',
				success: function (res) {
				        //console.log(res.data);
						_this.openid = res.data
						//console.log(_this.form.openid);
						
						console.log(res.data)
						
						
				    }
			
				
				
			})
			console.log("==1")
		},
		onShow(){
			console.log("==2")
			this.userlogin()
		},
		onReachBottom() {
		    console.log("滑动到页面底部")
			
		},
		onPullDownRefresh() {
			console.log("下拉刷新");			
			this.userlogin()
			this.refreshing = true;
		},
        methods: {
						ChooseImage() {
							uni.chooseImage({
								count: 4, //默认9
								sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
								sourceType: ['album'], //从相册选择
								success: (res) => {
									if (this.imgList.length != 0) {
										this.imgList = this.imgList.concat(res.tempFilePaths)
									} else {
										this.imgList = res.tempFilePaths
									}
								}
							});
						},
						async userlogin(){
							console.log(this.$data)
							let res = await uniCloud.callFunction({
								name: 'square',
								data: Object.assign({}, this.$data, {type: 'get'})
							})
							
							if (res.result.code === 0) {
								//this.$toast('加载成功')
								this.form=res.result.msg.data
								console.log(res.result.msg.data)
								//this.form=res.result.msg.data[0]
							
							} else {
									console.log(res.result.msg)
									uni.navigateTo({
									 url: '/pages/square/square' ,
									 animationType:"slide-in-left", // 跳转动画
									 animationDuration: 800
									})
								
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
						ViewImage(e) {
							uni.previewImage({
								urls: this.imgList,
								current: e.currentTarget.dataset.url
							});
						},
						DelImg(e) {
							uni.showModal({
								title: '删除',
								content: '确定要删除该图片吗？',
								cancelText: '取消',
								confirmText: '删除',
								success: res => {
									if (res.confirm) {
										this.imgList.splice(e.currentTarget.dataset.index, 1)
									}
								}
							})
						},
						textareaBInput(e) {
							this.textareaBValue = e.detail.value
						},
						showModal(e) {
							this.modalName = e
						},
						hideModal(e) {
							this.modalName = null
						},
						RadioChange(e) {
							this.radio = e.detail.value
						},
						ChooseCheckbox(e) {
							let items = this.checkbox;
							let values = e.currentTarget.dataset.value;
							for (let i = 0, lenI = items.length; i < lenI; ++i) {
								if (items[i].value == values) {
									items[i].checked = !items[i].checked;
									break
								}
							}
						},
						
			btnClick(){
				console.log("init---悬浮按钮")
			},
			btnTouchstart(){
				console.log("initstart---悬浮按钮")
			},
			btnTouchend(){
				console.log("initend---悬浮按钮")
			},
			async push() {
					
					let res = await uniCloud.callFunction({
						name: 'square',
						data: Object.assign({}, this.$data, {
							type: 'add'
						})
					})
					
					if (res.result.code === 0) {
						this.$toast('提交成功')
						this.$relaunch('/square/square')
					} else {
						this.$toast(res.result.msg)
					}
					
				
			},
			RLSUBMIT() {
				console.log(this.imgList)
				let filePath = this.imgList[0]
				let _this=this
					const result1=uniCloud.uploadFile({
					        filePath: filePath,
					        cloudPath: 's.jpg',
					        onUploadProgress: function(progressEvent) {
					          var percentCompleted = Math.round(
					            (progressEvent.loaded * 100) / progressEvent.total
					          );
					                },
					                success(res) {	
										//console.log(res.fileID)	
										_this.$data.imageurlhead=res.fileID	
										_this.$toast('提交成功')
										_this.push()
									},
					                fail() {
										console.log("fali")
										_this.$toast('提交失败')
									},
					                complete() {}
					            });
				//console.log("======")
				console.log(this.$data)
				
				this.modalName = null
			},
		}
    }
</script>
<style>
    .cu-card.dynamic>.cu-item>.text-content {
        margin-bottom: 1px;
        margin-top: 6px;
    }
	
	button .cu-tag {
		position: absolute;
		top: 8upx;
		right: 8upx;
	}
	.cu-btn {
		width: 300rpx;
	}
</style>