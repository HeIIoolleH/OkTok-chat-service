const db = require('../models/index.js');
const msgs = db.msgs;

const msgRead = async(roomNum) => {
    const msgDataAll = await msgs.findAll({
        attributes: ['msg', 'user_id', 'room_num'],
        where:{room_num: roomNum}
    });
    return msgDataAll;
}

module.exports = msgRead;