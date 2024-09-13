const express = require("express");
const dotenv = require("dotenv");
const prisma = require("./db/prisma");
const { getMaxListeners } = require("events");

const app = express();

dotenv.config();

const port = 3000;

app.get("/",async (req, res) => {
    await prisma.user.create({
        data: {
            name: "John Doe",
            email: "johndoe@gmail.com",
            password: "123456",
        },
    });

    const users = await prisma.user.findMany();
    const names = users.map((user)=>user.name);
    res.send(`There are ${names.length} users with names of: ${names.join(", ")}`);
})
app.listen(port, () => console.log(`App listening on port ${port}`))