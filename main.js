import { Card, showCards } from "./modules/card.js";
import { quoteAlert } from "./modules/alerts.js";

/**
 * Function to fetch our static card data
 *
 * @param {string} dataPath - Path to our card data
 */
function fetchCardsJSON(dataPath) {
	return fetch(dataPath).then((response) => {
		if (response.ok === false) {
			throw new Error(`Unable to fetch card data. Status: ${response.status}`);
		}
		return response.json();
	});
}

async function populateCardElements() {
	// Dynamically insert card content
	fetchCardsJSON("./static/cards.json")
		.then((data) => {
      const cardsCollection = data.card_data.map(card => new Card(card));
      showCards(cardsCollection);
		})
		.catch((error) => {
			console.error("Error while fetching card data: ", error);
		});
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
