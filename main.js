/// <reference path="./types.js" />
/// <reference path="./modules/card.js" />

import { quoteAlert } from "./modules/alerts.js";
import { Card, showCards } from "./modules/card.js";

/**
 * Function to fetch our static card data
 *
 * @param {!string} dataPath - Path to our card data
 * @return {Promise<Object<string, Array<CardJSON>>>}
 */
async function fetchCardsJSON(dataPath) {
	return fetch(dataPath).then((response) => {
		if (response.ok === false) {
			throw new Error(`Unable to fetch card data. Status: ${response.status}`);
		}

		return response.json();
	});
}

/**
 * Function to map raw json data of cards into Card objects
 *
 * @returns {Promise<Array<Card>>}
 */
async function generateCardObjects() {
	const cardsAsJSON = await fetchCardsJSON("./static/cards.json");

  console.log(`Type: ${typeof cardsAsJSON}`)
  console.log(cardsAsJSON)
	const cardCollection = cardsAsJSON.card_data.map((card) => new Card(card));
	return cardCollection;
}

async function populateCardElements() {
	// Dynamically insert card content
	const cardCollection = await generateCardObjects();
	showCards(cardCollection);
}

/**
 * Entrypoint for our JS logic, loaded as a module into <HEAD>
 * @return {void}
 */
function main() {
	console.log("Entered main, commencing misson...");
	populateCardElements();

	// TODO: Add listeners module, or some other means of seperating concerns and bulk init of listeners
	quoteAlert();
}

// This calls main() function when the doc has loaded
document.addEventListener("DOMContentLoaded", () => {
	main();
});
