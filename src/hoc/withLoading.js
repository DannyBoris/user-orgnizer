import { Box } from '@material-ui/core'
import React from 'react'
import Loader from 'react-loader-spinner'
import theme from '../theme'

const WithLoading = Component => {
	return function WithLoadingComponent({ isLoading, ...props }) {
		if (!isLoading) return <Component {...props} />
		return (
			<Box display="flex" justifyContent="center">
				<Loader
					className={props.loadingClassName}
					type="Oval"
					color={theme.palette.secondary.main}
					height={props.size}
					width={props.size}
					timeout={4000} //4 secs
				/>
			</Box>
		)
	}
}
export default WithLoading
