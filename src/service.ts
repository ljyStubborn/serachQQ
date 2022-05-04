import axios from "axios";
//get参数拼接
const getQueryStr = (url: string, query: any = {}) => {
	const queryStr = Object.keys(query)
		.reduce((ary: string[], key: string) => {
			if (query[key]) {
				// @ts-ignore
				ary.push(
					encodeURIComponent(key) + "=" + encodeURIComponent(query[key])
				);
			}
			return ary;
		}, [])
		.join("&");
	return (url += `?${queryStr}`);
};
/**
 * 函数防抖
 * @param {Function} func
 * @param {Number} wait
 * @param {Boolean} immediate
 * @return {Function}
 */
export const debounce = (func: any, wait: number, immediate?: boolean): any => {
	let result: any;
	let timeout: NodeJS.Timeout | null;

	const debounced = function (...args: any[]) {
		if (timeout) {
			clearTimeout(timeout);
		}
		if (immediate) {
			const callNow = !timeout;
			timeout = setTimeout(() => {
				timeout = null;
			}, wait);
			if (callNow) {
				// @ts-ignore
				result = func.apply(this, args);
			}
		} else {
			timeout = setTimeout(() => {
				// @ts-ignore
				result = func.apply(this, args);
				timeout = null;
			}, wait);
		}

		return result;
	};

	debounced.cancel = () => {
		if (timeout) {
			clearTimeout(timeout);
			timeout = null;
		}
	};

	return debounced;
};
//service 查询qq接口
export async function getQQList(params: any) {
	// 获取 qq列表
	return axios.get(
		getQueryStr("https://api.uomg.com/api/qq.info", params)
	);
}
