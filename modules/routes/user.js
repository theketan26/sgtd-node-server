const express = require('express');
const UserService = require('../services/user');

var userRoute = express.Router();

userRoute.get('/all', async (req, res) => {
    let user = await UserService.get_all();
    res.status(200).send(user);
});

userRoute.get('/:key/:value', async (req, res) => {
    let response = {
        status: false,
        message: '',
        data: {}
    }
    try {
        const { key, value } = req.params;
        let user = await UserService.get(key, value);
        console.log(user);
        if (user) {
            response.status = true;
            response.message = 'User found';
            response.data = user;
            res.status(200).send(response);
        } else {
            response.message = 'User not found';
            res.status(400).send(response);
        }
    } catch(err) {
        response.message = 'Failed with error: ' + err.message;
        res.status(400).send(response);
    }
});

userRoute.post('/', async (req, res) => {
    let response = {
        status: false,
        message: '',
        data: {}
    }
    try {
        const user = req.body;
        const prev_users = await UserService.get('email', user.email);
        if (prev_users) {
            response.message = 'User already exists';
            res.status(400).send(response);
            return;
        }

        const result = await UserService.create(user);
        if (response) {
            response.status = true;
            response.message = 'User created successfully';
            response.data = result;
            res.status(200).send(response);
        } else {
            response.message = 'Failed to create user';
            res.status(400).send(response);
        }
    } catch (err) {
        response.message = 'Failed with error: ' + err.message;
        res.status(400).send(response);
    }
});

userRoute.delete('/:id', async (req, res) => {
    let response = {
        status: false,
        message: '',
        data: {}
    }
    try {
        const { id } = req.params;
        const result = await UserService.remove(id);
        if (result.deletedCount > 0) {
            response.status = true;
            response.message = 'User deleted successfully';
            response.data = result;
            res.status(200).send(response);
        } else {
            response.message = 'Failed to delete user';
            response.data = result
            res.status(400).send(response);
        }
    } catch (err) {
        response.message = 'Failed with error: ' + err.message;
        res.status(400).send(response);
    }
});

userRoute.patch('/:id', async (req, res) => {
    let response = {
        status: false,
        message: '',
        data: {}
    }
    try {
        const { id } = req.params;
        const user = req.body;
        const result = await UserService.update(id, user);
        if (result) {
            response.status = true;
            response.message = 'User updated successfully';
            response.data = result;
            res.status(200).send(response);
        } else {
            response.message = 'Failed to update user';
            response.data = result
            res.status(400).send(response);
        }
    } catch (err) {
        response.message = 'Failed with error: ' + err.message;
        res.status(400).send(response);
    }
});

module.exports = userRoute;