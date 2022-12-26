require("dotenv").config({path: "./src/.env"})
module.exports = {
    USERNAME_DB: process.env.USERNAME_DB,
    PASSWORD_DB: process.env.PASSWORD_DB,
}