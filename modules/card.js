/// <reference path="../types.js" />

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
	 * @param {CardJSON} cardJSON - JSON Object containing the card data
	 */
	constructor(cardJSON) {
		const { title, flavor_text, image_url, mtg_meta, scryfall_meta } = cardJSON;

		/**
		 * ID of this card and the specific printing, within the scryfall DB
		 * @type {string}
		 */
		this.id = scryfall_meta.oracle_id;

		/**
		 * URL for the scryfall page for this card
		 * @type {string}
		 */
		this.scryfallURL = scryfall_meta.scryfall_uri;

		/**
		 * Title of this card.
		 * @type {string}
		 */
		this.title = title;

		/**
		 * Flavor text on this card, if any, given this specific printing.
		 * @type  {string|null}
		 */
		this.flavorText = flavor_text;

		/**
		 * Url to an image for the art of this card.
		 * @type {string}
		 */
		this.imageURL = image_url;

		/**
		 * String containing the typeline of this card's oracle text
		 * @type {string}
		 */
		this.type = mtg_meta.type;

		/**
		 * Array of strings that denote the color identity of this card (e.g. "U" for blue, "W" for white, etc.)
		 * @type {string[]}
		 */
		this.colors = mtg_meta.colors;

		/**
		 * String containing the mana cost of this card (e.g. "{3}{W}{B}, {2}, etc.")
		 * @type {string}
		 */
		this.manaCost = mtg_meta.mana_cost;

		/**
		 * Numeric value for the total mana paid for the mana cost of this card
		 * @type {number}
		 */
		this.convertedManaCost = mtg_meta.cmc;
	}

	/**
	 * Maps the color identity of a card to the corresponding mana icons as icon elements
	 * return {Array<string>}
	 */
	getManaIcons() {
		const iconTemplate = "<i class='ms ms-cost ms-${icon}'></i>";

		// early check for colorless
		if (!this.colors) {
			throw new Error(`Colors not set on card: ${this.title}`);
		}
		if (this.colors && this.colors.length === 0) {
			return [iconTemplate.replace("${icon}", "c")];
		}

		const iconsList = this.colors.map((color) =>
			iconTemplate.replace("${icon}", color.toLowerCase()),
		);

		return iconsList;
	}

	/**
	 * Generates a DOM element out of this card object
	 * @param {Element} template - a DOM card element to use as a template
	 * @return {HTMLDivElement}
	 */
	render(template) {
		/** @type {HTMLDivElement} */
		const render = /** @type {HTMLDivElement} */ (template.cloneNode(true));

		/** @type {HTMLHeadingElement} */
		const renderTitle = /** @type {HTMLHeadingElement} */ (
			render.querySelector("h2")
		);
		if (!renderTitle) {
			throw new Error("Template element missing 'title' element");
		}

		/** @type {HTMLImageElement} */
		const renderImage = /** @type {HTMLImageElement} */ (
			render.querySelector("img")
		);
		if (!renderImage) {
			throw new Error("Template element missing 'image' element");
		}

		/** @type {HTMLLIElement} */
		const renderType = /** @type {HTMLLIElement} */ (
			render.querySelector("#type")
		);
		if (!renderType) {
			throw new Error("Template element missing '#type' element");
		}

		/** @type {HTMLHeadingElement} */
		const renderFlavor = /** @type {HTMLHeadingElement} */ (
			render.querySelector("#flavor")
		);
		if (!renderFlavor) {
			throw new Error("Template element missing '#flavor' element");
		}

		/** @type {HTMLLIElement} */
		const renderColors = /** @type {HTMLLIElement} */ (
			render.querySelector("#color-info")
		);
		if (!renderColors) {
			throw new Error("Template element missing '#color-info' element");
		}

		/** @type {HTMLAnchorElement} */
		const renderScryfallURL = /** @type {HTMLAnchorElement} */ (
			render.querySelector("#scryfall-link")
		);
		if (!renderScryfallURL) {
			throw new Error("Template element missing 'scryfall-url' element");
		}

		render.style.display = "block"; // Force block display to unhide template element

		// Populate new element with card data
		renderTitle.textContent = this.title;
		renderImage.src = this.imageURL;
		renderImage.alt = `Card Art - ${this.title}`;
		renderType.textContent = this.type;

		if (this.flavorText) {
			renderFlavor.textContent = this.flavorText;
			renderFlavor.style.display = "block";
		}

		const colorIcons = this.getManaIcons().join("");
		renderColors.innerHTML = colorIcons;
		renderScryfallURL.href = this.scryfallURL;

		// console.log("new card:", renderTitle, "- html: ", render);

		return render;
	}
}

/**
 * Represent a collection of card objects, enabling sort/field/etc. prior to rendering
 * @class
 */
export class CardCollection {
	/**
	 * Enum field for the search/sort fields to catagorize cards
	 * @readonly
	 * @enum {string}
	 */
	static filterFields = {
		COLOR: "color",
		CMC: "cmc", // Card.convertedManaCost
		TYPE: "type",
	};

	static colors = ["W", "U", "B", "R", "G"];
	/**
	 * Constructor function for a new CardCollection
	 * @param {Array<Card>} primitiveCardList - A primitive array (i.e. explicitly NOT a CardColection) of Card objects
	 */
	constructor(primitiveCardList) {
		const cards = primitiveCardList;

		/**
		 * The actual list of cards that this collection encapsulates
		 * @type {Array<Card>}
		 */
		this.cards = cards;

		/**
		 * Set a default priority for sorting/filtering by color
		 * @type {Array<string>}
		 */
		this.colorPriority = CardCollection.colors;
	}

