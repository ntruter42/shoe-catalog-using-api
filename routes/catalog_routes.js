import { Router } from "express";
import axios from "axios";

const router = Router();

router.get(`/`, async (req, res) => {
	if (req.session.user_id) {
		const data = (await axios.get(`${process.env.SHOES_API_URI}/api/shoes`)).data;
		const shoes = data.shoes;
		const filters = data.filters;

		res.render(`catalog`, {
			page: `Shop`,
			shoes,
			filters,
			hostname: req.hostname
		});
	} else {
		res.redirect(`/login`);
	}
});

router.get(`/shoe/:shoe_id`, async (req, res) => {
	const shoe_id = req.params.shoe_id;
	const shoe = (await axios.get(`${process.env.SHOES_API_URI}/api/shoes?shoe_id=${shoe_id}`)).data.shoes[0];

	console.log(shoe);
	res.render(`shoe`, {
		page: `${shoe.brand} ${shoe.brand}`,
		shoe
	});
});

router.post(`/shoe/:shoe_id`, async (req, res) => {
	const shoe_id = req.params.shoe_id;
	const color = req.body.color;
	const size = req.body.size;

	const item_id = await axios.get(`${process.env.SHOES_API_URI}/api/shoes/item_id/${shoe_id}/${color}/${size}`);
	const shoe = (await axios.post(`${process.env.SHOES_API_URI}/api/cart/1000/add?item_id=${item_id}`));

	res.render(`shoe`, {
		page: `${shoe.brand} ${shoe.brand}`,
		shoe
	});
});

router.get(`/cart`, async (req, res) => {
	const data = (await axios.get(`${process.env.SHOES_API_URI}/api/cart/${req.session.user_id}`)).data;
	const cart = data.cart;

	res.render(`cart`, {
		page: `Cart`,
		cart
	});
});

router.get(`/login`, async (req, res) => {
	const message = {
		text: req.flash('error')[0] || null,
		type: `error`
	};

	res.render(`login`, {
		page: `Login`,
		message: message.text ? message : null
	});
});

router.get(`/register`, async (req, res) => {
	const message = {
		text: req.flash('error')[0] || null,
		type: `error`
	};

	res.render(`register`, {
		page: `Sign Up`,
		message: message.text ? message : null
	});
});

router.get(`/logout`, async (req, res) => {
	req.session.destroy(() => {
		res.redirect('/login');
	});
});

router.post(`/login`, async (req, res) => {
	const response = (await axios.post(`${process.env.AUTH_API_URI}/api/auth/login`, {
		username: req.body.username,
		password: req.body.password
	})).data
	const user_id = response.user_id;

	if (!user_id) {
		req.flash(`error`, `${response.error}`);
		res.redirect(`/login`);
	} else {
		req.session.user_id = user_id;
		res.redirect(`/`);
	}
});

router.post(`/register`, async (req, res) => {
	const response = (await axios.post(`${process.env.AUTH_API_URI}/api/auth/register`, {
		username: req.body.username,
		password: req.body.password
	})).data;
	const user_id = response.user_id;

	if (req.body.password !== req.body.confirm) {
		req.flash(`error`, `Passwords don't match`);
		res.redirect(`/register`);
	} else if (!user_id) {
		req.flash(`error`, `${response.error}`);
		res.redirect(`/register`);
	} else {
		req.session.user_id = user_id;
		res.redirect(`/`);
	}
});

export default router;