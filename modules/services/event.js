const {Event} = require('../schemas/event');

const defaultEvent = {
    "title": "",
    "days": 0,
    "dates": [""],
    "times": [""],
    "booker": {
        "name": "",
        "email": "",
        "mobile": 0,
        "alt_mobile": 0,
        "address": ""
    }, 
    "referer": {
        "name": "",
        "email": "",
        "mobile": 0,
        "alt_mobile": 0,
        "address": ""
    }, 
    "payment": {
        "total": 0,
        "paid": 0,
        "mode": "",
        "date": ""
    }
}

const get_all = async () => {
  const events = await Event.find();
  return events;
};

const get_by_date = async (date) => {
    const events = await Event.find({"dates": {"$regex": date}});
    return events;
}

const create = async (data) => {
    return await Event.create(data);
}

const delete_by_id = async (id) => {
    return await Event.deleteOne({ _id: id });
}

const update = async (id, data) => {
    return await Event.findOneAndUpdate({
        _id: id
    }, data, {
        new: true
    });
}

module.exports = {
  get_all,
  get_by_date,
  create,
  delete_by_id,
  update
};
