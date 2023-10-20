import axios from "@/utils/Requset";
export const GetMenuData = (params) => {
	return axios.request({
		url: 'admin/getMenuData',
		method: 'get',
		params,

	})
} 