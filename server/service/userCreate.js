const db = require('../models/index.js');
const users = db.users;

const userCreate = (data) => {
    try {
        users.create({
            user: data.user
        })
    } catch(e) {
        console.error(e);
    }
}

module.exports = userCreate;