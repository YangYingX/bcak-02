import axios from "@/utils/Requset";
export const Postuser = (data) => {
	return axios.request({
		url: '/users/login',
		method: 'post',
		data,

	})
}