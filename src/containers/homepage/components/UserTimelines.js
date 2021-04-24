import React from 'react'
import UserCard from './UserCard'

const UserTimelines = ({ users, ...props }) => {
	return (
		<>
			{users.map(user => (
				<UserCard key={user.ID} user={user} {...props} />
			))}
		</>
	)
}

export default UserTimelines
