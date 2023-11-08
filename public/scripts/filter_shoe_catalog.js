window.addEventListener('load', () => {
	const page = document.querySelector(`.shoe-catalog`);
	const shoes = page.querySelectorAll(`.shoe-card`);
	const filters = [`brands`, `colors`, `sizes`, `prices`];
	const checkboxes = {};
	const checked = {
		brands: [],
		colors: [],
		sizes: [],
		prices: { min: 0, max: getMaxPrice() }
	};
	document.getElementById(`price-filter-max`).value = getMaxPrice() + 1;

	function getMaxPrice() {
		const priceElements = Array.from(page.querySelectorAll('.shoe-price'));
		let maxPrice = 0;
		priceElements.forEach(priceElement => {
			const price = parseInt(priceElement.id);
			if (price > maxPrice) {
				maxPrice = price;
			}
		});
		return maxPrice;
	}

	filters.forEach(filter => {
		checkboxes[filter] = Array.from(document.getElementsByName(filter));

		checkboxes[filter].forEach(checkbox => {
			checkbox.addEventListener(`change`, () => {
				const checkedElements = Array.from(document.getElementsByName(filter)).filter(box => box.checked === true) || [];
				checked[filter] = checkedElements.map(box => box.value);
				checked.prices.min = parseInt(document.getElementById(`price-filter-min`).value);
				checked.prices.max = parseInt(document.getElementById(`price-filter-max`).value);

				shoes.forEach(shoe => {
					let includeShoe = false;

					const details = {
						brands: Array.from(shoe.querySelectorAll(`.shoe-brand`)),
						colors: Array.from(shoe.querySelectorAll(`.shoe-color`)),
						sizes: Array.from(shoe.querySelectorAll(`.shoe-size`)),
						price: parseInt(shoe.querySelector(`.shoe-price`).id)
					}

					if ((details.brands.map(brand => brand.id).some(id => checked.brands.includes(id)) || checked.brands.length === 0)
						&& (details.colors.map(color => color.id).some(id => checked.colors.some(checkedColor => id.includes(checkedColor))) || checked.colors.length === 0)
						&& (details.sizes.map(size => size.id).some(id => checked.sizes.includes(id)) || checked.sizes.length === 0)
						&& (details.price >= checked.prices.min && details.price <= checked.prices.max)) {
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
});