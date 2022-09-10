
const db = require('../models/index.js');
const users = db.users;

const userDelete = (data) => {
    try {
        users.destroy = (data) => { {where: {user_id: data.user_id}} };
    } catch(e) {
        console.error(e);
    }
}

module.exports = userDelete;