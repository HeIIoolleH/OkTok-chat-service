const db = require('../models/index.js');
const msgs = db.msgs;

const msgUpdate = (data) => {
    try {
        msgs.update({msg: data.msg}, {
            where:{msg_id:data.msg_id}
        })
    } catch(e) {
        console.error(e);
    }
}

module.exports = msgUpdate;