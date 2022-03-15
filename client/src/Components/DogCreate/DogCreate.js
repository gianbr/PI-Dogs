import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDogTemperament, createBreed } from "../../actions/actions";
import Navbar from "../Navbar/Navbar";
import "./DogCreate.css";

function refreshPage() {
	window.location.reload(false);
}

const validate = function (input) {
	let errors = {};
	if (!input.name) {
		errors.name = "Completing with a *BREED'S NAME* is required!";
	}
	if (!input.minimHeight) {
		errors.minimHeight =
			"Completing with a *MINIMAL HEIGHT* is required!";
	}
	if (input.minimHeight <= 0) {
		errors.minimHeight =
			"*MIN HEIGHT* should be higher greater than 0";
	}
	if (!input.maximHeight) {
		errors.maximHeight =
			"Completing with a *MAXIMAL HEIGHT* is required!";
	}
	if (input.maximHeight <= 0) {
		errors.minimHeight =
			"*MAX HEIGHT* should be higher greater than 0";
	}
	if (!input.minimWeight) {
		errors.minimWeight =
			"Completing with a *MINIMAL WEIGHT* is required!";
	}
	if (input.minimWeight <= 0) {
		errors.minimWeight =
			"*MIN WEIGHT* should be higher greater than 0";
	}
	if (!input.maximWeight) {
		errors.maximWeight =
			"Completing with a *MAXIMAL WEIGHT* is required!";
	}
	if (input.maximWeight <= 0) {
		errors.minimWeight =
			"*MAX WEIGHT* should be higher greater than 0";
	}
	if (parseInt(input.minimHeight) > parseInt(input.maximHeight)) {
		errors.minimHeight =
			"*MIN HEIGHT* must not surmount the *MAX HEIGHT* value!";
	}
	if (parseInt(input.minimWeight) > parseInt(input.maximWeight)) {
		errors.minimWeight =
			"*MIN WEIGHT* must not surmount the *MAX WEIGHT* value!";
	}
	if (!input.life_span) {
		errors.life_span = "Completing with a *LIFE SPAN* is required!";
	}

	if (input.life_span < 0) {
		errors.life_span =
			"A life span should be higher greater than 0";
	}
	if (input.life_span > 21) {
		errors.life_span =
			"Please, select a reasonable life span for your dog.";
	}
	return errors;
};

