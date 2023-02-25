import React, { useContext } from "react";

import { SocketContext } from "../SocketContext.js";

const Notifications = () => {
	const { answerCall, call, callAccepted } = useContext(SocketContext);

	return <></>;
};

export default Notifications;
