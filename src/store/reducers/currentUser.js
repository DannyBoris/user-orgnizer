import { SET_CURRENT_USER } from '../actions/action-types'

const INITIAL_STATE = {
	user: {},
	isAuthenticated: false,
}

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SET_CURRENT_USER:
			return {
				user: action.payload,
				isAuthenticated: !!Object.keys(action.payload).length,
			}

		default:
			return state
	}
}
