const express = require("express");
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
const public_routes = require("./controllers/auth.controller");
const { provider } = require("./tracing.config");
const tracing = require("./middleware/tracing");

const app = express();

dotenv.config();

const port = 3000;

//Set the tracer provider as the global tracer provider 
provider.register();

app.use(tracing);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/v1", public_routes);
app.listen(port, () => console.log(`App listening on port ${port}`));