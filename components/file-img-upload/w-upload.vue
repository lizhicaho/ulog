<template>
	<view class="w-upload">
		<view class="fileBox" v-if="fileShow">
			<view class="filePath" v-for="(j, index1) in fileList" :key="index1">
				<view class="text1" @click="wpriven(j.src)">{{j.name}}</view>
				<view class="w-edit" @click="wdelete(index1, fileList, 1)"><text class="w-btn1">x</text></view>
			</view>
		</view>
		<view class="imgList" v-if="imgShow">
			<view class="imgItem" v-for="(k, index2) in imgList" :key="index2">
				<image class="w-img" :src="k.src" mode="" @click="wpriven(k.src)"></image>
				<text class="cancel" @click="wdelete(index2, imgList, 2)">x</text>
			</view>
			<view class="addItem" @click="upLoadImg(1)">+</view>
		</view>
		<view class="w-drawer">
			<view class="w-setbox" :class="{ wShow: isshow }">
				<view class="w-header">
					<view class="w-item w-item1" @click="wselect(index)" v-for="(i, index) in selectList" :key="index">{{ i }}</view>
					<view class="w-line"></view>
					<view class="w-item" @click="wclose">取消</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { WUpload } from '@/components/file-img-upload/upload.js';
export default {
	props: {
		token : {
			type: String,
			default: ''
		},
		fileShow: {
			type: Boolean,
			default: false
		},
		imgShow: {
			type: Boolean,
			default: false
		},
		fileList: {
			type: Array,
			default: [{name:"sdf"}]
		},
		imgList: {
			type: Array,
			default: []
		},
		requestUrl: {
			type: String,
			default: ''
		},
		uploadName: {
			type: String,
			default: 'file'
		},
		fileType: {
			type: String,
			default: ''
		},
		imgType: {
			type: String,
			default: ''
		}
	},
	name: 'WUpload',
	data() {
		return {
			isshow: false,
			selectList: ['文档', '图片']
			
		};
	},
	created() {},
	methods: {
		wclose() {
			this.isshow = false;
		},
		uploadOpen() {
			this.isshow = true;
		},
		wselect(index) {
			if (index == 0) {
				this.upLoadFile();
			} else {
				this.upLoadImg();
			}
			this.isshow = false;
		},
		wpriven(url) {
			let that = this;
			uni.showLoading({
				title: '下载中...',
				mask: true
			});
			that.udownload(url, 'temporary')
				.then(path => {
					uni.hideLoading();
					that.uopen(path);
				})
				.catch(() => {
					uni.hideLoading();
					uni.showToast({
						title: '下载失败',
						icon: 'none'
					});
				});
		},
		wdelete(index, list, num) {
			list.forEach((i, j) => {
				if (j == index) {
					if (num == 1) {
						this.$emit('updateFileList', [j,i]); //返回被删除的文件
					} else {
						this.$emit('updateImgList', [j,i]); //返回被删除的图片
					}
				}
			});
		},
		// 下载临时储存 temporary 临时 local 永久
		udownload(url, type = 'temporary') {
			let that = this;
			return new Promise((resolve, reject) => {
				uni.downloadFile({
					url,
					success: ({ statusCode, tempFilePath }) => {
						if (statusCode === 200) {
							if (type == 'local') {
								uni.saveFile({
									tempFilePath,
									success: ({ savedFilePath }) => that.onCommit(resolve(savedFilePath)),
									fail: () => that.errorHandler('下载失败', reject)
								});
							} else {
								that.onCommit(resolve(tempFilePath));
							}
						}
					},
					fail: () => that.errorHandler('下载失败', reject)
				});
			});
		},
		onCommit(resolve) {
			return resolve;
		},
		errorHandler(errText, reject) {
			uni.showToast({
				title: errText,
				icon: 'none'
			});
			return reject(errText);
		},
		// 打开文件
		uopen(filePath) {
			let system = uni.getSystemInfoSync().platform;
			if (system == 'ios') {
				filePath = encodeURI(filePath);
			}
			uni.openDocument({
				showMenu: true,
				filePath,
				success: res => {
					console.log('打开文档成功');
				},
				fail: res1 => {
					uni.getImageInfo({
						src: filePath,
						success: imgInfo => {
							uni.previewImage({
								current: filePath,
								urls: [filePath]
							});
						},
						fail: err => {
							uni.showToast({
								title: '不支持该格式',
								icon: 'none'
							});
							return;
						}
					});
				}
			});
		},
		// 文件上传
		async upLoadFile() {
			let that = this;
			
			uni.chooseMessageFile({
				type: 'file',
				success: function(source) {
					if (source.tempFiles[0].size < 1024 * 1024 * 5) {
						WUpload(
							that.requestUrl,
							that.uploadName,
							that.token,
							{
								// token: uni.getStorageSync('token'),
								// 看项目接口要求的格式修改关键字
								upload_type: that.fileType
							},
							source
						)
							.then(res2 => {
								//console.log("+++++++++")
								//console.log(res2)
								if (res2.success) {
									let Res2 = res2;
									Res2.name = source.tempFiles[0].name;
									//that.$data.fileList=Res2
									
									
									that.$emit('fileSuccess', Res2); //返回上传成功的数据
									uni.showToast({
										title: '上传成功'
									});
								} else {
									uni.showToast({
										title: '上传失败',
										icon: 'none'
									});
								}
							})
							.catch(catchRes => {
								console.log(catchRes);
								uni.showToast({
									title: '上传失败',
									icon: 'none'
								});
							});
					} else {
						uni.showToast({
							title: '文件过大，无法上传',
							icon: 'none'
						});
					}
				}
			});
			
		},
		// 图片上传
		upLoadImg(num) {
			let that = this;
			uni.chooseImage({
				count: 1, // 默认9
				sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
				sourceType: ['camera', 'album'], // 可以指定来源是相册还是相机，默认二者都有
				success: function(source) {
					if (source.tempFiles[0].size < 1024 * 1024 * 2) {
						uni.getImageInfo({
							src: source.tempFilePaths[0],
							success(res) {
								WUpload(
									that.requestUrl,
									that.uploadName,
									that.token,
									{
										// token: uni.getStorageSync('token'),
										// 根据接口要求修改对应的格式关键字
										upload_type: that.imgType
									},
									source
								)
									.then(res1 => {
										if (res1.success) {
											let Res = res1;
											Res.name = source.tempFilePaths[0];
											
											that.$emit('imgSuccess', Res); //返回上传成功的数据
											
											uni.showToast({
												title: '上传成功'
											});
										} else {
											uni.showToast({
												title: '上传失败',
												icon: 'none'
											});
										}
									})
									.catch(catchRes => {
										console.log(catchRes);
										uni.showToast({
											title: '上传失败',
											icon: 'none'
										});
									});
							},
							fail(error) {
								console.log(error);
							}
						});
					} else {
						uni.showToast({
							title: '图片过大，无法上传',
							icon: 'none'
						});
					}
				}
			});
		}
	}
};
</script>
<style scoped>
.w-drawer {
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
}

