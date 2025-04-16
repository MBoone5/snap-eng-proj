/// <reference path="../types.js" />
/// <reference path="./card.js" />

/**
 *
 * @param {Event} event
 */
export const handleSort = (event) => {
  console.log(`Event handled - handleSort: ${event.target.value}`);
}

/**
 *
 * @param {Event} event
 */
export const handleFilter = (event) => {
  console.log(`Event handled - handleSort: ${event.target.value}`);
}

/**
 *
 * @param {Event} event
 */
export const clearFilters = (event) => {
  console.log(`Event handled - clearFilters: ${event.target.value}`);
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

