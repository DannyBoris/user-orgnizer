import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router'
import { setUser } from '../store/actions/auth'
import Homepage from './homepage/Homepage'
import Signup from './Signup'
import '../styles.css'
const Main = ({ history }) => {
	const { currentUser } = useSelector(state => state)
	const dispatch = useDispatch()

	useEffect(() => {
		let token = sessionStorage.getItem('TOKEN')
		if (token) dispatch(setUser(token))
	}, [])

	useEffect(() => {
		if (currentUser.isAuthenticated) history.push('/home')
		else history.push('/')
	}, [currentUser.isAuthenticated])

	const routes = [
		{ path: '/', Component: Signup },
		{ path: '/home', Component: Homepage },
	]
	return (
		<Switch>
			{routes.map(({ path, Component }) => (
				<Route exact path={path}>
					{({ match }) => <Component />}
				</Route>
			))}
		</Switch>
	)
}

export default withRouter(Main)
