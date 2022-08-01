<template>
	<view class="wrapper">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular class="swiperWidth">
			<swiper-item v-for="(item,index) in miniSwiper" :key="index" @click="gotoDetail(item.code)">
				<view class="swiper-item"><image :src="item.iconlocation" class="image"></image></view>
			</swiper-item>
		</swiper>
		<view class="contetRight" v-for="(item,index) in productlist" :key="index" @click="gotoproduct(item.productid)">
			<view class="picture">
				<image :src="item.picture" mode="" ></image>
			</view>
			<view class="" >
				<view class="name"><text>{{item.name}}</text></view>
				<view class="price"><text>￥{{item.nowprice}}</text><text>销量{{item.salesvolume}}+</text></view>
				<view class="productdescribe">{{item.productdescribe}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"contentRegion",
		props:['miniSwiper','productlist'],
		data(){
			return{
				
			}
		},
		methods:{
			gotoDetail(id){
				console.log(id)
			},
			gotoproduct(id){
				// console.log(id)
				uni.navigateTo({
					url:"../../pages/productdetail/productdetail?id="+id,
					
				})
			}
		}
	}
</script>

<style lang="less">
	.wrapper{
		margin: 10px 10px 0px 10px;
		background-color:  #f6f6f6;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		.swiperWidth{
			width: 48%;
			height: 500rpx;
			
			.swiper-item{
				
			}
			.image{
				width: 100%;
				border-radius: 12px;
			}
		}
		.contetRight{
			width:48%;
			height: 600rpx;
			border-radius:12px;
			margin-top: 10rpx;
			margin-bottom: 10rpx;
			background-color: #fff;
			// border: 1px solid #000000;
			.name{
				padding: 2rpx 4rpx;
				width: 100%;
				 white-space: nowrap;
				    overflow: hidden;
					 text-overflow: ellipsis;
			}
			.productdescribe{
				// padding:4rpx 6rpx 0rpx 6rpx;
				width: 100%;
				font-size: 26rpx;
				 overflow: hidden;
				 // 超出的文字变成省略号
				  display: -webkit-box;
				 text-overflow: ellipsis;
				  -webkit-line-clamp: 2;
				  -webkit-box-orient: vertical;

			}
			.picture{
				image{
					width: 100%;
					height: 400rpx;
					border-radius:12px;
				}
			}
			.price{
				padding: 10rpx;
				text:nth-child(1){
						color: orange;
				}
				text:nth-child(2){
					display: inline-block;
					margin-left: 16rpx;
					color: red;
					font-size: 14rpx;
				}
				
			}
		}
	}
</style>