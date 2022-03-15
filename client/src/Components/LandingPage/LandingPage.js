import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
	return (
		<>
			<div className="landingPage">
				<div className="landingWrapper">
					<h1>Welcome to Henry's Dogs</h1>
					<Link to={"/home"}>
						<span className="landingButton">
							Enter
						</span>
					</Link>
				</div>
			</div>
		</>
	);
}
