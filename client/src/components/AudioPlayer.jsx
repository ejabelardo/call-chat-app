import React, { useContext } from "react";
import { SocketContext } from "../SocketContext.js";

const AudioPlayer = () => {
	const { name, callAccepted, myAudio, userAudio, callEnded, stream, call } =
		useContext(SocketContext);

	return (
		<div className="grid">
			{stream && (
				<div className="paper">
					<div className="grid">
						<div className="typography">{name || "Name"}</div>
						<audio controls autoPlay ref={myAudio} />
					</div>
				</div>
			)}
			{callAccepted && !callEnded && (
				<div className="paper">
					<div className="grid">
						<div className="typography">{call.name || "Name"}</div>
						<audio controls autoPlay ref={userAudio}></audio>
					</div>
				</div>
			)}
		</div>
	);
};

export default AudioPlayer;
