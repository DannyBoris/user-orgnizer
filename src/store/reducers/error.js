import { SET_ERROR } from '../actions/action-types'

export default (state = '', action) => {
	switch (action.type) {
		case SET_ERROR:
			return action.payload
		default:
			return state
	}
}
