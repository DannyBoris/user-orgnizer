import { IconButton, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import Loader from 'react-loader-spinner'
import theme from '../../../theme'
import UserTimelines from './UserTimelines'
import ReactPaginate from 'react-paginate'
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons'
const useStyles = makeStyles(theme => ({
	root: {
		[theme.breakpoints.down('sm')]: {
			flexDirection: 'column',
		},
		display: 'flex',
		justifyContent: 'center',
		flexWrap: 'wrap',
		alignItems: 'center',
		'& > h1': {
			flex: '100%',
			[theme.breakpoints.down('sm')]: {
				marginTop: theme.spacing(10.4),
				fontSize: '1.6rem',
				transition: '.2s ease',
			},
			marginTop: theme.spacing(4.4),
		},
	},
	paginationContainer: {
		flex: '100%',
		display: 'flex',
		justifyContent: 'center',
	},
	pageLink: {
		padding: theme.spacing(2),
		margin: theme.spacing(0, 0.5),
		borderRadius: '100%',
		fontSize: '1.2rem',
		fontWeight: 700,
		cursor: 'pointer',
	},
	activePage: {
		color: theme.palette.secondary.main,
	},
	listPlaceholder: {
		width: 277,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: 367,
		margin: theme.spacing(6, 3.25),
	},
	preLink: {
		opacity: ({ currentPage }) => currentPage === 0 && 0,
		transition: '.2s ease-in',
	},
	nextLink: {
		opacity: ({ pageCount, currentPage }) => pageCount - 1 === currentPage && 0,
		transition: '.2s ease-in',
	},
	emptyContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
}))
const UserList = ({
	users,
	handleDelete,
	currentUser,
	loading,
	handlePageChange,
	pageCount,
	currentPage,
	term,
	renderEmpty = false,
}) => {
	const classes = useStyles({ currentPage, pageCount })

	return (
		<section className={classes.root}>
			<Typography variant="h1">Organization Users</Typography>

			{loading ? (
				<Loader
					className={classes.listPlaceholder}
					type="Oval"
					color={theme.palette.secondary.main}
					height={100}
					width={'100'}
					timeout={13000} //3 secs
				/>
			) : !renderEmpty ? (
				term && users.length === 0 ? (
					<div className={classes.listPlaceholder}>
						<Typography variant="h2">No results for keyword "{term}"</Typography>
					</div>
				) : (
					<UserTimelines currentUser={currentUser} handleDelete={handleDelete} users={users} />
				)
			) : (
				<div className={`${classes.listPlaceholder} ${classes.emptyContainer}`}>
					<Typography style={{ borderBottom: '3px solid' }} variant="h2">
						BE THE FIRST TO ADD A USER!
					</Typography>
				</div>
			)}

			<ReactPaginate
				pageCount={pageCount}
				forcePage={currentPage}
				pageRangeDisplayed={3}
				marginPagesDisplayed={10}
				previousClassName={classes.preLink}
				nextClassName={classes.nextLink}
				nextLabel={
					<IconButton style={{ padding: 0, color: 'white' }}>
						<ArrowForwardIos fontSize="small" />
					</IconButton>
				}
				previousLabel={
					<IconButton style={{ padding: 0, color: 'white' }}>
						<ArrowBackIos fontSize="small" />
					</IconButton>
				}
				containerClassName={classes.paginationContainer}
				pageLinkClassName={classes.pageLink}
				activeLinkClassName={classes.activePage}
				onPageChange={handlePageChange}
			/>
		</section>
	)
}

export default UserList
