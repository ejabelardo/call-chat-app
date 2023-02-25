import React from "react";
import { Outlet } from "react-router-dom";

const userLayout = () => {
	return (
		<div>
			<Outlet />
		</div>
	);
};

export default userLayout;
