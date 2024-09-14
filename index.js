const express = require("express");
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
const prisma = require("./db/prisma");
const { getMaxListeners } = require("events");
const public_routes = require("./controllers/auth.controller")
const app = express();

dotenv.config();

const port = 3000;

// app.get("/",async (req, res) => {
//     await prisma.user.create({
//         data: {
//             name: "John Doe",
//             email: "johndoe@gmail.com",
//             password: "123456",
//         },
//     });

//     const users = await prisma.user.findMany();
//     const names = users.map((user)=>user.name);
//     res.send(`There are ${names.length} users with names of: ${names.join(", ")}`);
// })

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/v1", public_routes);
app.listen(port, () => console.log(`App listening on port ${port}`));