import { Router } from "express";
import axios from "axios";
import Shoe_Catalog from "../services/catalog_services.js";

const router = Router();
const services = Shoe_Catalog();

router.get('/', async (req, res) => {
	const shoes = (await axios.get(`${process.env.API_URI}/api/shoes`)).data;
	const shoe_data = services.process_catalog_data(shoes);

	res.render('catalog', {
		page: "Shop",
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
	const shoe_data = services.process_shoe_data(shoe);

	res.render('shoe', {
		shoe_data
	});
});

export default router;