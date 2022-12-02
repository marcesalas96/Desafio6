const fs = require("fs")
let messages = []
module.exports = class MessageController{
    constructor(filePath){
        this.filePath = filePath 
        
    }
    async saveMessage (object){
        try {
            const data = await fs.promises.readFile(`./src/db/${this.filePath}`, 'utf-8')
            if(!data){
                object.id = 1
                messages.push(object)
                console.log(object);
                await fs.promises.writeFile(`./src/db/${this.filePath}`, JSON.stringify(messages))
            }
            else{
                messages = JSON.parse(data)
                const lastIndex = messages.length - 1
                const lastId = messages[lastIndex].id
                object.id = lastId + 1
                messages.push(object)
                await fs.promises.writeFile(`./src/db/${this.filePath}`, JSON.stringify(messages))
            }
        } catch (error) {
            console.error("Error en save(Object):", error)
        }
    }
    async getAll(){
        try {
            const messages = await fs.promises.readFile(`./src/db/${this.filePath}`, "utf-8")
            return messages ? JSON.parse(messages) : false
        } catch (error) {
            console.error("Error en getAll():", error)
        }
    }
}