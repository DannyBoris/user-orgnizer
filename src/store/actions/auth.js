import { apiCall, RESREQ_API } from '../../services/api'
import { SET_CURRENT_USER } from './action-types'
import { addError } from './error'

export function setUser(token) {
	return {
		type: SET_CURRENT_USER,
		payload: token,
	}
}

export const onAuth = ({ email, password }) => dispatch => {
	apiCall('post', `${RESREQ_API}/login`, { email, password })
		.then(({ token }) => {
			sessionStorage.setItem('TOKEN', token)
			dispatch(setUser(token))
		})
		.catch(err => dispatch(addError(err)))
}

export const logout = () => dispatch => {
	sessionStorage.removeItem('TOKEN')
	dispatch(setUser({}))
}
