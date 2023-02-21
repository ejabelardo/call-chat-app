import React, { useContext } from "react";
import { SocketContext } from "../SocketContext.js";

const VideoPlayer = () => {
	const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } =
		useContext(SocketContext);

	return (
		<div className="grid">
			{/* {stream && (
				<div className="paper">
					<div className="grid">
						<div className="typography">{name || 'Name'}</div>
						<video playsInline muted ref={myVideo} autoPlay/>
					</div>
				</div>
			)} */}
			{callAccepted && !callEnded && (
				<div className="paper">
					<div className="grid">
						<div className="typography">{call.name || "Name"}</div>
						{/* <video playsInline ref={userVideo} autoPlay/> */}
						<audio controls autoPlay ref={userVideo}></audio>
					</div>
				</div>
			)}
		</div>
	);
};

export default VideoPlayer;
