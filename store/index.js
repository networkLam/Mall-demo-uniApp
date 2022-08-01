import Vue from 'vue'
import Vuex from 'vuex'
import {myRequest} from "../tools/tools.js"
Vue.use(Vuex)
export default new Vuex.Store({
	state:{
		cars:[], //装载商品的ID
		PRICE : 0 //商品的合计价格
	},
	actions:{
		async addProduct(context,ID){
			const proInfo = {
				id:"", //商品ID
				name : "", //产品名称
				count:0, //产品数量
				check:false ,//在购物车中是否被勾选
				nowprice:0, //商品价格
				picture:"" ,//图片连接
			}
			if(context.state.cars.length == 0){
			 const res = await myRequest({url:"/api/productinfosingle",data:{id:ID}});
				proInfo.id=ID;
				proInfo.count = 1;
				proInfo.nowprice = res.data.data.nowprice;
				proInfo.picture = res.data.data.picture;
				proInfo.name = res.data.data.name;
				context.commit("ADDPRODUCT",proInfo)
			}
			else{
				const res = await myRequest({url:"/api/productinfosingle",data:{id:ID}});
				proInfo.id=ID;
				proInfo.count = 1;
				proInfo.nowprice = res.data.data.nowprice;
				proInfo.picture = res.data.data.picture;
				proInfo.name = res.data.data.name;
				let temp_count = 0;
				for(let i = 0 ; i < context.state.cars.length; i++){
					if(context.state.cars[i].id == ID){
						// console.log("ID相同")
						temp_count = context.state.cars[i].count + 1;
						context.commit("ADDPRODUCTMULTIPLE",{temp_count,i})
						return 0;
					}
				}
				// console.log("ID不同")
				context.commit("ADDPRODUCT",proInfo)
			}
		},
		// 勾选商品
		async productCheck(context,ID){
			let location = 0;
			for(let i = 0; i < context.state.cars.length;i++){
				if(context.state.cars[i].id == ID){
					 location = i;
					 // const tmep_obj ={id:ID,check :true,count:context.state.cars[i].count}
					 // const productOBJ = JSON.stringify(context.state.cars);
				  //    const res = await myRequest({url:"/api/getprice",data:{productOBJ}})
					 // console.log('勾选商品生效')
					 // console.log(res)
					 context.commit("PRODUCT_CHECK",location)
				}
			}
		},
		allCheck(context){ //全选
				context.commit("ALLCHECK")
		},
		cancelAllCheck(context){ //取消全选
			context.commit("CANCELALLCHECK")
		}
	},
	mutations:{
		// 新商品的添加接口
		ADDPRODUCT(state,data){
			state.cars.push(data);
			// console.log('ADDPRODUCT')
			// console.log(state)
		},
		// 同一商品添加多个的接口
		ADDPRODUCTMULTIPLE(state,options){
			state.cars[options.i].count = options.temp_count;
			// console.log('ADDPRODUCTMULTIPLE')
			// console.log(state)
		},
		// 修改商品的勾选状态
		PRODUCT_CHECK(state,index){
			state.cars[index].check = !state.cars[index].check;
		},
		ALLCHECK(state){ //勾选所有的商品
			state.cars.forEach((item)=>{
				item.check = true;
			})
		},
		CANCELALLCHECK(state){ //取消勾选所有的商品
			state.cars.forEach((item)=>{
				item.check = false;
			})
		}
	}
})