export default function DogCreate() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const temperament = useSelector((state) => state.temperaments);
	const [errors, setErrors] = useState({});

	const [input, setInput] = useState({
		name: "",
		minimHeight: "",
		maximHeight: "",
		minimWeight: "",
		maximWeight: "",
		life_span: "",
		image: "",
		temperament: [],
	});

	function handleChange(e) {
		setInput({
			...input,
			[e.target.name]: e.target.value,
		});
	}

	function handleSelect(e) {
		setInput({
			...input,
			temperament: [...input.temperament, e.target.value],
		});
	}

	function handleSubmit(e) {
		e.preventDefault();
		setErrors(validate(input));
		const errorSaver = validate(input);
		if (Object.values(errorSaver).length !== 0) {
			return alert(
				"Please, fulfill ALL of the required conditions in the form so you could create your dog"
			);
		}
		if (input.life_span) {
			input.life_span = input.life_span + " years";
		}
		dispatch(createBreed(input));
		alert("Dog created successfully!");
		setInput({
			name: "",
			minimHeight: "",
			maximHeight: "",
			minimWeight: "",
			maximWeight: "",
			life_span: "",
			image: "",
			temperament: [],
		});
		navigate("/home");
	}

	function handleDelete(el) {
		setInput({
			...input,
			temperament: input.temperament.filter(
				(temp) => temp !== el
			),
		});
	}

	useEffect(() => {
		dispatch(getDogTemperament());
	}, [dispatch]);

	return (
		<>
			<Navbar />
			<div className="creationContainer">
				<form onSubmit={(e) => handleSubmit(e)}>
					<h2 className="creationTitle">
						Create your own dog breed
					</h2>
					<h3>
						Fill the form with information
						and then click "Create Dog"
					</h3>
					<div className="creationWrapper">
						{/* ----------- NAME ----------- */}
						<div className="creationBreed creationInput">
							<label>Breed</label>
							<input
								className="breedInput"
								type="text"
								value={
									input.name
								}
								name="name"
								placeholder="Breed's name"
								onChange={(e) =>
									handleChange(
										e
									)
								}
							/>
							{errors.name && (
								<p className="error">
									{
										errors.name
									}
								</p>
							)}
						</div>
						{/* ----------- HEIGHT ----------- */}
						<div className="creationHeight creationInput">
							<label>
								Min Height
							</label>
							<input
								className="minHeightInput"
								type="number"
								min="1"
								max="99"
								value={
									input.minimHeight
								}
								name="minimHeight"
								placeholder="Minimal height"
								onChange={(e) =>
									handleChange(
										e
									)
								}
							/>
							{errors.minimHeight && (
								<p className="error">
									{
										errors.minimHeight
									}
								</p>
							)}
						</div>

						<div className="maxHeight creationInput">
							<label>
								Max Height
							</label>
							<input
								className="maxHeightInput"
								type="number"
								min="1"
								max="99"
								value={
									input.maximHeight
								}
								name="maximHeight"
								placeholder="Maximal height"
								onChange={(e) =>
									handleChange(
										e
									)
								}
							/>
							{errors.maximHeight && (
								<p className="error">
									{
										errors.maximHeight
									}
								</p>
							)}
						</div>
						{/* ----------- WEIGTH ----------- */}
						<div className="minWeight creationInput">
							<label>
								Min Weight
							</label>
							<input
								className="minWeightInput"
								type="number"
								min="1"
								max="99"
								value={
									input.minimWeight
								}
								name="minimWeight"
								placeholder="Minimal weight"
								onChange={(e) =>
									handleChange(
										e
									)
								}
							/>
							{errors.minimWeight && (
								<p className="error">
									{
										errors.minimWeight
									}
								</p>
							)}
						</div>

						<div className="maxWeight creationInput">
							<label>
								Max Weight
							</label>
							<input
								className="maxWeightInput"
								type="number"
								min="1"
								max="99"
								value={
									input.maximWeight
								}
								name="maximWeight"
								placeholder="Maximal weight"
								onChange={(e) =>
									handleChange(
										e
									)
								}
							/>
							{errors.maximWeight && (
								<p className="error">
									{
										errors.maximWeight
									}
								</p>
							)}
						</div>
						{/* ----------- LIFE_SPAN ----------- */}
						<div className="life_span creationInput">
							<label>Life Span</label>
							<input
								className="lifeSpanInput"
								value={
									input.life_span
								}
								name="life_span"
								placeholder="Breed's life span"
								onChange={(e) =>
									handleChange(
										e
									)
								}
							/>
							{errors.life_span && (
								<label className="error">
									{
										errors.life_span
									}
								</label>
							)}
						</div>
						{/* ----------- IMAGE ----------- */}
						<div className="picture creationInput">
							<label>Image</label>
							<input
								className="pictureInput"
								type="text"
								value={
									input.image
								}
								name="image"
								placeholder="Breed's image URL"
								onChange={(e) =>
									handleChange(
										e
									)
								}
							/>
						</div>
						{/* ----------- TEMPERAMENTS ----------- */}
						<div className="creationInput">
							<select
								onChange={(e) =>
									handleSelect(
										e
									)
								}
								className="listTemps"
							>
								<option hidden>
									Dog's
									temperaments
								</option>
								{temperament.map(
									(
										temperament
									) => (
										<option
											value={
												temperament
											}
										>
											{
												temperament
											}
										</option>
									)
								)}
							</select>
						</div>
						<div className="temperamentsItemsContainer">
							<div className="temperamentsItems">
								{input.temperament?.map(
									(
										type
									) => (
										<div
											key={
												type
											}
										>
											<span>
												{
													type
												}
											</span>
											<button
												type="button"
												onClick={() =>
													handleDelete(
														type
													)
												}
											>
												x
											</button>
										</div>
									)
								)}
							</div>
						</div>
						{/* ----------- BUTTON ----------- */}
						<div className="creationButtons">
							<span
								onClick={
									refreshPage
								}
								className="creationReset"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
								>
									<path d="M13.5 2c-5.629 0-10.212 4.436-10.475 10h-3.025l4.537 5.917 4.463-5.917h-2.975c.26-3.902 3.508-7 7.475-7 4.136 0 7.5 3.364 7.5 7.5s-3.364 7.5-7.5 7.5c-2.381 0-4.502-1.119-5.876-2.854l-1.847 2.449c1.919 2.088 4.664 3.405 7.723 3.405 5.798 0 10.5-4.702 10.5-10.5s-4.702-10.5-10.5-10.5z" />
								</svg>
							</span>
							<button
								className="createDogButton"
								type="submit"
							>
								Create Dog
							</button>
						</div>
					</div>
				</form>
			</div>
		</>
	);
}
