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