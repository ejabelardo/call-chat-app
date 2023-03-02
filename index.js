const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");

const io = require("socket.io")(server, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
		// credentials: true
	},
});

app.use(cors());

const PORT = process.env.PORT || 5000;

// let userId;

app.get("/", (req, res) => {
	res.send("Running...");
	// userId = req.params.userId;
});

io.on("connection", (socket) => {
	socket.emit("me", socket.id);

	socket.broadcast.emit("adminOnly", socket.id); //test

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded");
	});
	socket.on("callUser", ({ userToCall, signalData, from, name }) => {
		io.to(userToCall).emit("callUser", {
			signal: signalData,
			from,
			name,
			// userId,
		});
	});
	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal);
	});
	socket.on("hangupCall", (data) => {
		io.to(data.to).emit("callHangup", data.signal);
	});
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
