<template>
	<view class="wrapper">
		<view class="logo">
			
		</view>
		<view class="search">
			<view class="">
				<!-- 这里放图标 -->
			</view>
			<view class="falseInput">
				<!-- 这里放假的input框 -->
				<image src="../../static/icon/search.png" mode="" class="searchIcon"></image><text class="text">搜索</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"indexHead"
	}
</script>

<style scoped>
	.wrapper{
		display: flex;
		width: 100%;
		height: 90rpx;
		background-color: #c82519;
	}
	.logo{
		width: 80px;
		/* height: 80px; */
	}
	.search{
		display: flex;
		align-items: center;
	}
	.searchText{
		border: 1px solid red;
	}
	
	.falseInput{
		background-color: #fff;
		width: 420rpx;
		height: 60rpx;
		text-align: center;
		line-height: 60rpx;
		border-radius: 12px;
	}
	.text{
		color:#d6d6d6;
		text-align: center;
		font-size: 36rpx;
	}
	.searchIcon{
		margin-right: 10px;
		width: 36rpx;
		height: 36rpx;
	}
</style>