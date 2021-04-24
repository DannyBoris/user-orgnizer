import { Input, makeStyles } from '@material-ui/core'
import React from 'react'
import { ReactComponent as SearchIcon } from '../../../assets/SearchIcon.svg'
import CutBorderContainer from '../../../hoc/CutBorderContainer'
import ShinyBorderContainer from '../../../hoc/ShinyBorderContainer'

const useStyles = makeStyles(theme => ({
	root: {
		[theme.breakpoints.down('sm')]: {
			left: '50%',
			transform: 'translate(-50%,75%)',
			margin: 0,
		},
		width: 235,
		height: 35,
		background: theme.palette.primary.main,
		position: 'absolute',
		right: 0,
		margin: theme.spacing(5.3, 4.7),
		padding: theme.spacing(1.25),
		'& input': {
			color: 'white',
			padding: theme.spacing(0, 0.5),
			'&::placeholder': {
				color: 'white',
				fontFamily: 'Roboto',
				fontWeight: 300,
			},
		},
	},
}))
const SearchSection = ({ term, setTerm }) => {
	const classes = useStyles()
	return (
		<section className={classes.root}>
			<CutBorderContainer>
				<ShinyBorderContainer>
					<Input
					
						onChange={e => setTerm(e.target.value)}
						value={term}
						fullWidth
						startAdornment={<SearchIcon />}
						disableUnderline
						placeholder="Search for a user"
					/>
				</ShinyBorderContainer>
			</CutBorderContainer>
		</section>
	)
}

export default SearchSection
