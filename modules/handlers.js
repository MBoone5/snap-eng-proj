/// <reference path="../types.js" />
/// <reference path="./card.js" />

import { populateCardElements } from "./utils.js"

/**
 *
 * @param {Event} event
 */
export const handleSort = (event) => {
  const sortSpec = { "option": event.target.value };
  populateCardElements(sortSpec);
}

/**
 *
 * @param {Event} event
 */
export const handleFilter = (event) => {
  const filterSpec = {
    "field": "color",
    "value": event.target.value,
  }

  populateCardElements(null, filterSpec);
}

/**
 *
 * @param {Event} event
 */
export const clearFilters = (event) => {
  document.querySelector("#sort-select").value = "alphabetical";
  document.querySelector("#filter-color").value = "";
  populateCardElements();
}

/**
 *
 * @param {Event} event
 */
export const handleCreateCard = (event) => {
  console.log(`Event handled - handleCreateCard: ${event.target.value}`);
}

/**
 *
 * @param {Event} event
 */
export const handleDeleteCard = (event) => {
  console.log(`Event handled - handleDeleteCard: ${event.target.value}`);
}

