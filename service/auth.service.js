const prisma = require("../db/prisma");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { trace, context } = require("@opentelemetry/api")

const registerUser = async (req_body) => {
    const tracer = trace.getTracer('default');
    const parentSpan = trace.getSpan(context.active());
    const childSpan = tracer.startSpan('auth_service.registerUser', {
        parent: parentSpan, // Set the child span as the parent
    });
    const { name, email, password } = req_body;

    try {
        //Check if email exists,
        const user = await prisma.user.findFirst({
            where: {
                email: {
                    equals: email,
                },
            },
        });
        if (user != null) {
            throw new Error('User already present with specified email!');
        }

        var pwd_hash = await bcrypt.hash(password, 5);
        await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: pwd_hash,
            },
        });
    }
    finally {
        childSpan.end();
    }
    //Save records to database 
    return `User is registered successfuly for ${email}`;
}

const login = async (username, password) => {
    const tracer = trace.getTracer('default');
    const parentSpan = trace.getSpan(context.active());
    const childSpan = tracer.startSpan('auth_service.login', {
        parent: parentSpan, // Set the child span as the parent
    });

    try {
        //Verify if the data exists 
        const user = await prisma.user.findFirst({
            where: {
                email: {
                    equals: username,
                },
            },
        });

        //If not, then throw exception 
        if (user == null) {
            throw new Error(`Specified username ${username} does not exists!`);
        }

        isPwdMatch = await bcrypt.compare(password, user.password);

        if (!isPwdMatch) {
            throw new Error(`Username/password do not match!`);
        }

        //Extract data, sign it to json 
        return jwt.sign({
            name: user.name,
            email: user.email,
        }, 'secret#@123', { expiresIn: '1h' });
    } catch (error) {
        // Code to handle the error
        console.error('An error occurred:', error.message);
    } finally {
        childSpan.end()
    }
}

module.exports = { registerUser, login }