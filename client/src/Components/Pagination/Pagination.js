import React from "react";
import "./Pagination.css";

export default function Pagination({
	dogsPerPage,
	allDogs,
	pagination,
	prevPage,
	nextPage,
}) {
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
		pageNumbers.push(i);
	}
	return (
		<nav className="paginationContainer">
			<ul className="Pagination__ul">
				{pageNumbers?.map((number) => (
					<button
						key={number}
						onClick={() =>
							pagination(number)
						}
						className="Pagination__Button"
					>
						{number}
					</button>
				))}
			</ul>
			<div className="paginationButtons">
				<button
					className="backButton"
					onClick={prevPage}
				>
					Back
				</button>
				<button
					className="nextButton"
					onClick={nextPage}
				>
					Next
				</button>
			</div>
		</nav>
	);
}
