<template>
	<view class="wrapper">
		<view class="status_bar">
		            <!-- 这里是状态栏的空间（显示电池电量的地方） -->
		</view>
		<view class="content">
			<view class="contentchild">
				<image src="../../static/icon/break.png" mode="" @click="breakhanle"></image> 
				<text>{{title}}</text> 
				<!-- #ifdef H5 --> 
				<text class="share">分享</text>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<text></text>
				<!-- #endif -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"uni-custom-navBar",
		props:['title'],
		data(){
			return {
				brea : "<"
			}
		},
		methods:{
			breakhanle(){
				uni.navigateBack({
					delta:1,
					success:(res)=>{
						console.log(res)
					},
					fail:(err)=>{
						console.log(err)
					}
				})
			}
		}
	}
</script>

<style lang="less">
	.wrapper{
		width: 100%;
	}
	.status_bar{
		width: 100%;
		height: var(--status-bar-height);
	}
	.content{
		width: 100%;
		height: 80rpx;
		background-color:#f2f2f2;
		text:nth-child(1){
			margin-left: 20rpx;
			display: inline-block;
			color: black;
			font-size: 42rpx;
			font-weight: 700;
		}
		.contentchild{
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		image{
			margin-left: 12rpx;
			width: 50rpx;
			height: 50rpx;
		}
	}
	.share{
		margin-right: 22rpx;
		
	}
</style>