import { composeWithDevTools } from 'redux-devtools-extension'
import { rootReducer } from './reducers'
import thunk from 'redux-thunk'
import { applyMiddleware, createStore } from 'redux'

export function configureStore() {
	return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
}
