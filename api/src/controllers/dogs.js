const { API_KEY } = process.env;
const axios = require("axios");
const { Dog, Temperament } = require("../db");

const getApiDogs = async () => {
	const apiDogsUrl = await axios.get(
		`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
	);
	const apiDogs = await apiDogsUrl.data.map((dog) => {
		return {
			name: dog.name,
			id: dog.id,
			image: dog.image.url,
			temperament: dog.temperament,
			weight: dog.weight.metric,
			height: dog.height.metric,
			life_span: dog.life_span,
		};
	});
	return apiDogs;
};

const getDbDogs = async () => {
	return await Dog.findAll({
		include: {
			model: Temperament,
			attributes: ["name"],
			through: {
				attributes: [],
			},
		},
	});
};

const getAllDogs = async () => {
	const apiDogs = await getApiDogs();
	const dbDogs = await getDbDogs();
	return apiDogs.concat(dbDogs);
};

module.exports = {
	getAllDogs,
};
