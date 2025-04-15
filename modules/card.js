/**
 * @fileOverview Module for Card objects and applicable methods that act on them
 * @module card
 */

/**
 * Represents a card element within the catalogue
 * @class
 */
export class Card {
	/**
	 * Constructor method for Card objects
	 * @constructor
	 * @param {Object} cardData - JSON Object containing the card data TODO: Create typedef with the json object structure
	 */
	constructor(cardData) {
		// TODO: Use camel case instead of snake case ;)
		const { title, flavor_text, image_url, mtg_meta, scryfall_meta } = jsonData;

		/**
		 * Title of the card.
		 * @type {!string}
		 */
		this.title = title;

		/**
		 * Flavor text on the card, if any, given this specific printing.
		 * @type  {?string}
		 */
		this.flavor_text = flavor_text;

		/**
		 * Url to an image for the art of this card.
		 * @type {!string}
		 */
		this.image_url = image_url;

		/**
		 * Metadata regarding this cards rulings/properties as an MTG card
		 * @type {?Array<Object>}
		 */
		this.mtg_meta = mtg_meta;

		/**
		 * Metadata regarding the entry for this card in the Scryfall database.
		 * @type {?Array<Object>}
		 */
		this.scryfall_meta = scryfall_meta;
	}
}

/**
 * Function that accepts a card element, and updates it with the contents of a new Card object
 * @param {!Object} cardElement - The card element within the DOM to update
 * @param {!Card} cardObject - The card object to populate the element from
 * @returns {!Object}
 */
function editCardContent(cardElement, cardObject) {
	const newTitle = cardObject.title;
	const newImageURL = cardObject.image_url;

	cardElement.style.display = "block";
	cardElement.querySelector("h2").textContent = newTitle;

	const cardImage = cardElement.querySelector("img");
	cardImage.src = newImageURL;
	cardImage.alt = `Card Art - ${newTitle}`;
	console.log("new card:", newTitle, "- html: ", cardElement);

	return cardElement;
}

/**
 * Accepts a card object, and returns a DOM element as a render of the object.
 * @param {!Card} cardObject - A well-formed Card object
 * @returns {!Object}
 */
function renderCard(cardObject) {
	// Copy an existing card as a template, and populate it with the data from the cardObject
	// HACK: This is gonna cause problems with updates if we rely on this function.. probably?
	const templateCard = document.querySelector(".card").cloneNode(true);
	const newCard = editCardContent(templateCard, cardObject);

	return newCard;
}

/**
 * Accepts an array of card objects, and inserts them into the DOM
 *
 * @param {Array<Object>} cardData - An array of objects
 *
 */
export function showCards(cardData) {
  // Get content area for cards, and clear existing elements
	const cardContainer = document.getElementById("card-container");
	cardContainer.innerHTML = "";

	// Empty document fragment to be our payload for this data
	const payload = document.createDocumentFragment();

	// Iterate over our card objects, assemble a card element for each one
	cardData.forEach((card) => {
    // FIX: Refactor this, accept a 'CardCollection' sort of thing... might need to update card template
		const renderedCard = renderCard(card);

		// Add card to payload
		payload.appendChild(renderedCard);
	});

	cardContainer.appendChild(payload);
}

// TODO: Enable this once we circle back on CRUD
// function removeLastCard() {
// 	titles.pop(); // Remove last item in titles array
// 	showCards(); // Call showCards again to refresh
// }
