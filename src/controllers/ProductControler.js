let products = []
class ProductControler {
    constructor(connection, tableName) {
        this.connection = connection
        this.tableName = tableName
    }

    async createProductTable() {
        try {
            await this.connection.schema.createTable(this.tableName, table => {
                table.increments('id').primary()
                table.string('tittle', 50).notNullable()
                table.float('price').notNullable()
                table.string('thumbnail', 100).notNullable()
            })
            console.log("Table created!")
        } catch (e) {
            console.error("Error:", e)
        }
    }
    async tableExist(){
        return await this.connection.schema.hasTable(this.tableName)
    }
    
    async getAll(req, res) {
        try {
            return await this.connection.from(this.tableName).select('*')
        } catch (error) {
            console.log("Error en getAll", error);
        }
    }
    getById(req, res) {
        try {
            const { id } = req.params
            if (isNaN(id)) {
                res.status(400).json({ Error: "El parametro ingresado no es un numero" })
            }
            const product = products.filter(filterProduct => filterProduct.id === Number(id))
            if (!product[0]) {
                res.status(404).json({ Error: "El producto no existe" })
            }
            res.status(200).json(product)
        } catch (error) {
            console.log("Error en getById", error);
        }
    }
    async addProduct(object) {
        try {
            const { tittle, price, thumbnail } = object
            const product = { tittle: tittle, price: price, thumbnail: thumbnail }
            await this.connection(this.tableName).insert(product)
            
        } catch (error) {
            console.log("Error en addProduct", error);
        }
    }
    updateProduct(req, res) {
        try {
            const { id } = req.params
            const { title, price, thumbnail } = req.body
            if (isNaN(id)) {
                res.status(400).json({ Error: "El parametro ingresado no es un numero" })
            }
            const index = products.findIndex(product => product.id === Number(id))
            if (index === -1) {
                res.status(404).json({ Error: "El producto no existe" })
            }
            const productUpdated = { title: title, price: price, thumbnail: thumbnail, id: Number(id) }
            products[index] = productUpdated
            res.status(200).json({ productUpdated })
        } catch (error) {
            console.log("Error en updateProduct", error)
        }
    }
    deleteById(req, res) {
        try {
            const { id } = req.params
            if (isNaN(id)) {
                res.status(400).json({ Error: "El parametro ingresado no es un numero" })
            }
            const product = products.filter(filterProduct => filterProduct.id === Number(id))
            if (!product) {
                res.status(404).json({ Error: "El producto no existe" })
            }
            products = products.filter(filterProduct => filterProduct.id !== Number(id))
            res.status(200).json(`Producto con id : ${id} eliminado exitosamente`)
        } catch (error) {
            console.log("Error en deleteById", error);
        }
    }
    async deleteAll(){
        try {
            this.connection.from(this.tableName).del()
        } catch (e) {
            console.error("Error en deleteAll: ", e)
        }
    }
}

module.exports = ProductControler