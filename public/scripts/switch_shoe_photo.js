window.addEventListener('load', () => {
	const page = document.querySelector(".shoe-catalog");
	const shoes = page.querySelectorAll(".shoe-card");

	shoes.forEach(shoe => {
		const images = shoe.querySelectorAll(".shoe-img");
		const colors = shoe.querySelectorAll(".shoe-color");
		// const sizes = shoe.querySelectorAll(".shoe-sizes");

		images[0].classList.remove("hidden");

		colors.forEach(color => {
			if (color.id === images[0].id) {
				color.classList.add("highlight");

				// if (sizes[0].id === color.id + "-size") {
				// 	sizes[0].classList.remove("hidden");
				// }
			}

			color.addEventListener("mouseover", (event) => {
				event.preventDefault();

				colors.forEach(option => {
					if (option.id === color.id) {
						option.classList.add("highlight");
					} else {
						option.classList.remove("highlight");
					}
				});

				images.forEach(image => {
					if (image.id === color.id) {
						image.classList.remove("hidden");
					} else {
						image.classList.add("hidden");
					}
				});

				// sizes.forEach(size => {
				// 	if (size.id === color.id + "-size") {
				// 		size.classList.remove("hidden");
				// 	} else {
				// 		size.classList.add("hidden");
				// 	}
				// });
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