const userRead = require('../service/userRead')

const getUsers = (async(userId) => {
    const userDataAll = await userRead(userId);
    return userDataAll;
});

module.exports = getUsers;