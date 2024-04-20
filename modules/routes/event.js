const express = require('express');
const EventService = require('../services/event');

var eventRouter = express.Router();

eventRouter.get('/', async (req, res) => {
    const events = await EventService.get_all();
    res.status(200).send(events);
});

eventRouter.get('/:year/:month/:day', async (req, res) => {
    let response = {
        status: false,
        message: '',
        data: {}
    }
    try {
        let { year, month, day } = req.params;
        if (month == 0) {
            month = '';
        }
        if (day == 0) {
            day = '';
        }
        const result = await EventService.get_by_date(year.toString() + "-" + month.toString() + "-" + day.toString());
        if (result) {
            response.status = true;
            response.message = 'Event fetched successfully';
            response.data = result;
            res.status(200).send(response);
        } else {
            response.status = false;
            response.message = 'Event not found';
            res.status(400).send(response);
        }
    } catch (err) {
        response.status = false;
        response.message = err.message;
        res.status(400).send(response);
    }
})

eventRouter.post('/', async (req, res) => {
    let response = {
        status: false,
        message: '',
        data: {}
    }
    try {
        const event = req.body;
        const result = EventService.create(event);
        if (result) {
            response.status = true;
            response.message = 'Event created successfully';
            response.data = event;
            res.status(200).send(response);
        } else {
            response.status = false;
            response.message = 'Event not created';
            res.status(400).send(response);
        }
    } catch (err) {
        response.status = false;
        response.message = err.message;
        res.status(400).send(response);
    }
});

eventRouter.delete('/:id', async (req, res) => {
    let response = {
        status: false,
        message: '',
        data: {}
    }
    try {
        const id = req.params.id;
        const result = await EventService.delete_by_id(id);
        if (result) {
            if (result.deletedCount != 0) {
                response.status = true;
                response.message = 'Event deleted successfully';
                response.data = result;
                res.status(200).send(response);
            } else {
                response.message = 'Failed to delete event, possibly: event not found!';
                response.data = result
                res.status(400).send(response);
            }
        } else {
            response.message = 'Failed to delete event';
            response.data = result
            res.status(400).send(response);
        }
    } catch (e) {
        response.message = 'Failed with error: ' + e.message;
        res.status(400).send(response);
    }
})

eventRouter.patch('/:id', async (req, res) => {
    let response = {
        status: false,
        message: '',
        data: {}
    }
    try {
        const id = req.params.id;
        const event = req.body;
        const result = await EventService.update(id, event);
        if (result) {
            response.status = true;
            response.message = 'Event updated successfully';
            response.data = event;
            res.status(200).send(response);
        } else {
            response.status = false;
            response.message = 'Event not updated';
            res.status(400).send(response);
        }
    } catch (err) {
        response.status = false;
        response.message = err.message;
        res.status(400).send(response);
    }
});

module.exports = eventRouter;