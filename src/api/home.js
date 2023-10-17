import axios from "@/utils/Requset";
export const GetHouseUtil = (params) => {
	return axios.request({
		url: 'house/gethouseList',
		method: 'get',
		params,

	})
}
export const SearchHouseUtil = (params) => {
	return axios.request({
		url: 'house/searchList',
		method: 'get',
		params,

	})
}
export const PostHouseUtil = (data) => {
	return axios.request({
		url: 'house/addunitList',
		method: 'post',
		data,

	})
}