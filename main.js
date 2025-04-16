/// <reference path="./types.js" />
/// <reference path="./modules/card.js" />

import { populateCardElements } from "./modules/utils.js";
import { handleSort, handleColorFilter, handleTypeFilter, clearFilters } from "./modules/handlers.js";

/**
 * Function to attach the appropriate event listeners/handlers to the page controls
 * @return {Promise<void>}
 */
async function attachEventListeners() {
	document.getElementById("sort-select").addEventListener("change", handleSort);

	document
		.getElementById("filter-color-group")
		.addEventListener("change", handleColorFilter);

	document
		.getElementById("filter-type")
		.addEventListener("input", handleTypeFilter);

	document.getElementById("filter-cmc").addEventListener("input", handleFilter);

	document
		.getElementById("clear-filters")
		.addEventListener("click", clearFilters);
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
