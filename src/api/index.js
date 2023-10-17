import axios from "@/utils/Requset";
export const Getposter = (params) => {
	return axios.request({
		url: 'poster/getPosterData',
		method: 'get',
		params
	})
}
export const GetPayMessage = (params) => {
	return axios.request({
		url: 'cost/getPayMessage',
		method: 'get',
		params
	})
}
export const GetUsersdata = (params) => {
	return axios.request({
		url: 'users/getUsersData',
		method: 'get',
		params
	})
}
export const GetParkOrder = (params) => {
	return axios.request({
		url: 'parking/getParkOrder',
		method: 'get',
		params
	})
}
export const GetFeedBack = (params) => {
	return axios.request({
		url: 'poster/getFeedBack',
		method: 'get',
		params
	})
}
export const GetParkData = (params) => {
	return axios.request({
		url: 'parking/getParkData',
		method: 'get',
		params
	})
}
export const GetCostData = (params) => {
	return axios.request({
		url: 'cost/getCostData',
		method: 'get',
		params
	})
}
export const GetLoginMonth = () => {
	return axios.request({
		url: 'users/getLoginMonth',
		method: 'get',

	})
}
export const GetRepairData = (params) => {
	return axios.request({
		url: 'poster/getRepairData',
		method: 'get',
		params
	})
}