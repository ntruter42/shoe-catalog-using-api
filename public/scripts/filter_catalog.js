window.addEventListener('load', () => {
	const filters = document.querySelectorAll(".filter-checkbox");

	filters.forEach(filter => {
		filter.addEventListener("change", () => {
			const shoes = document.querySelectorAll(".shoe-card");
			shoes.forEach(shoe => {
				if (shoe.id.toLowerCase().includes(filter.value.toLowerCase())) {
					shoe.classList.remove("hidden");
				} else {
					shoe.classList.add("hidden");
				}
			});
		});
	});
});