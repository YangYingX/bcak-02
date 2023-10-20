import axios from "@/utils/Requset";
export const GetUserByToken = (params) => {
	return axios.request({
		url: 'users/getUserByToken',
		method: 'get',
		params,

	})
}
export const GetUserById = (data) => {
	return axios.request({
		url: 'users/getMyId',
		method: 'post',
		data,

	})
}