import { Router } from "express";
import axios from "axios";

const router = Router();

router.get('/', async (req, res) => {
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
			colors: colors.sort(),
			sizes: sizes.sort((a, b) => { return a - b }),
			photos: shoe.photos,
		};

		shoe_data.push(processed_data);
	}

	res.render('catalog', {
		title: "Shoe Catalog",
		shoe_data,
		variants: shoes.variants
	});
});

router.post('/shoe/:shoe_id', async (req, res) => {
	res.redirect('/shoe/' + req.params.shoe_id);
});

router.get('/shoe/:shoe_id', async (req, res) => {
	const shoe_id = req.params.shoe_id;
	const shoe = (await axios.get(`${process.env.API_URI}/api/shoes/id/` + shoe_id)).data;

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

	res.render('shoe', {
		shoe_data
	});
});

export default router;