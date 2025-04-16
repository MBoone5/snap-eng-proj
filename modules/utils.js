/// <reference path="../types.js" />
/// <reference path="./card.js" />

import { Card, CardCollection } from "./card.js";

/**
 * @typdef {Object} OrgSpec
 * @property {SortOpt} sortOpt
 * @property {FilterOpt} filterOpt
 */

/**
 * Function to fetch our static card data
 *
 * @param {string} dataPath - Path to our card data
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
 * Function to apply specified sort options to the given cardCollection
 * @param {SortOpt} sortOpt - string value to specify sort
 * @param {CardCollection} cardCollection - string value to specify sort
 * @return {CardCollection}
 */
function applySort(sortOpt, cardCollection) {
	if (Object.keys(sortOpt).length <= 0) {
		throw new Error("Attempting to sort without providing a sort option");
	}

	return cardCollection.sortBy(sortOpt);
}

/**
 * Function to apply specified sort options to the given cardCollection
 * @param {FilterOpt} filterOpt - string value to specify sort
 * @param {CardCollection} cardCollection - string value to specify sort
 * @return {CardCollection}
 */
function applyFilter(filterOpt, cardCollection) {
	if (Object.keys(filterOpt).length <= 0) {
		throw new Error("Attempting to sort without providing a sort option");
	}

	return cardCollection.filterBy(filterOpt.field, filterOpt.value);
}

/**
 * Function to populate the page with card elements, with any specefied filters/sorts/etc.
 * @param {OrgSpec|null} [orgSpec=null] - Object holding the sort (SortOpt) and filter options (FilterOpt)
 * @return {Promise<void>}
 */
export async function populateCardElements(orgSpec) {
	let cardCollection = await generateCardObjects();

  if (orgSpec) {
    // If filter is specified, apply it to the collection
    if (orgSpec.filterOpt) {
      cardCollection = applyFilter(orgSpec.filterOpt, cardCollection);
    }

    // If sort is specified, apply it to the collection
    if (orgSpec.sortOpt) {
      cardCollection = applySort(orgSpec.sortOpt, cardCollection);
    }

  }
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
