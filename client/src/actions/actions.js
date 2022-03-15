import axios from "axios"; // PASAR A AXIOS

// export const getDogs = () => (dispatch) => {
// 	return fetch("http://localhost:3001/dogs")
// 		.then((response) => response.json())
// 		.then((json) => {
// 			dispatch({
// 				type: "GET_DOGS",
// 				payload: json,
// 			});
// 		});
// };

export const getDogs = () => (dispatch) => {
	return axios.get("http://localhost:3001/dogs").then(({ data }) => {
		dispatch({
			type: "GET_DOGS",
			payload: data,
		});
	});
};

export const getDogByName = (name) => (dispatch) => {
	return axios
		.get(`http://localhost:3001/dogs?name=${name}`)
		.then(({ data }) => {
			dispatch({
				type: "GET_DOG_BY_NAME",
				payload: data,
			});
		});
};

export const getDogTemperament = () => (dispatch) => {
	return axios
		.get("http://localhost:3001/temperament")
		.then(({ data }) => {
			dispatch({
				type: "GET_TEMPERAMENT",
				payload: data,
			});
		});
};

export const getDetail = (id) => (dispatch) => {
	return axios
		.get(`http://localhost:3001/dogs/${id}`)
		.then(({ data }) => {
			dispatch({
				type: "GET_DETAIL",
				payload: data,
			});
		});
};

export const createBreed = (payload) => () => {
	return axios.post("http://localhost:3001/dog", payload);
};

export const filterByWeight = (payload) => {
	return {
		type: "FILTER_BY_WEIGHT",
		payload,
	};
};

export const filterByCreated = (payload) => {
	return {
		type: "FILTER_BY_CREATED",
		payload,
	};
};

export const filterByName = (payload) => {
	return {
		type: "FILTER_BY_NAME",
		payload,
	};
};

export const filterByTemperament = (payload) => {
	return {
		type: "FILTER_BY_TEMPERAMENT",
		payload,
	};
};
