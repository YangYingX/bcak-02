import axios from "@/utils/Requset";
export const GetPostMsg = (params) => {
	return axios.request({
		url: 'poster/getPosterData',
		method: 'get',
		params,

	})
}
export const AddPostMsg = (data) => {
	return axios.request({
		url: 'poster/addPoster',
		method: 'post',
		data,

	})
}

export const DelPostMsg = (params) => {
	return axios.request({
		url: 'poster/delPoster',
		method: 'get',
		params,

	})
}
export const GetSmartData = (params) => {
	return axios.request({
		url: 'poster/getRepairData',
		method: 'get',
		params,

	})
}
export const DelRepairData = (params) => {
	return axios.request({
		url: 'poster/delRepair',
		method: 'get',
		params,

	})
}
export const EditRepairData = (data) => {
	return axios.request({
		url: 'poster/updateSmartRepair',
		method: 'post',
		data,

	})
}
export const GetFeedBack = (params) => {
	return axios.request({
		url: 'poster/getFeedBack',
		method: 'get',
		params,

	})
}