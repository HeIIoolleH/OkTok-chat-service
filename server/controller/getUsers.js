const userRead = require('../service/userRead')

const getUsers = (async() => {
    const userDataAll = await userRead();
    return userDataAll;
});

module.exports = getUsers;