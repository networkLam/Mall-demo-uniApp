<template>
	<view class="wrapper">
		<view class="content" v-for="(item,index) in cars" :key="index" v-show="!flag">
		 <view class="checkboxLocation">
		 	<checkbox-group  @change="check($event,item.id)">
		 		<label>
		 			<checkbox value="true" color="#FFCC33" style="transform:scale(0.7)" class="round cheboxStyle" :checked="item.check"/> <!-- 此处有bug -->
		 		</label>
		 	</checkbox-group>
		 </view>
		 <view class="describe">
			 <view class="imgwidth">
			 	 <image :src="item.picture" mode="" style="width: 180rpx;height: 180rpx;"></image>
			 </view>
			 <view class="textWidth">
				 <view class="productName">
				 	<text>{{item.name}}</text>
				 </view>
				 <view class="productPrice">
				 <text>￥{{item.nowprice}}</text><text><text style="color: black;font-size: 26rpx;">数量</text>x{{item.count}}</text>
				 </view>
			 </view>
		 </view>
		</view>
		<view class="carsclear" v-show="flag">
			<text>购物车空空如也φ(*￣0￣)</text>
		</view>
		<view class="car" v-show="!flag">
			<view class="checkall">
			<checkbox-group @change="allCheck">
				<label>
					<checkbox value="true" color="#FFCC33" style="transform:scale(0.7)" class="round cheboxStyle" :checked="allCheckflag" /> <text>全选</text>
				</label>
			</checkbox-group>
			</view>
			<view class="submit">		
				<text>合计:</text><text>￥</text><text>{{totalPrice}}</text> <button class="mini-btn" type="default" size="mini" @click="submitUp">提交</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {myRequest} from '../../tools/tools.js'
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				shoppingcarsInfo:[],
				flag:true,
				ter:null,
				changflag:false,
				allCheckflag:false,
				totalPrice:0
			}
		},
		methods: {
			// 请求ID的商品信息
			async getCars(){
				 // const temp_arr = []
				 // const test = JSON.stringify(this.$store.state.cars);
				 // const res = await myRequest({url:"/api/getproductinfo",data:{idobj:test}})
				 // this.shoppingcarsInfo = res.data.resultData;
				 // // 方式一：在这里添加check
				 // console.log(this.shoppingcarsInfo)
				 	 
				 if(this.$store.state.cars.length != 0){
					 this.flag =false;
				 }
			},
			// 勾选商品
			async check(e,ID){
				// 当勾选商品的时候再统计价格
				this.$store.dispatch("productCheck",ID)
				// console.log(this.$store.state.cars)
			    
			},
			allCheck(e){
				// console.log(e.detail.value[0] == 'true')
				// console.log(e)
				if(e.detail.value[0]=='true'){
					this.$store.dispatch("allCheck")
					this.changflag = true;
				}else{
					this.$store.dispatch("cancelAllCheck");
					this.changflag = false;
				}
				console.log(this.changflag)
			},
		   submitUp(){
			  alert(this.totalPrice) 
		   }
			
		},
		onLoad() {
			
		},
		onShow(){
			this.getCars()
			// console.log('显示了')
		},
		onHide(){
			// console.log('隐藏了')
		},
		computed:{
			...mapState(['cars'])
		},
		watch:{
			cars:{
				async handler(newVal){
					let total = 0;
					for(let i = 0 ;i <this.cars.length;i++){
						if(this.cars[i].check == true){
							total ++;
						}
					}
					if(total != 0 && total == this.cars.length){
						this.allCheckflag = true;
						this.changflag = true;
						
					}else{
						this.allCheckflag = false;
					}
					const productOBJ = JSON.stringify(this.$store.state.cars)
					const res = await myRequest({url:"/api/getprice",data:{productOBJ} });
					this.totalPrice = res.data.totalPrice //totalPrice总价
				},
				deep:true, //深度监视
			}
		}
	}
</script>

<style lang="less">
	.wrapper{
		// background-color: #f3f3f3;
		width: 100%;
	}
	.content{
		background-color: white;
		margin: 12rpx 0rpx 10rpx 0rpx;
		display: flex;
		width: 100%;
		padding-bottom: 96rpx;
		.checkboxLocation{
			display: flex;
			align-items: center;
			width: 10%;
		}
		.describe{
			display: flex;
			align-items: center;
			width: 90%;
			.imgwidth{
				width: 30%;
			}
			.textWidth{
				width: 70%;
				.productName{
					width: 100%;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					margin-left: 12rpx;
					margin-right: 12rpx;
					font-size: 32rpx;
				}
				.productPrice{
					width: 100%;
					font-size: 28rpx;
					display: flex;
					justify-content: space-between;
					text:nth-child(1){
						margin-left: 40rpx;
						margin-top: 40rpx;
						color: black;
						font-size: 26rpx;
					}
					text:nth-child(2){
						color: orange;
						font-size: 36rpx;
						margin-right: 22rpx;
						// color: black;
						margin-top: 28rpx;
					}
				}
			}
			
		}
	}
	.carsclear{
		text-align: center;
		font-size: 36rpx;
		color: orange;
		line-height: 223rpx;
	}
	.car{
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		height: 90rpx;
		background-color: #f3f3f3;
		position: fixed;
		bottom: 100rpx;
		left: 0;
		.checkall{
			text{
				font-size: 26rpx;
				color: black;
			}
			.cheboxStyle{
				margin-left: 22rpx;
				border-radius: 24px;
			}
		}
		.submit{
			display: flex;
			justify-content: space-between;
			align-items: center;
			text:nth-child(1){
				font-size:26rpx ;
			}
			text:nth-child(2){
				color: orange;
				font-size: 32rpx;
			}
			text:nth-child(3){
				color: orange;
				font-size: 36rpx;
				margin-right: 22rpx;
			}
			button{
				border-radius: 36rpx;
				background-color: orange;
				color: white;
				margin-right: 22rpx;
			}
		}
	}
	
</style>
