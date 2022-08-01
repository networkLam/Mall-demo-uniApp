<template>
	<!-- 这是miniIcon的组件 -->
	<view class="warpper">
		<view class="mini" v-for="(item,index) in listData" :key="index" @click="gotoDetail(item.id)">
			<view class="icon">
			<image :src="item.iconlocation"  class="mini-icon"></image>
			</view>
			<view class="text"><text>{{item.title}}</text></view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"miniIcon",
		props:{
			listData:{
				type:Array,
				default:[]
			}
		},
		data(){
			return{
				
			}
		},
		methods:{
			gotoDetail(id){
				console.log(id)
			}
		},
		
	}
</script>

<style scoped lang="less">
	.warpper{
		background-color: #f6f6f6;
		display: flex;
		flex-wrap: wrap;
		.mini{
			width: 20%;
			margin: 10rpx 0;
			// height: 100rpx;
			// margin: 0 aotu;
			.icon{
				display: flex;
				justify-content: center;
			}
			.mini-icon{
				width: 80rpx;
				height:  80rpx;
				margin: 0 aotu;
			}
			.text{
					text-align: center;
					font-size: 26rpx;
					color: #979797;
				}
		}
	}
	
</style>