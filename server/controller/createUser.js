const userCreate = require('../service/userCreate')

const createUser = (async(data) => {
    try {
        await userCreate(data)
    } catch (e) {
        console.error(err)
    }
});

module.exports = createUser;