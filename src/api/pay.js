import axios from "@/utils/Requset";
export const DelPay = (params) => {
	return axios.request({
		url: 'cost/delCostData',
		method: 'get',
		params,

	})
}