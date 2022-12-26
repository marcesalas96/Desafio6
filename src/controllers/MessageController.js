const fs = require("fs")
let messages = []
module.exports = class MessageController{
    constructor(connectionSQl, tableName) {
        this.connectionSQl = connectionSQl
        this.tableName = tableName
    }
    async createChatTable() {
        try {
            await this.connectionSQl.schema.createTable(this.tableName, table => {
                table.increments('id').primary()
                table.string('email', 50).notNullable()
                table.float('fyh').notNullable()
                table.string('message', 300).notNullable()
            })

            console.log("Table created!")
        } catch (e) {
            console.error("Error:", e)
        }
    }
    async tableExist() {
        return await this.connectionSQl.schema.hasTable(this.tableName)
    }
    async saveMessage (object){
        try {
            await this.connectionSQl(this.tableName).insert(object)
            console.log('Message added')
        } catch (error) {
            console.error("Error en save(Object):", error)
        }
    }
    async getAll(){
        try {
            const messages = await this.connectionSQl.from(this.tableName).select('*')
            return messages ? messages : null
        } catch (error) {
            console.error("Error en getAll():", error)
        }
    }
}