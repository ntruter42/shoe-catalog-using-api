import { Router } from "express";
import axios from "axios";

const router = Router();

router.get('/', async (req, res) => {
	try {
		const shoes = (await axios.get(`${process.env.API_URL}/api/shoes`)).data;

		res.render('index', {
			title: "Shoe Catalog",
			shoes
		});
	} catch (error) {
		res.status(500).send('Error');
	}
});

export default router;