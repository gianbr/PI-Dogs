import React from "react";
import Woof from "../../assets/loading-dog.gif";
import "./LoadScreen.css";

const LoadScreen = ({ setLoading }) => {
	setTimeout(() => {
		setLoading(false);
	}, 2000);

	return (
		<>
			<div className="loadingContainer">
				<img src={Woof} alt="" />
			</div>
		</>
	);
};

export default LoadScreen;
