import { showCards } from "./modules/card.js";
import { quoteAlert } from "./modules/alerts.js";

/**
 * Entrypoint for our JS logic, loaded as a module into <HEAD>
 */

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

function setListeners() {
  document.addEventListener()
}

function main() {
	console.log("Entered main, commencing misson...");

	// Dynamically insert card content
	fetchCardsJSON("./static/cards.json")
		.then((data) => {
			showCards(data.card_data);
		})
		.catch((error) => {
			console.error("Error while fetching card data: ", error);
		});

  // TODO: Add listeners module, or some other means of seperating concerns and bulk init of listeners
  quoteAlert();
}

// This calls main() function when the doc has loaded
document.addEventListener("DOMContentLoaded", () => {
	main();
});
