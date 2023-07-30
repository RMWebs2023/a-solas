const express = require("express");
const cors = require("cors")
const connection = require("./database.js");
const router = require("./routes/index.js");
const mercadopago = require("mercadopago");

const app = express();

app.use(cors())
app.use(express.json());
app.use("/", router);
app.use('/public', express.static(`${__dirname}/imagenes/productos`))

mercadopago.configure({
  access_token: "TEST-298625319681219-072818-34c0e6fd31cb993506970ee698e06331-1112761190",
});

app.post("/create_preference", (req, res) => {
	let preference = {
		items: [
			{
				title: req.body.description,
				unit_price: Number(req.body.price),
				quantity: Number(req.body.quantity),
			}
		],
		back_urls: {
			"success": "http://localhost:5173",
			"failure": "http://localhost:5173",
			"pending": ""
		},
		auto_return: "approved",
	};

  mercadopago.preferences.create(preference)
		.then(function (response) {
			res.json({
				id: response.body.id
			});
		}).catch(function (error) {
			console.log(error);
		});
});

app.listen(3000, () => {
  connection();
  console.log("Server is listening on port", 3000);
});
