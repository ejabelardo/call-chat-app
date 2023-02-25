import React from "react";

import AudioPlayer from "./components/AudioPlayer";
import Options from "./components/Options";
// import Notifications from "./components/Notifications";

const App = () => {
	return (
		<div className="wrapper">
			<div className="appbar">{/* <h2 variant="h2">Call Chat</h2> */}</div>
			<AudioPlayer />
			<Options>{/* <Notifications /> */}</Options>
		</div>
	);
};

export default App;
