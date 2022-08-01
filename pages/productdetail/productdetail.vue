<template>
	<view class="wrapper">
		<mybar title="详情"></mybar>
		<swiper 
		:indicator-dots="true" 
		:autoplay="true" 
		:interval="3000"
		:duration="1000" 
		 class="swipercontent" 
		 indicator-color="black" 
		 indicator-active-color="#FF6600" 
		 circular>
			<swiper-item v-for="(item,index) in list" :key="index" @click="touchicon(index)">
				<view class="swiper-item"><image :src="item.picture_net" aspectFit></image></view>
			</swiper-item>
		</swiper>
		<view class="content">
			<view class="">
				<view class="price">
				<text>￥{{productInfo.nowprice}}</text> <text>当季必备</text> 
				</view>
				<view class="zhehoujia">
				<text>价格</text> <text>￥{{productInfo.beforeprice}}</text> 
				</view>
			</view>
			<view class="productname">
				<text>{{productInfo.name}}</text>
			</view>
			
		</view>
		<view class="goods-carts">
			<uni-goods-nav :options="options" :fill="true" :buttonGroup="buttonGroup"  @click="onClick" @buttonClick="buttonClick"></uni-goods-nav>
		</view>
	</view>
</template>

<script>
	import {myRequest} from '../../tools/tools.js'
    import uniGoodsNav from '@/uni-goods-nav_1.2.1/components/uni-goods-nav/uni-goods-nav.vue'
	import mybar from '../../coponents/uni-custom-navBar/uni-custom-navBar.vue'
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				id:null,
				list:[],
				productInfo:{},
				options: [{
					icon: 'headphones',
					text: '客服'
				}, {
					icon: 'shop',
					text: '店铺',
					info: 2,
					infoBackgroundColor:'#007aff',
					infoColor:"red"
				}, {
					icon: 'cart',
					text: '购物车',
					info: 0
				}],
				buttonGroup: [{
				  text: '加入购物车',
				  backgroundColor: '#ff0000',
				  color: '#fff'
				},
				{
				  text: '立即购买',
				  backgroundColor: '#ffa200',
				  color: '#fff'
				}
				]
			}
		},
		methods: {
			async getProductDetail(){
				const res = await myRequest({url:`/api/productDetail?id=${this.id}`})
				this.list = res.data.data.data_icon;
				this.productInfo = res.data.data.data_text[0]
				// console.log(this.productInfo)
			},
			touchicon(index){ //图片预览
				console.log(index)
				const arr = [];
				this.list.forEach((item)=>{
					arr.push(item.picture_net)
				})
				uni.previewImage({
					current : index,
					urls:arr,
					loop:true,
					indicator:"number",
					success:(res)=>{
						console.log(res)
					},
					fail:(err)=>{
						console.log(err)
					}
				})
			},
			onClick (e) {
			uni.showToast({
			  title: `点击${e.content.text}`,
			  icon: 'none'
			})
		  },
		  buttonClick (e) {
			// console.log(e)
			if(e.index == 0){
				this.$store.dispatch("addProduct",this.id)
			}
			// 加入购物车右上角的图标的数字
			// this.options[2].info++
			console.log(this.$store.state.cars.length)
			
		  }
		},
		components:{
			// uniGoodsNav,
			mybar
		},
		watch:{
			cars:{
				handler(newVal){
					this.options[2].info = newVal.length 
				},
				deep:true, //深度监视
				immediate: true //提前执行
			}
		},
		computed:{
			...mapState(['cars'])
		},
		onLoad(options){
			console.log(options)
			this.id = options.id;
			this.getProductDetail()
		}
	}
</script>

<style lang="less">
	.wrapper{
		width: 100%;
		.swipercontent{
			width: 100%;
			height: 750rpx;
			overflow: hidden;
			.swiper-item{
				height: auto;
			}
			image{
				width: 100%;
				height:750rpx;
			}
		}
		
	}
	.price{
		color: orange;
		font-size: 42rpx;
		text:nth-child(2){
			margin-left: 22rpx;
			display: inline-block;
			font-size: 22rpx;
			color: #fff;
			background-color: orange;
			height: 32rpx;
			border-radius: 12rpx;
			padding: 0 12rpx;
		}
	}
	.zhehoujia{
		color: #808080;
		font-size: 22rpx;
		margin-left: 12rpx;
		text:nth-child(2){
			margin-left: 12rpx;
			text-decoration: line-through;
			
		}
	}
	.productname{
		font-size: 32rpx;
		font-weight: 700;
		padding: 2rpx 8rpx 2rpx 8rpx;
	}
	
	.goods-carts {
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			flex-direction: column;
			position: fixed;
			left: 0;
			right: 0;
			/* #ifdef H5 */
			left: var(--window-left);
			right: var(--window-right);
			/* #endif */
			bottom: 0;
		}
</style>
