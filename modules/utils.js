/// <reference path="../types.js" />
/// <reference path="./card.js" />

/**
 * Function to fetch our static card data
 *
 * @param {!string} dataPath - Path to our card data
 * @return {Promise<Object<string, Array<CardJSON>>>}
 */
export async function fetchCardsJSON(dataPath) {
	return fetch(dataPath).then((response) => {
		if (response.ok === false) {
			throw new Error(`Unable to fetch card data. Status: ${response.status}`);
		}

		return response.json();
	});
}

