import React, { useEffect, useState } from 'react'
import { Container, IconButton, Input, makeStyles, Typography } from '@material-ui/core'
import { ReactComponent as UserCloudLogo } from '../assets/UserCloudLogo.svg'
import { ReactComponent as VisibilityOnIcon } from '../assets/VisibilityOnIcon.svg'
import { ReactComponent as VisibilityOffIcon } from '../assets/VisibilityOffIcon.svg'
import { ReactComponent as EmailIcon } from '../assets/EmailIcon.svg'
import { ReactComponent as PasswordIcon } from '../assets/PasswordIcon.svg'
import { useDispatch, useSelector } from 'react-redux'
import { onAuth } from '../store/actions/auth'
import Error from '../components/Error'
import { addError } from '../store/actions/error'

import FormButton from '../components/FormButton'
import ShinyBorderContainer from '../hoc/ShinyBorderContainer'
import CutBorderContainer from '../hoc/CutBorderContainer'
import WithLoading from '../hoc/withLoading'

const useStyles = makeStyles(theme => ({
	root: {
		'& .MuiButton': {
			'&:hover': {
				background: theme.palette.secondary.main,
			},
		},
		// fixes design bug of style wrapper on form
		'& > div': {
			//shiny wrapper
			height: '100%',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'space-evenly',
			'& > div': {
				//cut corners wrapper
				display: 'flex',
				height: '100%',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'space-evenly',
			},
		},

		width: 344,
		height: 496,
		background: theme.palette.primary.main,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-evenly',
		padding: theme.spacing(0, 2.5),
		position: 'absolute',
		left:'50%',
		top:'50%',
		transform:'translate(-50%,-50%)'
	},
	input: {
		margin: theme.spacing(2.5, 0),
		borderBottom: '1px solid white',
		color: 'white',
		'& > input::placeholder': {
			color: 'white',
			fontFamily: 'Roboto',
			fontWeight: 300,
		},
	},
	btn: {
		fontFamily: 'Roboto',
		width: '50%',
	},
	error: {
		color: 'red',
	},
	inputIcon: {
		marginRight: theme.spacing(1.25),
	},
}))
const Signup = () => {
	const classes = useStyles()
	const dispatch = useDispatch()
	const { error } = useSelector(state => state)

	const [form, setForm] = useState({
		//eve.holt@reqres.in
		//***password */ ---- password doesnt really matter in this reqres api
		email: 'eve.holt@reqres.in',
		password: 'password',
		passwordVisible: false,
		error: '',
	})

	useEffect(() => {
		setLoading(false)
	}, [error])

	const [loading, setLoading] = useState(false)

	const handleChange = e => {
		setForm({ ...form, [e.target.name]: e.target.value })
	}

	const handlePasswordToggle = () => {
		setForm({ ...form, passwordVisible: !form.passwordVisible })
	}
	const ButtonWithLoading = WithLoading(FormButton)
	const handleSubmit = e => {
		e.preventDefault()
		setLoading(true)
		const { email, password } = form
		if (email && password) dispatch(onAuth({ email, password }))
		else dispatch(addError('Please fill out all fields'))
	}
	const visiblityIcon = form.passwordVisible ? <VisibilityOnIcon /> : <VisibilityOffIcon />

	return (
		<form autoComplete="off" onSubmit={handleSubmit} className={classes.root}>
			<ShinyBorderContainer>
				<CutBorderContainer>
					<UserCloudLogo />
					<Container>
						<Typography variant="h2">Sign in</Typography>
						<Input
							startAdornment={<EmailIcon className={classes.inputIcon} />}
							onChange={handleChange}
							value={form.email}
							name="email"
							fullWidth
							disableUnderline
							className={classes.input}
							placeholder="Email"
						/>
						<Input
							startAdornment={<PasswordIcon className={classes.inputIcon} />}
							endAdornment={<IconButton onClick={handlePasswordToggle}>{visiblityIcon}</IconButton>}
							type={form.passwordVisible ? 'text' : 'password'}
							onChange={handleChange}
							fullWidth
							value={form.password}
							name="password"
							disableUnderline
							className={classes.input}
							placeholder="Password"
						/>
						<Error closeError={() => dispatch(addError(''))} error={error} />
					</Container>
					<ButtonWithLoading text="Sign up" size={34} isLoading={loading} />
				</CutBorderContainer>
			</ShinyBorderContainer>
		</form>
	)
}

export default Signup
