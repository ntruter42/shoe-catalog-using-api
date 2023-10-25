window.addEventListener('load', () => {
	const page = document.querySelector(".shoe-page");
	const shoes = page.querySelectorAll(".shoe-card");
	const addToCart = page.querySelector("button[id=add-to-cart]");

	// Loop through each shoe card in the catalog
	shoes.forEach(shoe => {
		// Gather relevant DOM elements
		const images = shoe.querySelectorAll(".shoe-img");
		const colors = shoe.querySelectorAll(".shoe-color");
		const color_sizes = shoe.querySelectorAll(".shoe-color-sizes");
		const sizes = shoe.querySelectorAll(".shoe-size");

		sizes.forEach(size => {
			size.addEventListener("click", () => {
				sizes.forEach(option => {
					if (option.id === size.id) {
						option.classList.add("highlight");
					} else {
						option.classList.remove("highlight");
					}
				});
			});
		});

		// Display first image of shoe (sorting handled in before render)
		images[0].classList.remove("hidden");

		// Loop through each color of shoe
		colors.forEach(color => {
			// Highlight color name corresponding with first image
			if (color.id === images[0].id) {
				color.classList.add("highlight");

				// Show sizes for highlighted color (sizes id's are color name with "-size" suffix)
				if (color_sizes[0].id === color.id + "-size") {
					color_sizes[0].classList.remove("hidden");
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
				color_sizes.forEach(size => {
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

	addToCart.addEventListener("click", () => {
		const shoe_id = page.querySelector(".shoe-card").id;
		const selectedColor = page.querySelector(".shoe-color.highlight").id;
		const selectedSize = page.querySelector(".shoe-size.highlight").id;
		const selection = { color: selectedColor, size: selectedSize };
		// console.log(selection);

		fetch(`http://localhost:3000/shoe/${shoe_id}`, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(selection),
		})
	});
});