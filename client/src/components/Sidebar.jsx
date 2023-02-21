import React, { useState, useContext } from "react";
import { SocketContext } from "../SocketContext.js";

const Sidebar = ({ children }) => {
	const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } =
		useContext(SocketContext);
	const [idToCall, setIdToCall] = useState("");

	return (
		<div className="container">
			<div className="paper">
				<form noValidate autoComplete="off">
					<div className="grid">
						<div className="grid">
							<div className="typography">Account Info</div>
							<input
								label="Name"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
							{/* {console.log(me)} */}
							<input defaultValue={me} placeholder={me} />
						</div>
						<div className="grid">
							<div className="typography">Make a call</div>
							<input
								label="ID to call"
								value={idToCall}
								onChange={(e) => setIdToCall(e.target.value)}
							/>
							{callAccepted && !callEnded ? (
								<div onClick={leaveCall}>Hang Up</div>
							) : (
								<div onClick={() => callUser(idToCall)}>Call</div>
							)}
						</div>
					</div>
				</form>
				{children}
			</div>
		</div>
	);
};

export default Sidebar;
