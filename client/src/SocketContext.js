import React, { createContext, useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";

import ringTone from "../src/assets/ringtone01.mp3";
import callTone from "../src/assets/calling01.mp3";
// import busy from "../src/assets/busy01.mp3";

import { useParams } from "react-router-dom";

// import ListUsers from "./components/ListUsers";

const SocketContext = createContext();

const socket = io("http://localhost:5000");
// const socket = io("http://server.cs-coms.com");

const ContextProvider = ({ children }) => {
	const [callAccepted, setCallAccepted] = useState(false);
	const [callEnded, setCallEnded] = useState(false);
	const [stream, setStream] = useState();
	const [name, setName] = useState("");
	const [call, setCall] = useState({});
	const [me, setMe] = useState("");
	//test
	const [tone, setTone] = useState(ringTone);

	const myAudio = useRef();
	const userAudio = useRef();
	const connectionRef = useRef();

	const toneRef = useRef();
	// const [usersList, setUsersList] = useState();
	const [newUsers, setNewUsers] = useState("");
	const [calling, setCalling] = useState(false);

	// function updateUsersList(newUsersList) {
	// 	// console.log(newUsers);
	// 	setNewUsers([...newUsersList, ]);
	// }

	const { userId } = useParams();

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
			setCall({
				isReceivingCall: true,
				from,
				name: callerName,
				signal,
			});

			setTone(ringTone);
			toneRef.current.play();
		});
		// if (userId === "admin") {
		socket.on("adminOnly", (users) => {
			// console.log(users);
			setNewUsers(users);
			// updateUsersList({ sid: users, uname: userId });

			// socket.broadcast.emit("userToAdmin", { roomID });
		});
		// }
	}, []);

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

	const callUser = (id, userId) => {
		const peer = new Peer({ initiator: true, trickle: false, stream });

		setCalling(true);
		setTone(callTone);

		peer.on("signal", (data) => {
			socket.emit("callUser", {
				userToCall: id,
				signalData: data,
				from: me,
				name: userId,
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

		// socket.emit("disconnect", { me });
		socket.disconnect(me);
		setCallEnded(true);

		// socket.on("callEnded", () => {
		// 	console.log("The person you are calling disconnected");
		// });
		// connectionRef.current = null;
		connectionRef.current.destroy();

		window.location.reload();
		// setStream(null);
		// setMe("");
		// setCall("");
		// setCallAccepted(false);
	};

	return (
		<SocketContext.Provider
			value={{
				newUsers,
				tone,
				toneRef,
				call,
				calling,
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
