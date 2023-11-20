import { Router } from "express";
import axios from "axios";
import auth_services from "../services/auth_services.js";

const router = Router();
const auth = auth_services();

router.get("/", auth.verifyToken, async (req, res) => {
	const nav = ["search", "brand", "menu"];

	const response = (await axios.get(`${process.env.SHOES_API_URI}/shoes`));
	const shoes = response.data.shoes;
	const filters = response.data.filters;

	res.render("catalog", {
		page: "Shop",
		nav,
		shoes,
		filters,
		hostname: req.hostname
	});
});

router.get("/shoe/:shoe_id", auth.verifyToken, async (req, res) => {
	const shoe_id = req.params.shoe_id;
	const shoe = (await axios.get(`${process.env.SHOES_API_URI}/shoes?shoe_id=${shoe_id}`)).data.shoes[0];

	res.render("shoe", {
		page: `${shoe.brand} ${shoe.brand}`,
		shoe
	});
});

router.post("/shoe/:shoe_id", auth.verifyToken, async (req, res) => {
	const shoe_id = req.params.shoe_id;
	const color = req.body.color;
	const size = req.body.size;

	const item_id = await axios.get(`${process.env.SHOES_API_URI}/shoes/item_id/${shoe_id}/${color}/${size}`);
	const shoe = await axios.post(`${process.env.SHOES_API_URI}/cart/1000/add?item_id=${item_id}`);

	res.render("shoe", {
		page: `${shoe.brand} ${shoe.brand}`,
		shoe
	});
});

router.get("/cart", auth.verifyToken, async (req, res) => {
	const data = (await axios.get(`${process.env.SHOES_API_URI}/cart/${req.session.user_id}`)).data;
	const cart = data.cart;

	res.render("cart", {
		page: "Cart",
		cart
	});
});

router.get("/login", async (req, res) => {
	const nav = ["brand"];

	const message = {
		text: req.flash('error')[0] || undefined,
		type: "error"
	};

	res.render("login", {
		page: "Login",
		nav,
		message
	});
});

router.post("/login", async (req, res) => {
	try {
		const response = (await axios.post(`${process.env.AUTH_API_URI}/auth/login`, {
			username: req.body.username,
			password: req.body.password
		})).data;

		res.cookie(`last_user_id`, response.user.user_id, { maxAge: 1000 * 60 * 60 * 24 * 7 });
		res.cookie(`jwt_${response.user.user_id}`, response.token, { maxAge: 1000 * 60 * 60 });
		res.redirect("/");
	} catch (error) {
		if (error.response) {
			console.error(error.response.data);
			req.flash('error', error.response.data.message);
		} else {
			console.error(error);
			req.flash('error', error);
		}
		res.redirect("/login");
	}
});

router.get("/register", async (req, res) => {
	const nav = ["brand"];

	const message = {
		text: req.flash('error')[0] || undefined,
		type: "error"
	};

	res.render("register", {
		page: "Register",
		nav,
		message
	});
});

router.post("/register", async (req, res) => {
	const response = (await axios.post(`${process.env.AUTH_API_URI}/auth/register`, {
		username: req.body.username,
		password: req.body.password,
		full_name: req.body.full_name,
		confirm: req.body.confirm
	})).data;
	const user_id = response.user_id;

	if (req.body.password !== req.body.confirm) {
		req.flash("error", "Passwords don't match");
		res.redirect("/register");
	} else if (!user_id) {
		req.flash("error", `${response.error}`);
		res.redirect("/register");
	} else {
		res.redirect("/");
	}
});

router.get("/logout", async (req, res) => {
	req.session.destroy(() => {
		res.clearCookie(`jwt_${req.cookies[`last_user_id`]}`);
		res.clearCookie(`last_user_id`);
		res.redirect("/login");
	});
});

export default router;