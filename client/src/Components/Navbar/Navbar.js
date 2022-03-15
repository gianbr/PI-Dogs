import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
// // import underDog from "../img/underDog.png"
// import Fou from "../img/Fouuu.png";
// import SearchBar from "../SearchBar/SearchBar";

const Nav = () => {
	return (
		<div>
			<nav className="navBar">
				<Link to={"/home"} className="titleNavBar">
					Henry's Dogs
				</Link>
				<Link to="/dog" className="creationNavBar">
					Create your own dog breed!
				</Link>
				{/* <SearchBar placeholder = "Find your doggo!" /> */}
			</nav>
			<hr />
		</div>
	);
};
export default Nav;
