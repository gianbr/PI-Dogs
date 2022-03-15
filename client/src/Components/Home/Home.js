import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getDogs,
	getDogTemperament,
	filterByWeight,
	filterByCreated,
	filterByName,
	filterByTemperament,
} from "../../actions/actions";
import DogCard from "../DogCard/DogCard";
import LoadScreen from "../LoadScreen/LoadScreen";
import Pagination from "../Pagination/Pagination";
import SearchBar from "../SearchBar/SearchBar";
import Navbar from "../Navbar/Navbar";
import "./Home.css";

const Home = () => {
	const dispatch = useDispatch();
	const allDogs = useSelector((state) => state.dogs);
	const temperament = useSelector((state) => state.temperaments);

	const [loading, setLoading] = useState(true);

	const [currentPage, setCurrentPage] = useState(1); // inicio en la primer pagina
	const [dogsPerPage, setDogsPerPage] = useState(8); // cuantas cartas muestro por pagina
	const [peso, setPeso] = useState("");
	const [orden, setOrden] = useState("");

	const indexOfLastDog = currentPage * dogsPerPage; // 1*8
	const indexOfFirstDog = indexOfLastDog - dogsPerPage; // 8 - 8
	const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog); // corto el array de 0 a 7

	useEffect(() => {
		dispatch(getDogs());
	}, []);

	useEffect(() => {
		dispatch(getDogTemperament());
	}, []);

	const pagination = (numberOfPage) => {
		setCurrentPage(numberOfPage);
	};

	const lastPage = allDogs.length / dogsPerPage;

	const nextPage = () => {
		if (currentPage < lastPage) {
			setCurrentPage(currentPage + 1);
		}
	};

	const prevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	function handleSort(e) {
		e.preventDefault();
		dispatch(filterByName(e.target.value));
		setCurrentPage(1);
		setOrden(`${e.target.value}`);
	}

	function handleFilterDogsByWeight(e) {
		e.preventDefault();
		dispatch(filterByWeight(e.target.value));
		setCurrentPage(1);
		setPeso(`${e.target.value}`);
	}

	function handleFilterDogsByCreated(e) {
		dispatch(filterByCreated(e.target.value));
		setCurrentPage(1);
	}

	function handleFilterDogsByTemperament(e) {
		e.preventDefault();
		dispatch(filterByTemperament(e.target.value));
	}

	function handleClick() {
		window.location.reload(false);
	}

	// let tempKey = 0;

	return (
		<>
			{loading ? (
				<LoadScreen setLoading={setLoading} />
			) : (
				<div className="homeContainer">
					<Navbar />
					<SearchBar />
					<div className="homeFilters">
						<select
							className="listAlpha"
							onChange={(e) =>
								handleSort(e)
							}
						>
							<option hidden="all">
								Default Order
							</option>
							<option value="Asc">
								{" "}
								A-Z{" "}
							</option>
							<option value="Desc">
								{" "}
								Z-A{" "}
							</option>
						</select>
						<select
							className="listAlpha"
							onChange={(e) =>
								handleFilterDogsByWeight(
									e
								)
							}
						>
							<option hidden="AllWeights">
								Unordered
								Weights
							</option>
							<option value="HeavyWeight">
								Heaviest breeds
							</option>
							<option value="LightWeight">
								Lightest breeds
							</option>
						</select>
						<select
							className="listAlpha"
							onChange={(e) =>
								handleFilterDogsByCreated(
									e
								)
							}
						>
							<option hidden="Alll">
								All existent
								breeds
							</option>
							<option value="AllDogs">
								All existent
								breeds
							</option>
							<option value="Api">
								Official breeds
							</option>
							<option value="Created">
								Created breeds
							</option>
						</select>
						<select
							onChange={(e) =>
								handleFilterDogsByTemperament(
									e
								)
							}
							className="listAlpha"
						>
							<option value="Temps">
								Temperaments
							</option>
							{temperament.map(
								(temp, i) => {
									return (
										<option
											key={
												temp[
													i
												]
											}
											value={
												temp
											}
										>
											{
												temp
											}
										</option>
									);
								}
							)}
						</select>
					</div>

					<div className="positions">
						<div className="breedsResetContainer">
							<button
								type="submit"
								onClick={
									handleClick
								}
								className="breedsReset"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
								>
									<path d="M13.5 2c-5.629 0-10.212 4.436-10.475 10h-3.025l4.537 5.917 4.463-5.917h-2.975c.26-3.902 3.508-7 7.475-7 4.136 0 7.5 3.364 7.5 7.5s-3.364 7.5-7.5 7.5c-2.381 0-4.502-1.119-5.876-2.854l-1.847 2.449c1.919 2.088 4.664 3.405 7.723 3.405 5.798 0 10.5-4.702 10.5-10.5s-4.702-10.5-10.5-10.5z" />
								</svg>
							</button>
						</div>
						<div className="breedsPagination">
							<Pagination
								dogsPerPage={
									dogsPerPage
								}
								allDogs={
									allDogs.length
								}
								pagination={
									pagination
								}
								prevPage={
									prevPage
								}
								nextPage={
									nextPage
								}
							/>
						</div>
						<>
							<div className="breedsContainer">
								<div className="breedsWrapper">
									{currentDogs.map(
										(
											e
										) => {
											return (
												<div className="breeds">
													<DogCard
														key={
															e.id
														}
														id={
															e.id
														}
														name={
															e.name
														}
														image={
															e.image
																? e.image
																: e.image
														}
														temperament={
															e.temperament
														}
														temperaments={
															e.temperaments
														}
														height={
															e.height
														}
														weight={
															e.weight
														}
														createdInDB={
															e.createdInDB
														}
													/>
												</div>
											);
										}
									)}
								</div>
							</div>
						</>
					</div>
					<div className="breedsPagination">
						<Pagination
							dogsPerPage={
								dogsPerPage
							}
							allDogs={allDogs.length}
							pagination={pagination}
							prevPage={prevPage}
							nextPage={nextPage}
						/>
					</div>
				</div>
			)}
		</>
	);
};

export default Home;
