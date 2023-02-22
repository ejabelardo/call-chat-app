import React, { useContext } from "react";

import { SocketContext } from "../SocketContext.js";

const Notifications = () => {
	const { answerCall, call, callAccepted } = useContext(SocketContext);

	return (
		<>
			{call.isReceivingCall && !callAccepted && (
				<div>
					<h1>{call.name || "Someone"} is calling:</h1>
					<button type="button" onClick={answerCall}>
						Answer
					</button>
				</div>
			)}
		</>
	);
};

export default Notifications;
