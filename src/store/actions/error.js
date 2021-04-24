import { SET_ERROR } from './action-types'

export const addError = err => {
	return { type: SET_ERROR, payload: err }
}
