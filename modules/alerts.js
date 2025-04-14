/**
 * @fileOverview this module handles alerts for interactive elements
 * @module alerts
 **/

// TODO: add JSdoc for this guy
export function quoteAlert() {
	const quoteButton = document.getElementById("quote-button");

	if (quoteButton) {
		quoteButton.addEventListener("click", () => {
			console.log("Button Clicked!");
			alert(
				"I guess I can kiss heaven goodbye, because it got to be a sin to look this good!",
			);
		});
	}
}
