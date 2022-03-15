const initialState = {
	dogs: [],
	allDogs: [],
	temperaments: [],
	detail: [],
};

function rootReducer(state = initialState, action) {
	switch (action.type) {
		case "GET_DOGS":
			return {
				...state,
				dogs: action.payload,
				allDogs: action.payload,
			};

		case "FILTER_BY_WEIGHT":
			let weightFiltered = [...state.dogs];
			if (action.payload === "LightWeight") {
				weightFiltered.sort((a, b) => {
					return (
						parseInt(a.weight) -
						parseInt(b.weight)
					);
				});
			}
			if (action.payload === "HeavyWeight") {
				weightFiltered.sort((a, b) => {
					return (
						parseInt(b.weight) -
						parseInt(a.weight)
					);
				});
			}
			return {
				...state,
				dogs: weightFiltered,
			};

		case "FILTER_BY_TEMPERAMENT":
			const allDogs3 = state.allDogs;
			const tempDogs = allDogs3.filter((dog) => {
				if (dog.temperaments) {
					const temperament =
						dog.temperaments.map(
							(dog) => dog.name
						);
					return temperament.includes(
						action.payload
					);
				}
				if (dog.temperament) {
					return dog.temperament.includes(
						action.payload
					);
				}
				return null;
			});

			return {
				...state,
				dogs:
					action.payload === "Temps"
						? allDogs3
						: tempDogs,
			};

		case "FILTER_BY_CREATED":
			const allDogs2 = state.allDogs;
			const createdFilter =
				action.payload === "AllDogs"
					? allDogs2
					: allDogs2.filter((e) => {
							if (
								action.payload ===
								"Created"
							) {
								if (
									e.createdInDB
								) {
									return e;
								}
							} else if (
								action.payload ===
								"Api"
							) {
								if (
									!e.createdInDB
								) {
									return e;
								}
							}
					  });
			return {
				...state,
				dogs: createdFilter,
			};

		case "FILTER_BY_NAME":
			const dogsSorted =
				action.payload === "Asc"
					? state.dogs.sort(function (a, b) {
							if (a.name > b.name) {
								return 1;
							}
							if (b.name > a.name) {
								return -1;
							}
							return 0;
					  })
					: state.dogs.sort(function (a, b) {
							if (a.name > b.name) {
								return -1;
							}
							if (b.name > a.name) {
								return 1;
							}
							return 0;
					  });
			return {
				...state,
				dogs: dogsSorted,
			};
		case "GET_DOG_BY_NAME":
			return {
				...state,
				dogs: action.payload,
			};
		case "POST_DOG":
			return {
				...state,
			};
		case "GET_TEMPERAMENT":
			return {
				...state,
				temperaments: action.payload,
			};
		case "GET_DETAIL":
			return {
				...state,
				detail: action.payload,
			};
		default:
			return state;
	}
}

export default rootReducer;
