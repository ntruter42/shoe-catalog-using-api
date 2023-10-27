import { Router } from "express";
import axios from "axios";
// import Shoe_Catalog from "../services/catalog_services.js";

const router = Router();
// const services = Shoe_Catalog();

router.get('/', async (req, res) => {
	const shoes = (await axios.get(`${process.env.API_URI}/api/shoes`)).data.shoes;
	const filters = (await axios.get(`${process.env.API_URI}/api/shoes/filters`)).data.filters;

	res.render('catalog', {
		page: "Shop",
		shoes,
		filters,
		hostname: req.hostname
	});
});

router.get('/shoe/:shoe_id', async (req, res) => {
	const shoe_id = req.params.shoe_id;
	const shoe = (await axios.get(`${process.env.API_URI}/api/shoes?shoe_id=` + shoe_id)).data.shoes[0];

	console.log(shoe);
	res.render('shoe', {
		page: `${shoe.brand} ${shoe.brand}`,
		shoe
	});
});

router.post('/shoe/:shoe_id', async (req, res) => {
	const shoe_id = req.params.shoe_id;
	const color = req.body.color;
	const size = req.body.size;

	const item_id = await axios.get(`${process.env.API_URI}/api/shoes/item_id/${shoe_id}/${color}/${size}`);
	// user_id is hardcoded until authentication system is built
	const shoe = (await axios.post(`${process.env.API_URI}/api/cart/1000/add?item_id=${item_id}`));

	// console.log(shoe);
	res.render('shoe', {
		page: `${shoe.brand} ${shoe.brand}`,
		shoe
	});
});

export default router;