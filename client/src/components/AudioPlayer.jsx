import React, { useContext } from "react";
import { SocketContext } from "../SocketContext.js";
import { useParams } from "react-router-dom";

const AudioPlayer = () => {
	const { name, callAccepted, myAudio, userAudio, callEnded, stream, call } =
		useContext(SocketContext);

	const { userId } = useParams();

	return (
		<div className="grid">
			{stream && (
				<div className="paper">
					<div className="grid">
						<div className="typography">{userId}</div>
						<audio controls autoPlay ref={myAudio} />
					</div>
				</div>
			)}
			{callAccepted && !callEnded && (
				<div className="paper">
					<div className="grid">
						<div className="typography">{call.name}</div>
						<audio controls autoPlay ref={userAudio}></audio>
					</div>
				</div>
			)}
		</div>
	);
};

export default AudioPlayer;
