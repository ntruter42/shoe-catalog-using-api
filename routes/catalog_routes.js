import { Router } from "express";
import axios from "axios";

const router = Router();

router.get('/', async (req, res) => {
	try {
		const shoes = (await axios.get(`${process.env.API_URI}/api/shoes`)).data;
		const shoe_data = [];

		for (const shoe of shoes) {
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

			const processed_data = {
				shoe_id: shoe.shoe_id,
				brand: shoe.brand,
				model: shoe.model,
				price: shoe.price,
				colors: colors,
				sizes: sizes,
				photos: shoe.photos,
			};

			shoe_data.push(processed_data);
		}

		res.render('index', {
			title: "Shoe Catalog",
			shoe_data
		});
	} catch (error) {
		res.status(500).send('Error');
	}
});

export default router;