.w-setbox {
	box-sizing: border-box;
	position: fixed;
	z-index: 1000;
	left: 0px;
	right: 0px;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.7);
	box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.12);
	-webkit-transition: all 0.2 ease;
	transition: all 0.2 ease;
	bottom: -100%;
	/* -webkit-transform: scale(1);
	transform: scale(1); */
}

.wShow {
	box-sizing: border-box;
	bottom: 0;
	/* transform: scale(0); */
}

.w-header {
	box-sizing: border-box;
	width: 100%;
	background: #ffffff;
	line-height: 40px;
	position: absolute;

	bottom: 0;
	border-top-left-radius: 20px;
	border-top-right-radius: 20px;
	-webkit-transition: all 0.4 ease;
	transition: all 0.4 ease;
	/* border-bottom: 10rpx solid #ffffff; */
}

.w-line {
	width: 100%;
	background-color: #f7f8fa;
	height: 8px;
}

.w-item {
	box-sizing: border-box;
	height: 100rpx;
	line-height: 100rpx;
	width: 100%;
	text-align: center;
}

.w-item1:first-child {
	border-bottom: 1px solid #ebedf0;
}

.fileBox {
	box-sizing: border-box;
	margin: 20rpx;
}

.filePath {
	box-sizing: border-box;
	width: 100%;
	/* padding: 10rpx 0; */
	display: flex;
	/* flex-direction: column; */
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid #c0c0c0;
}

.text1 {
	flex: 1;
	/* width: 100%; */
	/* margin: 10rpx 0 20rpx; */
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
	padding-left: 10rpx;
	/* text-align: center; */
	vertical-align: middle;
}

.w-btn1 {
	padding: 10rpx;
	padding-right: 20rpx;
	/* color: #f56c6c; */
	font-size: 38rpx;
}

.w-edit {
	color: #cccccc;
	/* width: 100%; */
	display: flex;
	justify-content: flex-end;
}

.imgList {
	display: flex;
	justify-content: flex-start;
	flex-wrap: wrap;
	padding: 0 10rpx;
}

.imgItem {
	margin: 20rpx 10rpx;
	position: relative;
	width: 160rpx;
	height: 160rpx;
	border-radius: 5px;
}

.cancel {
	position: absolute;
	height: 35rpx;
	width: 35rpx;
	line-height: 28rpx;
	font-size: 30rpx;
	text-align: center;
	vertical-align: middle;
	right: 0px;
	top: 0px;
	background-color: #f56c6c;
	color: #ffffff;
	z-index: 999;
	border-radius: 0 5px 0 0;
}

.w-img {
	border-radius: 5px;
	width: 160rpx;
	height: 160rpx;
}

.addItem {
	margin: 20rpx 10rpx;
	width: 160rpx;
	height: 160rpx;
	border: 1px solid #cccccc;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 50rpx;
	color: #999;
	border-radius: 5px;
}
</style>
