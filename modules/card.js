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
	 * @param {!Object} cardData - JSON Object containing the card data TODO: Create typedef with the json object structure
	 */
	constructor(cardData) {
		// TODO: Use camel case instead of snake case ;)
		const { title, flavor_text, image_url, mtg_meta, scryfall_meta } = cardData;

		/**
		 * Title of the card.
		 * @type {!string}
		 */
		this.title = title;

		/**
		 * Flavor text on the card, if any, given this specific printing.
		 * @type  {?string}
		 */
		this.flavorText = flavor_text;

		/**
		 * Url to an image for the art of this card.
		 * @type {!string}
		 */
		this.imageURL = image_url;

		/**
		 * Metadata regarding this cards rulings/properties as an MTG card
		 * @type {?Array<Object>}
		 */
		this.mtgMeta = mtg_meta;

		/**
		 * Metadata regarding the entry for this card in the Scryfall database.
		 * @type {?Array<Object>}
		 */
		this.scryfallMeta = scryfall_meta;
	}

  /**
   * Generates a DOM element out of the card object 
   * @param {!Object} template - a DOM card element to use as a template
   * @return {!Object}
   */
  render(template) {
    const render = template.cloneNode(true);
    const renderTitle = render.querySelector("h2");
    const renderImage = render.querySelector("img");
    const renderMeta = render.querySelector(".card-meta");

    render.style.display = "block" // Force block display in case there's been some responsive changes

    // Populate new element with card data
    renderTitle.textContent = this.title;

    renderImage.src = this.imageURL;
    renderImage.alt = `Card Art - ${this.title}`;

    // Populate meta info
    renderMeta.querySelector("#type").textContent = this.mtgMeta.type;
    renderMeta.querySelector("#flavor").textContent = this.flavorText;
    renderMeta.querySelector("#color-info").textContent = this.mtgMeta.colors;
    renderMeta.querySelector("#scryfall-link>a").href = this.scryfallMeta.scryfall_uri;

	  console.log("new card:", renderTitle, "- html: ", render);

    return render 
  }
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

  // Get template element
	const templateCard = document.querySelector(".card");
	
  // Empty document fragment to be our payload for this data
	const payload = document.createDocumentFragment();

  // Render elements for each card object
  for (const cardObject of cardData) {
    const renderedCard = cardObject.render(templateCard);
    payload.appendChild(renderedCard);
  } 

	cardContainer.appendChild(payload);
}

// TODO: Enable this once we circle back on CRUD
// function removeLastCard() {
// 	titles.pop(); // Remove last item in titles array
// 	showCards(); // Call showCards again to refresh
// }
