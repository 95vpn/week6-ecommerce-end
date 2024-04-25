const User = require("../models/user")

const userCreate = async () => {

    const user = {
        firstName:"Yoneison",
        lastName:"Bayona",
        email:"yoneison@gmail.com",
        password:"yoneison1234",
        phone:"123456"
    }

    await User.create(user)

}

module.exports = userCreate;