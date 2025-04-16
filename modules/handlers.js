/// <reference path="../types.js" />
/// <reference path="./card.js" />

import { populateCardElements } from "./utils.js";

// Basic variables to use as some sort of statefulness
let currentSortOpt = null;
let currentFilterOpt = null;
const checkboxGroup = document.getElementById("filter-color-group");

/**
 *
 */
const clearFilters = () => {
	currentSortOpt = null;
	currentFilterOpt = null;
  const checkboxElements = checkboxGroup.querySelectorAll("input:checked"); // NOTE: this is a NodeList, not an Array

  for (const checkbox of checkboxElements) {
    checkbox.checked = false;
  }
};

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
  const checkboxElements = checkboxGroup.querySelectorAll("input:checked"); // NOTE: this is a NodeList, not an Array
	const selectedColors = Array.from(checkboxElements).map((box) => box.value);

  if (selectedColors.length > 0) {
    currentFilterOpt = {
      field: "color",
      value: selectedColors,
    };
  } 

  if (selectedColors.length === 0) {
    currentFilterOpt = null;
  }

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
export const handleClearFilters = (event) => {
	clearFilters();
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
