import axios from "@/utils/Requset";
export const DelPay = (params) => {
	return axios.request({
		url: 'cost/delCostData',
		method: 'get',
		params,

	})
}
export const EditUserPay = (data) => {
	return axios.request({
		url: 'cost/updateCostData',
		method: 'post',
		data,

	})
}
export const GetCostById = (params) => {
	return axios.request({
		url: 'cost/getCostDetail',
		method: 'get',
		params,

	})
}