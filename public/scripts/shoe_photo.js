window.addEventListener('load', () => {
	const shoes = document.querySelectorAll(".shoe-card");

	// Loop through each shoe card in the catalog
	shoes.forEach(shoe => {
		// Gather relevant DOM elements
		const images = shoe.querySelectorAll(".shoe-img");
		const colors = shoe.querySelectorAll(".shoe-color");
		const sizes = shoe.querySelectorAll(".shoe-color-sizes");

		// Display first image of shoe (sorting handled in before render)
		images[0].classList.remove("hidden");

		// Loop through each color of shoe
		colors.forEach(color => {
			// Highlight color name corresponding with first image
			if (color.id === images[0].id) {
				color.classList.add("highlight");

				// Show sizes for highlighted color (sizes id's are color name with "-size" suffix)
				if (sizes[0].id === color.id + "-size") {
					sizes[0].classList.remove("hidden");
				}
			}

			// Add event listener to color names
			color.addEventListener("click", (event) => {
				// Prevent form from being submitted
				event.preventDefault();

				// Loop through each color of shoe
				colors.forEach(option => {
					// Highlight content of clicked color
					if (option.id === color.id) {
						option.classList.add("highlight");
					} else {
						option.classList.remove("highlight");
					}
				});

				// Loop through images of shoe
				images.forEach(image => {
					// Show image with id of clicked color
					if (image.id === color.id) {
						image.classList.remove("hidden");
					} else {
						image.classList.add("hidden");
					}
				});

				// Loop through sizes for each color
				sizes.forEach(size => {
					// Show sizes with id of clicked color
					if (size.id === color.id + "-size") {
						size.classList.remove("hidden");
					} else {
						size.classList.add("hidden");
					}
				});
			});

		});
	});
});

// FOR LATER USE: remove event listener for shoe card on click of color

// color.addEventListener("click", (event) => {
// 	event.preventDefault();
// 	color.removeEventListener("mouseover", (event) => {

// 	});

// 	colors.forEach(option => {
// 		if (option.id === color.id) {
// 			option.classList.add("highlight");
// 		} else {
// 			option.classList.remove("highlight");
// 		}
// 	});

// 	images.forEach(image => {
// 		if (image.id === color.id) {
// 			image.classList.remove("hidden");
// 		} else {
// 			image.classList.add("hidden");
// 		}
// 	});
// });