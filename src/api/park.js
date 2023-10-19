import axios from "@/utils/Requset";
export const AddParkData = (data) => {
	return axios.request({
		url: 'parking/addParkData',
		method: 'post',
		data,

	})
}
export const EditParkData = (data) => {
	return axios.request({
		url: 'parking/editParkData',
		method: 'post',
		data,

	})
}
export const UserParkData = (data) => {
	return axios.request({
		url: 'users/updateParkStatus',
		method: 'post',
		data,

	})
}
export const DelParkData = (params) => {
	return axios.request({
		url: 'parking/delParkData',
		method: 'get',
		params,

	})
}