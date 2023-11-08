import { Router } from "express";
import axios from "axios";

const router = Router();

router.get('/', async (req, res) => {
	// TODO: get user_id from req.session.user_id
	const user_id = 1000;
	const cart = (await axios.get(`${process.env.SHOES_API_URI}/api/cart/` + user_id)).data;

	res.render('index', {
		title: "Shopping Cart",
		cart
	});
});

export default router;