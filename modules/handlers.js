/// <reference path="../types.js" />
/// <reference path="./card.js" />

import { populateCardElements } from "./utils.js";

/**
 *
 * @param {Event} event
 */
export const handleSort = (event) => {
	const sortOpt = { option: event.target.value };
	const orgSpec = { sortOpt: sortOpt };

	populateCardElements(orgSpec);
};

/**
 *
 * @param {Event} event
 */
export const handleFilter = (event) => {
	const filterOpt = {
		field: "color",
		value: event.target.value,
	};

	const orgSpec = { filterOpt: filterOpt };

	populateCardElements(orgSpec);
};

/**
 *
 * @param {Event} event
 */
export const clearFilters = (event) => {
	document.querySelector("#sort-select").value = "alphabetical";
	document.querySelector("#filter-color").value = "";
	populateCardElements();
};

/**
 *
 * @param {Event} event
 */
export const handleCreateCard = (event) => {
	console.log(`Event handled - handleCreateCard: ${event.target.value}`);
};

/**
 *
 * @param {Event} event
 */
export const handleDeleteCard = (event) => {
	console.log(`Event handled - handleDeleteCard: ${event.target.value}`);
};
