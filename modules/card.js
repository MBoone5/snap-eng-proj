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
	 * @param {!CardJSON} cardJSON - JSON Object containing the card data
	 */
	constructor(cardJSON) {
		const { title, flavor_text, image_url, mtg_meta, scryfall_meta } = cardJSON;

    /**
     * ID of this card and the specific printing, within the scryfall DB
     * @type {!string}
     */
    this.id = scryfall_meta.oracle_id;

    /**
     * URL for the scryfall page for this card
     * @type {!string}
     */
    this.scryfallURL = scryfall_meta.scryfall_uri;

		/**
		 * Title of this card.
		 * @type {!string}
		 */
		this.title = title;

		/**
		 * Flavor text on this card, if any, given this specific printing.
		 * @type  {?string}
		 */
		this.flavorText = flavor_text;

		/**
		 * Url to an image for the art of this card.
		 * @type {!string}
		 */
		this.imageURL = image_url;

		/**
		 * String containing the typeline of this card's oracle text
		 * @type {!string}
		 */
		this.type = mtg_meta.type;
    
		/**
		 * Array of strings that denote the color identity of this card (e.g. "U" for blue, "W" for white, etc.)
		 * @type {?Array<string>}
		 */
		this.colors = mtg_meta.colors;
    
		/**
		 * String containing the mana cost of this card (e.g. "{3}{W}{B}, {2}, etc.")
		 * @type {?string}
		 */
		this.manaCost = mtg_meta.mana_cost;

		/**
		 * Numeric value for the total mana paid for the mana cost of this card 
		 * @type {!number}
		 */
		this.convertedManaCost = mtg_meta.cmc;
	}

  /**
   * Maps the color identity of a card to the corresponding mana icons as icon elements
   * return {!Array<string>}
   */
  getManaIcons() {
    const iconTemplate = "<i class='ms ms-cost ms-${icon}'></i>";

    // early check for colorless
    if (this.colors.length === 0) {
      return [iconTemplate.replace("${icon}", "c")];
    }
    
    const iconsList = this.colors.map((color) => iconTemplate.replace("${icon}", color.toLowerCase()));

    return iconsList
  }

  /**
   * Generates a DOM element out of this card object 
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
    renderMeta.querySelector("#type").textContent = this.type;

    if (this.flavorText) {
      const flavorTextHeader = renderMeta.querySelector("#flavor");
      flavorTextHeader.textContent = this.flavorText;
      flavorTextHeader.style.display = "block";
    }

    const colorIcons = this.getManaIcons().join("");
    renderMeta.querySelector("#color-info").innerHTML = colorIcons;
    renderMeta.querySelector("#scryfall-link>a").href = this.scryfallURL;

	  // console.log("new card:", renderTitle, "- html: ", render);

    return render 
  }
}

/**
 * Accepts an array of card objects, and inserts them into the DOM
 *
 * @param {!CardCollection} cardCollection - An array of Card objects, to be rendered into the DOM
 *
 */
export function showCards(cardCollection) {
  // Get content area for cards, and clear existing elements
	const cardContainer = document.getElementById("card-container");
	cardContainer.innerHTML = "";

  // Get template element
	const templateCard = document.querySelector(".card");
	
  // Empty document fragment to be our payload for this data
	const payload = document.createDocumentFragment();

  // Render elements for each card object
  // FIX: Error msg caught in promise --> "TypeError: cardCollection is not iterable"
  for (const cardObject of cardCollection) {
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
