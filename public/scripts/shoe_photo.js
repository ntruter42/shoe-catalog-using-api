window.addEventListener('load', () => {
	const shoes = document.querySelectorAll(".shoe-card");

	shoes.forEach(shoe => {
		const colors = shoe.querySelectorAll(".shoe-color");
		const images = shoe.querySelectorAll(".shoe-img");

		images[0].classList.remove("hidden");

		colors.forEach(color => {
			if (images[0].id === color.id) {
				color.classList.add("highlight");
			}

			color.addEventListener("mouseover", (event) => {
				// event.preventDefault();
				// const sizes = shoe.querySelectorAll(".shoe-size");

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
				// 	if (color.id.includes(size.id)) {
				// 		size.classList.remove("hidden");
				// 	} else {
				// 		size.classList.add("hidden");
				// 	}
				// });
			});
		});
	});
});