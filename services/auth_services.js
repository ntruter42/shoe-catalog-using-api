import axios from "axios";
import bcrypt from "bcrypt";

export default function auth() {
	const hashPassword = async function (password) {
		let password_hash = '';
		while (password_hash.length !== 60) { password_hash = await bcrypt.hash(password, 10) }
		return password_hash;
	};

	const verifyPassword = async function (password, password_hash) {
		return await bcrypt.compare(password, password_hash);
	};

	const verifyToken = async function (req, res, next) {
		try {
			const user_id = req.cookies['last_user_id'];
			if (!user_id) {
				throw new Error("User not logged in");
			}

			const token = req.cookies[`jwt_${user_id}`];
			if (!token) {
				throw new Error("Authentication token not found");
			}

			const response = (await axios.post(`${process.env.AUTH_API_URI}/auth/verify`, {}, {
				headers: {
					'content-type': 'application/json',
					'authorization': `Bearer ${token}`
				}
			}));

			if (!response.data.auth) {
				throw new Error("User not authenticated");
			}

			next();
		} catch (error) {
			console.log(error.message);
			res.redirect('/login');
		}
	};

	return {
		hashPassword,
		verifyPassword,
		verifyToken
	}
}