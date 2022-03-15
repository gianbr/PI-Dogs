import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogByName } from "../../actions/actions";
import "./SearchBar.css";

export default function SearchBar() {
	const dispatch = useDispatch();
	const [name, setName] = useState("");

	function handleInputChange(e) {
		e.preventDefault();
		setName(e.target.value);
	}

	function handleSubmit(e) {
		e.preventDefault();
		dispatch(getDogByName(name));
		// === name ? getDogsName(name) : alert("Your searched dog's breed does not exist!")
		setName("");
	}

	return (
		<div className="searchContainer">
			<div className="searchInputs">
				<input
					type="text"
					placeholder="Search a breed here"
					value={name}
					onChange={(e) => handleInputChange(e)}
					className="searchInput"
				/>
				<div className="searchIcon">
					<button
						className="searchButton"
						type="submit"
						onClick={(e) => handleSubmit(e)}
					>
						🔍
					</button>
				</div>
			</div>
			<div className="dataResult"></div>
		</div>
	);
}
