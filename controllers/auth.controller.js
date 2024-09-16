const express = require("express");
const { trace, context }= require("@opentelemetry/api")
const auth_service = require("../service/auth.service")
const validateToken = require("../middleware/auth")
const router = express.Router();

router.post("/login", (req, res) => {
    const tracer = trace.getTracer('default');
    const parentSpan = trace.getSpan(context.active());
    const childSpan = tracer.startSpan('auth_controller.login', {
        parent: parentSpan, // Specify the parent span
    });
    auth_service
        .login(req.body.username, req.body.password)
        .then((result) => {
            res.send(JSON.stringify({status:200, message: result}))
        })
        .catch((error) => {
            res.status(400).send(JSON.stringify({status:400, message: error.message}));
        })
        .finally(()=> {
            console.log("Finished processing login. trace id - "+ childSpan.spanContext().traceId);
            childSpan.end();
        });
    
});

router.post("/register", (req, res) => {
    const tracer = trace.getTracer('default');
    const parentSpan = trace.getSpan(context.active());
    const childSpan = tracer.startSpan('auth_controller.register', {
        parent: parentSpan, // Specify the parent span
    });
    auth_service
        .registerUser(req.body)
        .then((result) => {
            res.send(JSON.stringify({status:200, message: result}))
        })
        .catch((error) => {
            res.status(400).send(JSON.stringify({status:400, message: error.message}));
        })
        .finally(()=> {
            console.log("Finished processing register. trace id - "+ childSpan.spanContext().traceId);
            childSpan.end();
        });
});

router.get("/test", validateToken, (req, res) => {
    res.send("Authentication works!!")
})
module.exports = router;