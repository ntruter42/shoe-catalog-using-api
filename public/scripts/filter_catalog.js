window.addEventListener('load', () => {
	const page = document.querySelector(".shoe-catalog");
	const filters = document.querySelectorAll(".filter-checkbox");

	filters.forEach(filter => {
		filter.addEventListener("change", () => {
			const shoes = page.querySelectorAll(".shoe-card");
			const checked = Array.from(filters).filter(checkbox => checkbox.checked);
			
			shoes.forEach(shoe => {
				console.log(checked.length);
				if (checked.length > 0) {
					shoe.classList.add("hidden");
				} else {
					shoe.classList.remove("hidden");
				}

				checked.forEach(check => {
					if (shoe.id.toLowerCase().includes(check.value.toLowerCase())) {
						shoe.classList.remove("hidden");
					}
				});
			});
		});
	});
});