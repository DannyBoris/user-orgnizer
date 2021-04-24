import { apiCall, backendlessUserApi } from '../../services/api'
import { FETCH_USERS, ADD_USER, REMOVE_USER } from './action-types'
import { addError } from './error'

export const fetchUsers = users => ({ type: FETCH_USERS, payload: users })
export const remove = id => ({ type: REMOVE_USER, payload: id })
export const add = user => ({ type: ADD_USER, payload: user })

export const getUsers = (offset = 0) => dispatch => {
	apiCall('get', backendlessUserApi)
		.then(res => dispatch(fetchUsers(res)))
		.catch(err => dispatch(addError(err)))
}

export const removeUser = id => dispatch => {
	apiCall('delete', `${backendlessUserApi}/${id}`)
		.then(res => dispatch(remove(id)))
		.catch(err => dispatch(addError(err)))
}

export const addUser = user => dispatch => {
	apiCall('post', backendlessUserApi, user)
		.then(res => dispatch(add(res)))
		.catch(err => dispatch(addError(err)))
}
