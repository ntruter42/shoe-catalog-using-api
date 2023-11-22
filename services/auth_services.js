import axios from "axios";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default function auth() {
	const hashPassword = async function (password) {
		let password_hash = '';
		while (password_hash.length !== 60) { password_hash = await bcrypt.hash(password, 10) }
		return password_hash;
	};

	const comparePasswords = async function (password_hash1, password_hash2) {
		return await bcrypt.compare(password_hash1, password_hash2);
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
			console.error(error.message);
			res.redirect('/login');
		}
	};

	const decodeToken = function (token) {
		const decoded_data = jwt.verify(token, process.env.AUTH_KEY);
		return decoded_data;
	}

	return {
		hashPassword,
		comparePasswords,
		verifyToken,
		decodeToken
	}
}