import React, { useContext } from "react";

import { SocketContext } from "../SocketContext.js";

const Notifications = () => {
	const { answerCall, call, callAccepted } = useContext(SocketContext);

	return (
		<>
			{call.isReceivingCall && !callAccepted && (
				<div>
					<h1>{call.name} is calling:</h1>
					<div onClick={answerCall}>Answer</div>
				</div>
			)}
		</>
	);
};

export default Notifications;
