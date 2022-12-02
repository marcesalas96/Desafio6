const ProductControler = require("../ProductControler")
const MessageController = require("../MessageController")
const ProductClass = new ProductControler()
const MessageClass = new MessageController("chat.txt")

module.exports = handleSocket = (io) => {
    io.on("connection", async (socket) => {
        console.log(`Usuario ${socket.id} conectado`);
        const messages = await MessageClass.getAll()
        io.emit("serverChats", messages)
        socket.on("userLogin", data => {
            socket.emit("userLoginServer", data)
            socket.on("clientMessage", message => {
                const chat = {fyh: new Date().toLocaleString(), message: message}
                socket.emit("serverMessage", chat)
            })
        })
        socket.on("clientProduct", product => {
            ProductClass.addProduct(product)
            const products = ProductClass.getAll()
            socket.emit("serverProduct", products)
        })
        socket.on("clientChatForBDD",async (chat) => {
            await MessageClass.saveMessage(chat)
        })
    })
}