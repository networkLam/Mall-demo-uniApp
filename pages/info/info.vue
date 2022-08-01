<template>
	<view class="wrapper">
		<view class="seting">
			<view class="seting_icon">
				<image src="../../static/icon/seting.png" mode=""></image>
			</view>
		</view>
		<view class="wrapper_login">
			<view class="login">
				<image src="../../static/icon/avatar.webp" mode=""></image>
			</view>
		</view>
		<view class="list">
			<ul>
				<li> <image src="../../static/icon/location.png" mode=""></image>收货地址</li>
				<li> <image src="../../static/icon/order.png" mode=""></image>订单详情</li>
				<li><image src="../../static/icon/history.png" mode=""></image>浏览记录</li>
				<li> <image src="../../static/icon/moreSetings.png" mode=""></image>更多设置</li>
			</ul>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="less">
.seting{
	margin-bottom: 22rpx;
	.seting_icon{
		display: flex;
		justify-content: flex-end;
		image{
			margin-top: 12rpx;
			margin-right: 12rpx;
			width: 50rpx;
			height: 50rpx;
		}
	}
}
.wrapper_login{
	display: flex;
	justify-content: center;
	align-items: center;
	.login{
		image{
			width: 90px;
			height: 90px;
			border-radius: 50%;
			background-color: pink;
		}
	}
}

.list{
	margin-top: 170rpx;
	ul{
		list-style: none;
		margin: 0;
		padding: 0;
		li{
			margin-top: 12rpx;
			padding-left: 16rpx;
			font-size: 36rpx;
			font-weight: 500;
			color: black;
			border-top: 1px solid rgba(0, 0, 0, 0.2);
			display: flex;
			align-items: center;
			image{
				width: 50rpx;
				height: 50rpx;
				margin-right: 12rpx;
			}
		}
	}
}
</style>
