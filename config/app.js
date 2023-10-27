import express from "express";
import cors from "cors";
import { engine } from "express-handlebars";
import session from "express-session";
import flash from "express-flash";
import bodyParser from "body-parser";
import "dotenv/config";

export default function App() {
	const app = express();

	app.use(cors());
	app.use(express.static('public'));
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());
	app.use(flash());
	app.use(session({
		secret: process.env.SECRET_KEY,
		resave: false,
		saveUninitialized: false,
		cookie: {}
	}));
	app.engine('handlebars', engine({
		defaultLayout: 'main',
		viewPath: './views',
		layoutsDir: './views/layouts',
		helpers: {
			ifPosition: function (position, options) {
				if (position === options.hash.position) {
					return options.fn(this);
				}
				return options.inverse(this);
			},
			ifEqual: function (value, input, options) {
				if (value === input) {
					return options.fn(this);
				}
				return options.inverse(this);
			},
			capitalize: function (str) {
				return str.charAt(0).toUpperCase() + str.slice(1);
			},
			localize: function (num) {
				return num.toLocaleString().replace(/\s/, ',');
			}
		}
	}));
	app.set('view engine', 'handlebars');

	return app;
}