/// <reference path="./types.js" />
/// <reference path="./modules/card.js" />

import { Card, CardCollection, showCards } from "./modules/card.js";
import { fetchCardsJSON } from "./modules/utils.js";

/**
 * Function to map raw json data of cards into Card objects
 *
 * @returns {Promise<CardCollection>}
 */
async function generateCardObjects() {
	const cardsAsJSON = await fetchCardsJSON("./static/cards.json");

  console.log(`Type: ${typeof cardsAsJSON}`)
  console.log(cardsAsJSON)
	const cardObjects = cardsAsJSON.card_data.map((card) => new Card(card));
	return new CardCollection(cardObjects);
}

/**
 * Function to populate the page with card elements, with any specefied filters/sorts/etc.
 * @param {Object<string>|null} orgSpec - Object that specifies how to organize the data, if at all
 * @return {void}
 */
async function populateCardElements(orgSpec) {
	// Dynamically insert card content
  if (orgSpec) {
    return;
  }

	const cardCollection = await generateCardObjects();
	showCards(cardCollection);
}

/**
 * Function to attach the appropriate event listeners/handlers to the page controls
 * @return {void}
 */
async function attachEventListeners() {
  // Add janky listeners
  // FIX: couldn't finish in time :(
  // document.getElementById('sort-select').addEventListener('change')
  // document.getElementById('filter-color').addEventListener('change')
  // document.getElementById('filter-type').addEventListener('input')
  // document.getElementById('filter-cmc').addEventListener('input')
  // document.getElementById('clear-filters').addEventListener('click')
  return;
}

/**
 * Entrypoint for our JS logic, loaded as a module into <HEAD>
 * @return {void}
 */
function main() {
	console.log("Entered main, commencing misson...");
	populateCardElements();
  attachEventListeners();

}

// This calls main() function when the doc has loaded
document.addEventListener("DOMContentLoaded", () => {
	main();
});
