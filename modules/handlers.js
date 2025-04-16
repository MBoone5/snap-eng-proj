/// <reference path="../types.js" />
/// <reference path="./card.js" />

import { populateCardElements } from "./utils.js";

// Basic variables to use as some sort of statefulness
let currentSortOpt = null;
let currentFilterOpt = null;

/**
 *
 * @param {Event} event
 */
export const handleSort = (event) => {
	currentSortOpt = { option: event.target.value };

	populateCardElements({ sort: currentSortOpt, filter: currentFilterOpt });
};

/**
 *
 * @param {Event} event
 */
export const handleColorFilter = (event) => {
	const checkboxElements = event.target.parentElement.parentElement.querySelectorAll("input:checked");
	const selectedColors = Array.from(checkboxElements).map((box) => box.value);

	currentFilterOpt = {
		field: "color",
		value: selectedColors,
	};

	populateCardElements({ sort: currentSortOpt, filter: currentFilterOpt });
};

/**
 *
 * @param {Event} event
 */
export const handleTypeFilter = (event) => {
	return;
};

/**
 *
 * @param {Event} event
 */
export const handleCMCFilter = (event) => {
	return;
};

/**
 *
 * @param {Event} event
 */
export const clearFilters = (event) => {
	currentSortOpt = null;
	currentFilterOpt = null;

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
