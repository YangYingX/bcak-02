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
export const AddCost = (data) => {
	return axios.request({
		url: 'cost/addCostData',
		method: 'post',
		data,

	})
}
export const GetPayMsg = (params) => {
	return axios.request({
		url: 'cost/getPayMessage',
		method: 'get',
		params,

	})
}
export const DelPayMsg = (params) => {
	return axios.request({
		url: 'cost/delCostData',
		method: 'get',
		params,

	})
}
export const GetCostMsg = (params) => {
	return axios.request({
		url: 'cost/getCostDetail',
		method: 'get',
		params,

	})
}