import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./Components/LandingPage/LandingPage";
import Home from "./Components/Home/Home";
import DogCreate from "./Components/DogCreate/DogCreate";
import DogDetail from "./Components/DogDetail/DogDetail";

function App() {
	return (
		<>
			<Routes>
				<Route
					exact
					path="/"
					element={<LandingPage />}
				/>
				<Route
					exact
					path="/dog"
					element={<DogCreate />}
				/>
				<Route path="/home" element={<Home />} />
				<Route
					path="/home/:id"
					element={<DogDetail />}
				/>
			</Routes>
		</>
	);
}

export default App;
