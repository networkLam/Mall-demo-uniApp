const BASE_URL = 'http://localhost:3000'
export async function myRequest(options){
	return new Promise((resolve,reject)=>{
		uni.request({
			url:BASE_URL+options.url,
			method:options.method || "GET",
			data : options.data,
			success:(res)=>{
				resolve(res)
			},
			fail:(err)=>{
				uni.showToast({
					icon:"error",
					title:"网络请求失败"
				})
				reject(err)
			}
			
		})
	})
	
}