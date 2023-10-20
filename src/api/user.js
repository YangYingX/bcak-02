import axios from "@/utils/Requset";
export const GetUsersByTypePage = (params) => {
	return axios.request({
		url: 'users/getUsersByTypePage',
		method: 'get',
		params,

	})
}

export const GetUsersByTypeChar = (params) => {
	return axios.request({
		url: 'admin/getUserByTypeChar',
		method: 'get',
		params,

	})
}
export const Updata = (data) => {
	return axios.request({
		url: 'users/upUserData',
		method: 'post',
		data,

	})
}
export const DelUserdata = (params) => {
	return axios.request({
		url: 'users/delUserData',
		method: 'get',
		params,

	})
}
export const AddUserdata = (data) => {
	return axios.request({
		url: 'users/addUserData',
		method: 'post',
		data,

	})
}