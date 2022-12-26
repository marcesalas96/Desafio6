const ProductControler = require("../ProductControler")
const MessageController = require("../MessageController")
const { databaseMD, databaseSQLite } = require('../../db/db')

const ProductClass = new ProductControler(databaseMD, "products")
const MessageClass = new MessageController(databaseSQLite, "messages")

module.exports = handleSocket = (io) => {
    io.on("connection", async (socket) => {
        const existMDB = await ProductClass.tableExist()
        const existSQL = await MessageClass.tableExist()
        if (existMDB) {
            const products = await ProductClass.getAll()
            io.emit("serverProduct", products)
        } else {
            await ProductClass.createProductTable()
        }
        if (existSQL) {
            const chat = await MessageClass.getAll()
            io.emit("serverChats", chat)
        } else {
            await MessageClass.createChatTable()
        }
        console.log(`Usuario ${socket.id} conectado`);
        socket.on("userLogin", data => {
            socket.emit("userLoginServer", data)
            socket.on("clientMessage", message => {
                const chat = { fyh: new Date().toLocaleString(), message: message }
                io.emit("serverMessage", chat)
            })
        })
        socket.on("clientProduct", product => {
            ProductClass.addProduct(product)
            const products = ProductClass.getAll()
            io.emit("serverProduct", products)
        })
        socket.on("clientChatForBDD", async (chat) => {
            await MessageClass.saveMessage(chat)
        })
    })
}