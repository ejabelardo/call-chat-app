import React, { createContext, useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";
import ringtone from "../src/assets/ringtone01.mp3";
import calling from "../src/assets/calling01.mp3";
import busy from "../src/assets/busy01.mp3";

const SocketContext = createContext();

const socket = io("http://localhost:5000");
// const socket = io('');

const ContextProvider = ({ children }) => {
	const [callAccepted, setCallAccepted] = useState(false);
	const [callEnded, setCallEnded] = useState(false);
	const [stream, setStream] = useState();
	const [name, setName] = useState("");
	const [call, setCall] = useState({});
	const [me, setMe] = useState("");
	//test
	const [audio, setAudio] = useState(ringtone);

	const myVideo = useRef();
	const userVideo = useRef();
	const connectionRef = useRef();
	//test
	const audioRef = useRef();

	useEffect(() => {
		navigator.mediaDevices
			.getUserMedia({ video: false, audio: true })
			.then((currentStream) => {
				setStream(currentStream);

				// myVideo.current.srcObject = currentStream;
				// console.log(myVideo.current);
			});

		socket.on("me", (id) => setMe(id));

		socket.on("callUser", ({ from, name: callerName, signal }) => {
			setCall({ isReceivingCall: true, from, name: callerName, signal });
			setAudio(ringtone);
			audioRef.current.play();
		});
	}, []);

	const answerCall = () => {
		setCallAccepted(true);

		const peer = new Peer({ initiator: false, trickle: false, stream });
		audioRef.current.pause();

		peer.on("signal", (data) => {
			socket.emit("answerCall", { signal: data, to: call.from });
			// console.log('answerCall signal');
		});

		peer.on("stream", (currentStream) => {
			userVideo.current.srcObject = currentStream;
			// console.log('answerCall stream');
		});

		peer.signal(call.signal);

		connectionRef.current = peer;
	};

	const callUser = (id) => {
		const peer = new Peer({ initiator: true, trickle: false, stream });
		setAudio(calling);

		peer.on("signal", (data) => {
			socket.emit("callUser", {
				userToCall: id,
				signalData: data,
				from: me,
				name,
			});
			audioRef.current.play();
			// console.log('callUser signal');
		});

		peer.on("stream", (currentStream) => {
			userVideo.current.srcObject = currentStream;
			// console.log('callUser stream');
		});

		socket.on("callAccepted", (signal) => {
			audioRef.current.pause();
			setCallAccepted(true);

			// console.log('callAccepted');
			peer.signal(signal);
		});

		connectionRef.current = peer;
	};

	const leaveCall = () => {
		setCallEnded(true);

		connectionRef.current.destroy();

		window.location.reload();
	};

	return (
		<SocketContext.Provider
			value={{
				audio,
				audioRef,
				call,
				callAccepted,
				myVideo,
				userVideo,
				stream,
				name,
				setName,
				callEnded,
				me,
				callUser,
				leaveCall,
				answerCall,
			}}>
			{children}
		</SocketContext.Provider>
	);
};

export { ContextProvider, SocketContext };
