import React, { useEffect, useState } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Avatar, Dialog, IconButton, makeStyles, Typography } from '@material-ui/core'
import Error from '../../../components/Error'
import FormButton from '../../../components/FormButton'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import theme from '../../../theme'
import { addUser } from '../../../store/actions/users'
import { useDispatch, useSelector } from 'react-redux'
import { Close } from '@material-ui/icons'
import WithLoading from '../../../hoc/withLoading'

const useStyles = makeStyles(theme => ({
	dialogPaper: {
		padding: theme.spacing(4),
		background: theme.palette.primary.main,
		overflowY: 'hidden',
	},

	imageContainer: {
		[theme.breakpoints.down('sm')]: {
			flexDirection: 'row',
		},
		flexDirection: 'column',

		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	form: {
		display: 'flex',
		height: '100%',
		justifyContent: 'space-around',
		flexDirection: 'column',
		'& > input, select,  .react-datepicker__input-container > input': {
			color: 'white',
			width: '100%',
			padding: theme.spacing(1.25, 2.5),
			margin: theme.spacing(1, 0),
			background: 'none',
			border: 'none',
			borderBottom: '1px solid ',
			'&::placeholder': {
				color: 'white',
				fontFamily: 'Roboto',
				fontWeight: 300,
			},
			'& option': {
				color: 'black',
			},
		},

		'& > label': {
			[theme.breakpoints.up('sm')]: {},
			color: 'white',
			cursor: 'pointer',
			padding: theme.spacing(1.25),
			border: '1px dashed',
			borderRadius: 8,
			marginBottom: theme.spacing(1.25),
		},
	},
}))
const AddUserForm = ({ roles, open, setOpen, closeErrorHandler, storeError }) => {
	const classes = useStyles()
	const dispatch = useDispatch()
	const { users, error } = useSelector(state => state)
	const [loading, setLoading] = useState(false)
	useEffect(() => {
		//close modal when users are chaning. eg. a new user was added
		setOpen(false)
		return () => setLoading(false)
		//eslint-disable-next-line
	}, [users])

	useEffect(() => {
		setLoading(false)
	}, [error])

	const ButtonWithLoading = WithLoading(FormButton)

	const handleSubmit = data => {
		setLoading(true)
		const valid = validateOtherUserData()
		if (!valid) {
			setLoading(false)

			let field = Object.keys(otherUserData)[0]
			setOtherUserData({ ...otherUserData, error: `${field} is required` })
			return
		}
		const uid = generateUserId()
		const { birthdate, photo } = otherUserData
		data = { ...data, role: data.role.replaceAll(' ', 'SPACE'), photo, birthdate, id: uid } //role cant have spaces
		dispatch(addUser(data))
	}

	const handlePhotoUpload = e => {
		const file = e.target.files[0]
		if (!file) return
		const reader = new FileReader()
		reader.onload = () => {
			if (reader.result.length > 500) {
				setOtherUserData({ ...otherUserData, error: 'Photo is too large. please upload a new one' })
				return
			}
			setOtherUserData({ ...otherUserData, photo: reader.result })
		}
		reader.readAsDataURL(file)
	}

	// Formik doesnt support file upload validation
	// Input type date is buggy in Chrome
	const [otherUserData, setOtherUserData] = useState({
		photo: '',
		birthdate: new Date(),
		error: '',
	})

	const validateOtherUserData = () => {
		const { photo, birthdate } = otherUserData
		return photo && birthdate
	}

	const generateUserId = () => {
		let uid = Math.floor(Math.random() * 100)
		let taken = users.some(user => user.ID === uid)
		if (taken) generateUserId()
		else return uid
	}

	const localErrorHandler = () => {
		return () => setOtherUserData({ ...otherUserData, error: '' })
	}

	const SignupSchema = Yup.object().shape({
		firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('First name is required'),
		lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name is required'),
		email: Yup.string().email('Invalid email').required('Email is required'),
		address: Yup.string().max(250, 'Too Long!').required('Address is required'),
		id: Yup.number(),
		role: Yup.string().required('Role is required').oneOf(roles),
	})
	return (
		<Dialog
			BackdropProps={{ style: { background: theme.palette.background.default, opacity: 0.7 } }}
			onClose={() => setOpen(false)}
			classes={{ paper: classes.dialogPaper }}
			open={open}
		>
			<header
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<Typography variant="h2">Add user</Typography>
				<IconButton onClick={() => setOpen(false)}>
					<Close htmlColor="white" />
				</IconButton>
			</header>

			<Formik
				initialValues={{
					firstName: '',
					lastName: '',
					email: '',
					id: '',
					address: '',
					role: '',
				}}
				validationSchema={SignupSchema}
				onSubmit={data => {
					handleSubmit(data)
				}}
			>
				{({ errors, touched }) => (
					<Form className={classes.form}>
						<Error
							closeError={closeErrorHandler(localErrorHandler)}
							error={Object.values(errors)[0] || otherUserData.error || storeError} // formik, local, and redux errors
						/>
						<Field placeholder="First name" name="firstName" />
						<Field placeholder="Last name " name="lastName" />
						<Field placeholder="Email" name="email" type="email" />
						<DatePicker
							showPopperArrow
							selected={otherUserData.birthdate}
							onChange={date => setOtherUserData({ ...otherUserData, birthdate: date })}
						/>
						<Field placeholder="Address" name="address" />
						<Field placeholder="Role" name="role" as="select">
							<option selected disabled>
								Choose role
							</option>
							{roles.map(o => (
								<option>{o}</option>
							))}
						</Field>
						<label for="photo-upload-input">
							{otherUserData.photo ? (
								<div className={classes.imageContainer}>
									<Avatar src={otherUserData.photo} />
									<span>Click to change image</span>
								</div>
							) : (
								<span>Upload image</span>
							)}
						</label>
						<input id="photo-upload-input" hidden onChange={handlePhotoUpload} type="file" />

						<ButtonWithLoading text="Done" size={34} isLoading={loading} />
					</Form>
				)}
			</Formik>
		</Dialog>
	)
}

export default AddUserForm
