const msgRead = require('../service/msgRead')

const getMsgs = (async(roomNum) => {
    const msgDataAll = await msgRead(roomNum);
    return msgDataAll;
});

module.exports = getMsgs;