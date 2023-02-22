import React, { createContext, useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";
import ringtone from "../src/assets/ringtone01.mp3";
import calling from "../src/assets/calling01.mp3";
import busy from "../src/assets/busy01.mp3";

const SocketContext = createContext();

const socket = io("http://server.cs-coms.com");

const ContextProvider = ({ children }) => {
	const [callAccepted, setCallAccepted] = useState(false);
	const [callEnded, setCallEnded] = useState(false);
	const [stream, setStream] = useState();
	const [name, setName] = useState("");
	const [call, setCall] = useState({});
	const [me, setMe] = useState("");
	//test
	const [tone, setTone] = useState(ringtone);

	const myAudio = useRef();
	const userAudio = useRef();
	const connectionRef = useRef();

	const toneRef = useRef();

	useEffect(() => {
		navigator.mediaDevices
			.getUserMedia({ video: false, audio: true })
			.then((currentStream) => {
				setStream(currentStream);

				// myAudio.current.srcObject = currentStream;
				// myAudio.current.muted = true;
			});

		socket.on("me", (id) => setMe(id));

		socket.on("callUser", ({ from, name: callerName, signal }) => {
			setCall({ isReceivingCall: true, from, name: callerName, signal });

			setTone(ringtone);
			toneRef.current.play();
		});
	}, [callEnded]);

	const answerCall = () => {
		setCallAccepted(true);
		setCallEnded(false);

		const peer = new Peer({ initiator: false, trickle: false, stream });

		toneRef.current.pause();

		peer.on("signal", (data) => {
			socket.emit("answerCall", { signal: data, to: call.from });
		});

		peer.on("stream", (currentStream) => {
			userAudio.current.srcObject = currentStream;
		});

		peer.signal(call.signal);

		connectionRef.current = peer;
	};

	const callUser = (id) => {
		const peer = new Peer({ initiator: true, trickle: false, stream });

		setTone(calling);

		peer.on("signal", (data) => {
			socket.emit("callUser", {
				userToCall: id,
				signalData: data,
				from: me,
				name,
			});

			toneRef.current.play();
		});

		peer.on("stream", (currentStream) => {
			userAudio.current.srcObject = currentStream;
		});

		socket.on("callAccepted", (signal) => {
			toneRef.current.pause();
			setCallAccepted(true);

			peer.signal(signal);
		});

		connectionRef.current = peer;
	};

	const leaveCall = () => {
		// setTone(busy);
		// toneRef.current.play();

		// socket.emit("disconnect");
		socket.disconnect();

		socket.on("callEnded", () => {
			console.log("The person you are calling disconnected");
		});
		connectionRef.current = null;

		// window.location.reload();
		setStream(null);
		setMe("");
		setCall("");
		setCallAccepted(false);
		setCallEnded(true);
	};

	return (
		<SocketContext.Provider
			value={{
				tone,
				toneRef,
				call,
				callAccepted,
				myAudio,
				userAudio,
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
