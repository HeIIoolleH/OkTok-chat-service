const msgCreate = require('../service/msgCreate')

const createMsg = (async(data) => {
    try {
        await msgCreate(data)
    } catch (e) {
        console.error(err)
    }
});

module.exports = createMsg;