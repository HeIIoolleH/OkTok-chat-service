const db = require('../models/index.js');
const users = db.users;

const userRead = async() => {
    const userDataAll = await users.findAll();
    return userDataAll;
}

module.exports = userRead;