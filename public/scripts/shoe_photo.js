window.addEventListener('load', () => {
	const shoes = document.querySelectorAll(".shoe-card");

	shoes.forEach(shoe => {
		const colors = shoe.querySelectorAll(".shoe-color");

		colors.forEach(color => {
			color.addEventListener("mouseover", (event) => {
				// event.preventDefault();
				const images = shoe.querySelectorAll(".shoe-img");
				
				images.forEach(image => {
					if (image.id === color.id) {
						image.classList.remove("hidden");
					} else {
						image.classList.add("hidden");
					}
				});
			});
		});
	});
});