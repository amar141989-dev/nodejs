const express = require("express");
const auth_service = require("../service/auth.service")
const validateToken = require("../middleware/auth")
const router = express.Router();

router.post("/login", (req, res) => {
    auth_service
        .login(req.body.username, req.body.password)
        .then((result) => {
            res.send(JSON.stringify({status:200, message: result}))
        })
        .catch((error) => {
            res.status(400).send(JSON.stringify({status:400, message: error.message}));
        });
});

router.post("/register", (req, res) => {
    auth_service
        .registerUser(req.body)
        .then((result) => {
            res.send(JSON.stringify({status:200, message: result}))
        })
        .catch((error) => {
            res.status(400).send(JSON.stringify({status:400, message: error.message}));
        });
});

router.get("/test", validateToken, (req, res) => {
    res.send("Authentication works!!")
})
module.exports = router;