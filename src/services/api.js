import axios from 'axios'

const BACKENDLESS_API =
	'https://api.backendless.com/525C6ECF-BE35-D74F-FFC7-777E0FA29F00/3777A415-DFD8-4240-B51A-DCE496757AB7/data'
export const RESREQ_API = 'https://reqres.in/api'
export const backendlessUserApi = `${BACKENDLESS_API}/cyberhat_users`
export const backendlessConfigApi = `${BACKENDLESS_API}/cyberhat_config/7C908D2B-DA78-4C9B-8BFF-36647A42E86D`

/**[Api call handler]
 * @param {string} method HTTP METHOD: GET, POST, PUT, DELETE
 * @param {string} path URL to resource
 * @param {Object} data Data sent to resource
 * @returns {Promise}  so we can chain then/catch or asymc await
 */

export function apiCall(method, path, data) {
	return new Promise((resolve, reject) => {
		return axios[method](path, data)
			.then(res => resolve(res.data))
			.catch(err => {
				reject(
					err?.response?.data?.message || err?.response?.data?.error || 'Something went wrong. Please try again later'
				)
			})
	})
}
