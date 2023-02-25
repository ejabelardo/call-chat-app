import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import App from "./App";
import { ContextProvider } from "./SocketContext";
import Layout from "./pages/layouts/userLayout";
import Home from "./pages/Home";

import "./style.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	// <React.StrictMode>
	<ContextProvider>
		<Router>
			<Routes>
				<Route element={<Layout />}>
					<Route path="/" element={<Home />} />
					<Route path="/user/:userId" element={<App />} />
				</Route>
			</Routes>
		</Router>
	</ContextProvider>
	// </React.StrictMode>
);
