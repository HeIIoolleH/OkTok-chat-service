const db = require('../models/index.js');
const users = db.users;

const userUpdate = (data) => {
    try {
        users.update({user: data.user}, {
            where: {user_id:data.user_id}
        })
    } catch(e) {
        console.error(e);
    }
}

module.exports = userUpdate;