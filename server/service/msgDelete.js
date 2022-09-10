const db = require('../models/index.js');
const msgs = db.msgs;

const msgDelete = (data) => {
    try {
        msgs.destroy = (data) => { {where: {msg_id: data.msg_id}} };
    } catch(e) {
        console.error(e);
    }
}

module.exports = msgDelete;