import { combineReducers } from 'redux'
import currentUser from './currentUser'
import error from './error'
import users from './users'


export const rootReducer = combineReducers({
	currentUser,
	users,
	error,
})
