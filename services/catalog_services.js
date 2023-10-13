export default function Shoe_Catalog() {
	const process_catalog_data = (shoes) => {
		const shoe_data = [];

		for (const shoe of shoes) {
			const colors = {};

			for (const variant of shoe.variants) {
				if (!Object.keys(colors).includes(variant.color)) {
					colors[variant.color] = [variant.size];
				} else {
					colors[variant.color].push(variant.size);
				}
			}

			for (const sizes in colors) {
				colors[sizes].sort((a, b) => a - b);
			}

			const processed_data = {
				shoe_id: shoe.shoe_id,
				brand: shoe.brand,
				model: shoe.model,
				price: shoe.price,
				colors: Object.keys(colors),
				sizes: colors,
				photos: shoe.photos,
			};

			shoe_data.push(processed_data);
		}

		return shoe_data;
	};

	const process_shoe_data = (shoe) => {
		const colors = [];
		const sizes = [];

		for (const variant of shoe.variants) {
			if (!colors.includes(variant.color)) {
				colors.push(variant.color);
			}
			if (!sizes.includes(variant.size)) {
				sizes.push(variant.size);
			}
		}

		const shoe_data = {
			shoe_id: shoe.shoe_id,
			brand: shoe.brand,
			model: shoe.model,
			price: shoe.price,
			colors: colors.sort(),
			sizes: sizes.sort((a, b) => { return a - b }),
			photos: shoe.photos,
		};

		return shoe_data;
	};

	return {
		process_catalog_data,
		process_shoe_data
	};
}