import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../actions/actions";
import LoadScreen from "../LoadScreen/LoadScreen";
import Navbar from "../Navbar/Navbar";
import "./DogDetail.css";

export default function Detail() {
	const dispatch = useDispatch();
	const { id } = useParams();

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		dispatch(getDetail(id));
	}, [id]);

	const selectedDog = useSelector((state) => state.detail);
	console.log(selectedDog);

	return (
		<>
			<Navbar />
			<div>
				{selectedDog.length > 0 && loading !== true ? (
					<div>
						<div className="detailContainer">
							<h2 className="detailName">
								{
									selectedDog[0]
										.name
								}
							</h2>
							<img
								src={
									selectedDog[0]
										.image
								}
								alt=""
								width="476px"
								height="300px"
								className="detailImage"
							/>
							<div className="detailTemperamentsContainer">
								<h3>
									Breed's
									temperaments:
								</h3>
								<h4 className="detailTemperaments">
									{!selectedDog[0]
										.createdInDB
										? selectedDog[0]
												.temperament
										: selectedDog[0].temperaments.map(
												(
													e
												) => {
													return (
														<span
															key={
																e.key
															}
														>
															{e.name +
																", "}
														</span>
													);
												}
										  )}
								</h4>
							</div>

							<div className="heightAndWeightAndSpan">
								<h3>
									Breed's
									weight:{" "}
								</h3>
								<h4>
									{
										selectedDog[0]
											.weight
									}{" "}
									kg
								</h4>
							</div>

							<div className="heightAndWeightAndSpan">
								<h3>
									Breed's
									Height:{" "}
								</h3>
								<h4>
									{
										selectedDog[0]
											.height
									}{" "}
									cm
								</h4>
							</div>

							<div className="heightAndWeightAndSpan">
								<h3>
									Breed's
									life
									span:{" "}
								</h3>
								<h4>
									{selectedDog.createdInDB
										? selectedDog[0]
												.life_span +
										  "years approx"
										: selectedDog[0]
												.life_span}
									{
										" approx"
									}
								</h4>
							</div>
						</div>
					</div>
				) : (
					<LoadScreen setLoading={setLoading} />
				)}
			</div>
		</>
	);
}
