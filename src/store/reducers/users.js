import { ADD_USER, FETCH_USERS, REMOVE_USER } from '../actions/action-types'

export default (state = [], action) => {
	switch (action.type) {
		case FETCH_USERS:
			return [...action.payload]
		case ADD_USER:
			return [...state, action.payload]
		case REMOVE_USER:
			return [...state.filter(user => user.objectId !== action.payload)]
		default:
			return state
	}
}