	/**
	 * Internal method to sort color values
	 * @param {string} newPriorityColor - The color to prioritize instead of the default
	 * @return {void}
	 */
	updateColorPriority(newPriorityColor) {
		const existingPriority = this.colorPriority;
		const newColor = newPriorityColor.toUpperCase();
		if (!CardCollection.colors.includes(newColor)) {
			throw new Error(
				`Color selection '${newPriorityColor}' is not a valid selection`,
			);
		}

		// Check if we need to shift priority at all
		if (existingPriority[0] === newColor) {
			return; // exit early, no operation needed
		}

		const indexOfNewColor = existingPriority.indexOf(newColor);
		const newPriority = existingPriority
			.slice(indexOfNewColor)
			.concat(existingPriority.slice(0, indexOfNewColor)); // Shifts everything over, preserving basic order

		this.colorPriority = newPriority;
	}

	/**
	 * Sorts the collection by the specified sort option
	 * @param {SortOpt} sortOpt - String identifier for a sort option
	 * @return {CardCollection}
	 */
	sortBy(sortOpt) {
		// Early check to prevent null options
		if (!sortOpt) {
			throw new Error("Attempting to sort without specifying a sort option");
		}

		if (sortOpt.option === "color") {
			this.sortCollectionByColor();
      return this;
		}

		if (sortOpt.option === "cmc") {
			this.sortCollectionByCMC();
      return this;
		}

		if (sortOpt.option === "alphabetical") {
			this.sortCollectionAlphabetically();
      return this;
		}
	}

	/**
	 * sorts the collection by the specified color, and returns a new collection
	 * @return {void}
	 */
	// FIX: THIS ONLY WORKS BASED ON THE FIRST COLOR OF THE OBJECT
	// FIX: Need to handle null colors/colorless
	sortCollectionByColor() {
		const cardsCopy = this.cards.slice();

		const cardsSorted = cardsCopy.sort((a, b) => {
			const colorAIndex = this.colorPriority.indexOf(a.colors[0]);
			const colorBIndex = this.colorPriority.indexOf(b.colors[0]);

			return colorAIndex - colorBIndex;
		});

		this.cards = cardsSorted;
	}
	/**
	 * sorts the collection by converted mana cost
	 * @return {void}
	 */
	sortCollectionByCMC() {
		const cardsCopy = this.cards.slice();

		const cardsSorted = cardsCopy.sort((a, b) => {
			return a.convertedManaCost - b.convertedManaCost;
		});

		this.cards = cardsSorted;
	}

	/**
	 * sorts the collection by alphabetically
	 * @return {void}
	 */
	sortCollectionAlphabetically() {
		const cardsCopy = this.cards.slice();

		const cardsSorted = cardsCopy.sort((a, b) => {
			// If card a's title is alphabetically before card b's title
			if (a.title < b.title) {
				return -1;
			}

			// If card a's title is alphabetically after card b's title
			if (a.title > b.title) {
				return 1;
			}

			// In any other case, keep the items in place
			return 0;
		});

		this.cards = cardsSorted;
	}

	/**
	 * sorts the collection in its existing state, but reversed
	 * @return {CardCollection}
	 */
	sortCollectionReverse() {
		const cardsCopy = this.cards.slice();
		const cardsSorted = cardsCopy.reverse();

		return new CardCollection(cardsSorted);
	}

	/**
	 * filters the collection by a field and value.
	 * @param {string} field - The field to filter by (e.g., "color", "type", "cmc")
	 * @param {string|number} value - The value to match
	 * @return {CardCollection}
	 */
	filterBy(field, value) {
		if (!Object.values(CardCollection.filterFields).includes(field)) {
			throw new Error(`invalid filter field: ${field}`);
		}

		const cardsCopy = this.cards.slice();
		let cardsFiltered;

		if (field === "color") {
      let colorFilter = [];

      if (typeof value === "string") {
        colorFilter = value.toUpperCase().split("");
      }

      if (typeof value === "object" && Array.isArray(value)) {
        colorFilter = value.toString().toUpperCase().split(""); // REALLY jank way to uppercase this but it works ig
      }
      
      if (colorFilter.length <= 1) {
        cardsFiltered = cardsCopy.filter((card) => {
          // Return all card elements with values in card.colors that are
          return (
            Array.isArray(card.colors) &&
            colorFilter.some((color) => card.colors.includes(color))
          );
        });
      }

      if (colorFilter.length > 1) {
        cardsFiltered = cardsCopy.filter((card) => {
          // Return all card elements with values in card.colors that are
          return (
            Array.isArray(card.colors) &&
            colorFilter.every((color) => card.colors.includes(color))
          );
        });
      }

		}

		if (field === "type" && typeof value === "string") {
			cardsFiltered = cardsCopy.filter((card) => {
				// If card.type is missing, skip this card
				if (typeof card.type !== "string") return false;
				// Check if the card type contiainse the filter value
				return card.type.toLowerCase().includes(value.toLowerCase());
			});
		}

		if (field === "cmc" && typeof value === "number") {
			cardsFiltered = cardsCopy.filter((card) => {
				// If card has no CMC, skip this card
				if (typeof card.convertedManaCost !== "number") return false;
				return card.convertedManaCost === value;
			});
		}

		return new CardCollection(cardsFiltered);
	}
}

// TODO: Enable this once we circle back on CRUD
// function removeLastCard() {
// 	titles.pop(); // Remove last item in titles array
// 	showCards(); // Call showCards again to refresh
// }
