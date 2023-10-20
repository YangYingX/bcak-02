import axios from "@/utils/Requset";
export const GetMenuData = (params) => {
	return axios.request({
		url: 'admin/getMenuData',
		method: 'get',
		params,

	})
}
export const GetLoginData = (params) => {
	return axios.request({
		url: 'users/getLoginData',
		method: 'get',
		params,

	})
}
export const DelLoginData = (params) => {
	return axios.request({
		url: 'users/delLoginData',
		method: 'get',
		params,

	})
} 