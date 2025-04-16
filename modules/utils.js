/// <reference path="../types.js" />
/// <reference path="./card.js" />

import { Card, CardCollection } from "./card.js";

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
 * @returns {Promise<CardCollection>}
 */
async function generateCardObjects() {
	const cardsAsJSON = await fetchCardsJSON("./static/cards.json");

	console.log(`Type: ${typeof cardsAsJSON}`);
	console.log(cardsAsJSON);
	const cardObjects = cardsAsJSON.card_data.map((card) => new Card(card));
	return new CardCollection(cardObjects);
}

/**
 * Function to populate the page with card elements, with any specefied filters/sorts/etc.
 * @param {Object<string>|null} orgSpec - Object that specifies how to organize the data, if at all
 * @return {void}
 */
export async function populateCardElements(orgSpec) {
	// Dynamically insert card content
	if (orgSpec) {
		return;
	}

	const cardCollection = await generateCardObjects();

	// Get content area for cards, and clear existing elements
	/** @type {HTMLDivElement} */
	const cardContainer = /** @type {HTMLDivElement} */ (
		document.getElementById("card-container")
	);
	if (!cardContainer) {
		throw new Error("Unable to select 'card-container' div");
	}

	// Get template element
	/** @type {HTMLDivElement} */
	const templateCard = /** @type {HTMLDivElement} */ (
		document.querySelector(".card")
	);
	if (!templateCard) {
		throw new Error("Unable to select card template");
	}

	// Empty document fragment to be our payload for this data
	const payload = document.createDocumentFragment();

	cardContainer.innerHTML = "";
	// Render elements for each card object
	for (const cardObject of cardCollection.cards) {
		const renderedCard = cardObject.render(templateCard);

		payload.appendChild(renderedCard);
	}

	cardContainer.appendChild(payload);
}

