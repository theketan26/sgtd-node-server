const express = require('express');
const UserService = require('../services/user');

var authRouter = express.Router();

authRouter.post('/login', async (req, res) => {
    let response = {
        status: false,
        message: '',
        data: {}
    }
    try {
        const { mobil, password } = req.body;
        let validate = await UserService.login(mobil, password);
        if (validate) {
            const user = await UserService.get("mobil", mobil);
            response.status = true;
            response.message = 'User logged in successfully';
            response.data = {
                mobile: user.mobile,
                name: user.name,
                email: user.email
            };
            res.status(200).send(response);
        } else {
            response.status = false;
            response.message = 'Invalid credentials';
            res.status(400).send(response);
        }
    } catch (err) {
        response.status = false;
        response.message = err.message;
        res.status(400).send(response);
    }
});

module.exports = authRouter;