import React, { useState, useContext } from "react";
import { SocketContext } from "../SocketContext.js";
import phoneIconGreen from "../assets/phoneicon01.png";
import phoneIconBlack from "../assets/phoneicon02.png";
import hangupIconBlack from "../assets/hangupicon01.png";
import { useParams } from "react-router-dom";
import ListUsers from "./ListUsers";

const Options = ({ children }) => {
	const {
		newUsers,
		tone,
		toneRef,
		me,
		answerCall,
		call,
		calling,
		callAccepted,
		// name,
		// setName,
		callEnded,
		leaveCall,
		callUser,
	} = useContext(SocketContext);
	const [idToCall, setIdToCall] = useState("");

	const { userId } = useParams();

	// console.log(newUsers);
	// console.log(calling);
	return (
		<div className="container">
			{userId === "admin" && (
				<div className="adminOnly">
					<ListUsers user={newUsers} />
				</div>
			)}
			<div className="paper">
				<form noValidate autoComplete="off">
					<div className="grid">
						<div className="grid">
							{/* <div className="typography">Account Info</div> */}
							{/* <input
								label="Name"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/> */}
							<input defaultValue={me} placeholder={me} type="hidden" />
						</div>
						<div className="callDiv">
							{/* <div className="typography">Make a call</div> */}
							<input
								type="hidden"
								label="ID to call"
								value={userId}
								// onChange={(e) => setIdToCall(newUsers)}
								onChange={(e) => setIdToCall(e.target.value)}
							/>

							{(callAccepted && !callEnded) || calling ? (
								<button className="hangup" type="button" onClick={leaveCall}>
									<img src={hangupIconBlack} />
								</button>
							) : (
								<button
									type="button"
									onClick={() => callUser(newUsers, userId)}>
									<img src={phoneIconGreen} />
								</button>
							)}

							{call.isReceivingCall && !callAccepted && (
								<div className="callDiv">
									<h1>{call.name || "Someone"} is calling:</h1>
									<button
										className="calling"
										type="button"
										onClick={answerCall}>
										<img src={phoneIconBlack} alt="" />
									</button>
								</div>
							)}
						</div>
					</div>
				</form>
				<audio loop controls src={tone} ref={toneRef}></audio>
				{children}
			</div>
		</div>
	);
};

export default Options;
