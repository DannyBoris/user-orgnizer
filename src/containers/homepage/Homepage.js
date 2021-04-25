import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addUser, getUsers, removeUser } from '../../store/actions/users'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import UserList from './components/UserList'
import SearchSection from './components/SearchSection'
import AddButton from './components/AddButton'
import { logout } from '../../store/actions/auth'
import { apiCall, backendlessConfigApi } from '../../services/api'
import { addError } from '../../store/actions/error'
import AddUserForm from './containers/AddUserForm'
import { useSnackbar } from 'notistack'

const Homepage = () => {
	const { enqueueSnackbar } = useSnackbar()
	const [term, setTerm] = useState('')
	const [loading, setLoading] = useState(true)
	const [roles, setRoles] = useState([])
	const [pageConfig, setPageConfig] = useState({
		current: 0,
		count: 1,
		usersPerPage: 3,
	})
	const [openAddDialog, setOpenAddDialog] = useState(false)
	//mobile view only
	const [sidebarOpen, setSidebarOpen] = useState(false)

	const [usersForRendering, setUsersForRendering] = useState([]) // for search & pagination

	const dispatch = useDispatch()
	const { users, currentUser, error } = useSelector(state => state)

	const handleLogout = () => {
		dispatch(logout())
	}

	const handleDelete = id => {
		dispatch(removeUser(id))
		enqueueSnackbar('User removed succesfully', {
			variant: 'success',
			anchorOrigin: { vertical: 'top', horizontal: 'center' },
		})
	}

	const handleAdd = data => {
		dispatch(addUser(data))
		enqueueSnackbar('User added succesfully', {
			variant: 'success',
			anchorOrigin: { vertical: 'top', horizontal: 'center' },
		})
	}

	const getUsersPerPage = nextPage => {
		const startIndex = nextPage * pageConfig.usersPerPage
		const endIndex = startIndex + pageConfig.usersPerPage
		console.log(startIndex, endIndex)
		let pagedUsers = users.slice(startIndex, endIndex)
		return pagedUsers
	}

	const handlePageChange = ({ selected }) => {
		setLoading(true)
		setTerm('')
		setPageConfig({ ...pageConfig, current: selected })
		let pagedUsers = getUsersPerPage(selected)
		//not function purpose. Just for the loading effect
		setTimeout(() => {
			setLoading(false)
			setUsersForRendering(pagedUsers)
		}, 500)
	}

	useEffect(() => {
		//init
		dispatch(getUsers())
		apiCall('get', backendlessConfigApi)
			.then(res => {
				setRoles(JSON.parse(res.Enums).role)
			})
			.catch(err => dispatch(addError(err)))
		// eslint-disable-next-line
	}, [])

	useEffect(() => {
		let filteredUsers = users.filter(
			user => user.FirstName.toLowerCase().includes(term) || user.LastName.includes(term)
		)
		setUsersForRendering(filteredUsers)
		// eslint-disable-next-line
	}, [term])

	useEffect(() => {
		const pageCount = Math.ceil(users.length / pageConfig.usersPerPage) || 1 // page count should not be 0
		// current page should update when last user on page was deleted
		const currentPage = pageConfig.current >= pageCount ? pageCount - 1 : pageConfig.current
		setPageConfig({ ...pageConfig, count: pageCount, current: currentPage })
		let pagedUsers = getUsersPerPage(currentPage)
		setUsersForRendering(pagedUsers)
		setLoading(false)
		// eslint-disable-next-line
	}, [users])

	const closeErrorHandler = localErrorHandler => {
		// for both redux error and local errors
		return error ? () => dispatch(addError('')) : () => localErrorHandler()
	}

	return (
		<div>
			<Header />
			<Sidebar open={sidebarOpen} setOpen={setSidebarOpen} handleLogout={handleLogout} />
			<SearchSection setTerm={setTerm} term={term} />
			<AddButton setOpen={setOpenAddDialog} />
			<UserList
				term={term}
				renderEmpty={users.length === 0}
				pageCount={pageConfig.count}
				currentPage={pageConfig.current}
				handlePageChange={handlePageChange}
				loading={loading}
				currentUser={currentUser}
				handleDelete={handleDelete}
				handleAdd={handleAdd}
				users={usersForRendering}
			/>
			<AddUserForm
				storeError={error}
				closeErrorHandler={closeErrorHandler}
				setOpen={setOpenAddDialog}
				open={openAddDialog}
				roles={roles}
			/>
		</div>
	)
}

export default Homepage
