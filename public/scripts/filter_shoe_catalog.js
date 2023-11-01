window.addEventListener('load', () => {
	const page = document.querySelector(`.shoe-catalog`);
	const shoes = page.querySelectorAll(`.shoe-card`);
	const filters = [`brands`, `colors`, `sizes`];
	const checkboxes = {};
	const checked = {
		brands: [],
		colors: [],
		sizes: []
	};

	filters.forEach(filter => {
		checkboxes[filter] = Array.from(document.getElementsByName(filter));

		checkboxes[filter].forEach(checkbox => {
			checkbox.addEventListener(`click`, () => {
				const checkedElements = Array.from(document.getElementsByName(filter)).filter(box => box.checked === true) || [];
				checked[filter] = checkedElements.map(box => box.value);

				shoes.forEach(shoe => {
					let includeShoe = false;

					const details = {
						brands: Array.from(shoe.querySelectorAll(`.shoe-brand`)),
						colors: Array.from(shoe.querySelectorAll(`.shoe-color`)),
						sizes: Array.from(shoe.querySelectorAll(`.shoe-size`))
					}

					if ((details.brands.map(brand => brand.id).some(id => checked.brands.includes(id)) || checked.brands.length === 0)
						&& (details.colors.map(color => color.id).some(id => checked.colors.includes(id)) || checked.colors.length === 0)
						&& (details.sizes.map(size => size.id).some(id => checked.sizes.includes(id)) || checked.sizes.length === 0)) {
						includeShoe = true;
					}

					if (includeShoe) {
						shoe.classList.remove("hidden");
					} else {
						shoe.classList.add("hidden");
					}
				});
			})
		});
	});

	// filters.forEach(filter => {
	// 	filter.addEventListener("change", () => {
	// 		const shoes = page.querySelectorAll(".shoe-card");
	// 		const checked = Array.from(filters).filter(checkbox => checkbox.checked);

	// 		shoes.forEach(shoe => {
	// 			console.log(checked.length);
	// 			if (checked.length > 0) {
	// 				shoe.classList.add("hidden");
	// 			} else {
	// 				shoe.classList.remove("hidden");
	// 			}

	// 			checked.forEach(check => {
	// 				if (shoe.id.toLowerCase().includes(check.value.toLowerCase())) {
	// 					shoe.classList.remove("hidden");
	// 				}
	// 			});
	// 		});
	// 	});
	// });
});