import React from "react";

const ListUsers = ({ user }) => {
	console.log(user);
	// let usersList = user.map((useritem) => <li key={useritem}>{useritem}</li>);
	return (
		<div>
			<h5>Users List</h5>
			{/* {usersList} */}
		</div>
	);
};

export default ListUsers;
