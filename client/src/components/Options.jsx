import React, { useState, useContext } from "react";
import { SocketContext } from "../SocketContext.js";

const Options = ({ children }) => {
	const {
		audio,
		audioRef,
		me,
		callAccepted,
		name,
		setName,
		callEnded,
		leaveCall,
		callUser,
	} = useContext(SocketContext);
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
								<button type="button" onClick={() => callUser(idToCall)}>
									Call
								</button>
							)}
						</div>
					</div>
				</form>
				<audio loop controls src={audio} ref={audioRef}></audio>
				{children}
			</div>
		</div>
	);
};

export default Options;