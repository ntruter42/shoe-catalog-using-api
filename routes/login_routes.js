import { Router } from "express";

const router = Router();

router.get('/', async (req, res) => {
	res.render('login');
});

export default router;