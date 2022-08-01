<template>
	<view class="content">
		<!-- <indexHead class="headStyle"></indexHead> -->
		<view class="swiperBack">
			<swiper indicator-dots class="swiperStyle" :autoplay="true" circular>
				<swiper-item v-for="(item,index) in swiperData" :key="index" style="border-radius: 16px;">
					<view class="swiper-item"><image :src="item.iconlocation" style="width: 100%;height: 300rpx;text-align: center;border-radius: 16px;"></image></view>
				</swiper-item>
			</swiper>	
		</view>
		<miniIcon :listData="iconData"></miniIcon>
		<view class="">
			<contentRegion :miniSwiper="miniSwiper" :productlist="listData"></contentRegion>
		</view>
	</view>
</template>

<script>
	import {myRequest} from '../../tools/tools.js'
	import indexHead from '../../coponents/indexHead/indexHead.vue'
	import miniIcon from '../../coponents/miniIcon/miniIcon.vue'
	import contentRegion from '../../coponents/contentRegion/contentRegion.vue'
	export default { 
		data() {
			return {
				title: 'Hello',
				swiperData:[],
				iconData:[],
				miniSwiper:[],
				listData:[],
				page:0
			}
		},
		onLoad() {
			this.MyRefresh();
			
		},
		methods: {
			// 请求轮播图数据
			async requestData(){
			 const res = await myRequest({url:"/api/lunbo"});
			 this.swiperData = res.data.data;
			
			},
			// 请求miniIcon数据
			async requsetIcon(){
				const res = await myRequest({url:'/api/icon'});
				this.iconData = res.data.data;
				// console.log(this.iconData)
			},
			// 请求miniSwiper数据
			async requestMiniSwiper(){
				const res = await myRequest({url:"/api/miniswiper"})
				this.miniSwiper = res.data.data;
				
			},
			// 请求商品列表的数据
			async requestProductList(){
				const res = await myRequest({url:"/api/productList/"+this.page})
				// 使用es6扩展运算符合并数组
				this.listData = [...this.listData,...res.data.data]
				// console.log(this.listData)
			},
			MyRefresh(){
				this.requestData();
				this.requsetIcon();
				this.requestMiniSwiper();
				this.requestProductList();
			}
		},
		components:{
			indexHead,
			miniIcon,
			contentRegion
		},
		onPullDownRefresh(){
			this.swiperData = [];
			this.iconData = [];
			this.miniSwiper = [];
			this.listData = [];
			this.page = 0;
			setTimeout(()=>{
				this.MyRefresh();
				uni.stopPullDownRefresh();
			},1500)
		},
		onReachBottom(){
			// console.log('触底了')
			this.page ++;
			this.requestProductList()
		}
	}
</script>

<style lang="less">
	.content{
		background-color: #f6f6f6;
	}
	.swiperStyle{
		margin: 20px 10px;
		width: 90%;
		position: absolute;
		text-align: center;
		border-radius: 16px;
	}
	.swiper-item{
		width: 100%;
	}
	.swiperBack{
		position: relative;
		display: flex;
		justify-content: center;
		background-color: #ffffff;
		width: 100%;
		height:395rpx ;
	}
	.headStyle{
		width: 100%;
		
	}
</style>
