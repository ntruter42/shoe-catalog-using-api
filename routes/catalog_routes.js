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
		const response = (await axios.post(`${process.env.AUTH_API_URI}/auth/user`, {
			username: req.body.username
		})).data;

		const user = auth.decodeToken(response.token);
		if (!(await auth.comparePasswords(req.body.password, user.password))) {
			throw new Error("The username or password entered is incorrect");
		}

		res.cookie(`last_user_id`, user.user_id, { maxAge: 1000 * 60 * 60 * 24 * 7 });
		res.cookie(`jwt_${user.user_id}`, response.token, { maxAge: 1000 * 60 * 60 });
		res.redirect("/");
	} catch (error) {
		if (error.response) {
			console.error(error.response.data);
			req.flash('error', error.response.data.message);
		} else {
			console.error(error);
			req.flash('error', error.message);
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
	try {
		if (req.body.password !== req.body.confirm) {
			throw new Error("Passwords do not match");
		}

		const response = (await axios.post(`${process.env.AUTH_API_URI}/auth/register`, {
			username: req.body.username,
			full_name: req.body.full_name,
			password: await auth.hashPassword(req.body.password)
		})).data;

		if (response.status === "Error") {
			throw new Error(response.message);
		} else {
			req.flash('success', "Login in to your new account");
			res.redirect("/login");
		}
	} catch (error) {
		if (error.response) {
			console.error(error.response.data);
			req.flash('error', error.response.data.message);
		} else if (error.message) {
			console.error(error.message);
			req.flash('error', error.message);
		} else {
			console.error(error);
			req.flash('error', error);
		}
		res.redirect("/register");
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