import React from 'react'
import { makeStyles } from '@material-ui/core'
import { ReactComponent as PlusIcon } from '../../../assets/PlusIcon.svg'
import ShinyBorderContainer from '../../../hoc/ShinyBorderContainer'
import CutBorderContainer from '../../../hoc/CutBorderContainer'

const useStyles = makeStyles(theme => ({
	root: {
		[theme.breakpoints.down('sm')]: {
			width: 40,
			height: 40,
			margin: theme.spacing(1.5, 1),
			zIndex:1
		},
		width: 60,
		height: 60,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		background: theme.palette.primary.main,
		bottom: 0,
		right: 0,
		margin: theme.spacing(5.3, 4.7),
		cursor: 'pointer',
		position: 'fixed',
	},
}))
const AddButton = ({ setOpen }) => {
	const classes = useStyles()
	return (
		<div onClick={() => setOpen(true)} className={classes.root}>
			<ShinyBorderContainer>
				<CutBorderContainer>
					<PlusIcon />
				</CutBorderContainer>
			</ShinyBorderContainer>
		</div>
	)
}

export default AddButton
