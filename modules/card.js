// export class Card {}

/**
 * Accepts an array of card objects, and inserts them into the DOM
 *
 * @param {Array<Object>} cardData - An array of objects
 *
 */
export function showCards(cardData) {
	const cardContainer = document.getElementById("card-container");
	cardContainer.innerHTML = "";
	const templateCard = document.querySelector(".card");

	// Empty document fragment to be our payload for this data
	const payload = document.createDocumentFragment();

	// Iterate over our card objects, assemble a card element for each one
	cardData.forEach((card) => {
		const title = card.title;
		const imageURL = card.image_url;

		// Clone the template element, add details for this card
		const nextCard = templateCard.cloneNode(true); // Copy the template card
		editCardContent(nextCard, title, imageURL); // Edit title and image

		// Add card to payload
		payload.appendChild(nextCard);
	});

	cardContainer.appendChild(payload);
}

function editCardContent(card, newTitle, newImageURL) {
	card.style.display = "block";

	const cardHeader = card.querySelector("h2");
	cardHeader.textContent = newTitle;

	const cardImage = card.querySelector("img");
	cardImage.src = newImageURL;
	cardImage.alt = newTitle + " Poster";
	console.log("new card:", newTitle, "- html: ", card);
}

// TODO: Enable this once we circle back on CRUD
// function removeLastCard() {
// 	titles.pop(); // Remove last item in titles array
// 	showCards(); // Call showCards again to refresh
// }
