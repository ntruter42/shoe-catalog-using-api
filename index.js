import app_setup from "./config/app.js";
import catalog_routes from "./routes/catalog_routes.js";

const app = app_setup();

app.use('/', catalog_routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`http://localhost:${PORT}`);
});