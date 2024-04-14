const { User } = require('../schemas/user');

const get_all = async () => {
    return await User.find();
}

const get = async (key, value) => {
    return await User.findOne({
        [key]: value
    });
}

const create = async (data) => {
    return await User.create(data);
}

const remove = async (id) => {
    return await User.deleteOne({
        _id: id
    });
}

const update = async (id, data) => {
    return await User.findOneAndUpdate({
        _id: id
    }, data, {
        new: true
    });
}

const login = async (mobil, password) => {
    const user = await get("mobil", mobil);
    if (user) {
        if (user.password === password) {
            return true;
        } else { 
            return false;
        }
    } else {
        return false;
    }
}

module.exports = {
    get_all,
    get,
    create,
    remove,
    update,
    login
}