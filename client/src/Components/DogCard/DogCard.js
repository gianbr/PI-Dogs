import React from "react";
import { Link } from "react-router-dom";
import "./DogCard.css";

export default function DogCard({
	name,
	image,
	temperament,
	temperaments,
	height,
	weight,
	id,
	createdInDB,
}) {
	return (
		<div className="cardContainer">
			<div>
				<Link to={`/home/${id}`} className="cardName">
					<h3>{name}</h3>
				</Link>
			</div>
			<Link to={`/home/${id}`} className="imageContainer">
				<img src={image} alt="" className="cardImage" />
			</Link>
			<div className="cardTempContainer">
				<h4 className="temperaments">
					{createdInDB
						? temperaments
								.sort((a, b) =>
									a > b
										? 1
										: -1
								)
								.map(
									(e) =>
										e.name
								)
								.join(", ")
						: temperament}
				</h4>
				<h5 className="heightAndWeight ">
					Weight: {weight} kg
				</h5>
				<h5 className="heightAndWeight">
					Height: {height} cm
				</h5>
				<Link to={"/home/" + id}>
					<button className="btn">
						Learn more
					</button>
				</Link>
			</div>
		</div>
	);
}
