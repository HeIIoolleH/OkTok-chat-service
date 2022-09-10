const db = require('../models/index.js');
const msgs = db.msgs;

const msgCreate = (data) => {
    try {
        msgs.create({
            user_id: data.user_id,
            room_num: data.roomNum,
            msg : data.msg
        })
    } catch(e) {
        console.error(e);
    }
}

module.exports = msgCreate;