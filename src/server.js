//IMPORTS
const express = require("express")
const path = require("path")
const app = express()
const routes = require("./routes/index")
const mainRoute = require("./routes/mainIndex")
const { engine } = require("express-handlebars")
const {Server: IOServer} = require("socket.io")
const handleSocket = require('./controllers/socketController/index')
const PORT = 8080
//MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join( __dirname, "/public")))
app.use("/", mainRoute)
app.use("/api/productos", routes)
//ENGINE
app.engine(".hbs", engine({
    extname: ".hbs",
    defaultLayout: "main.hbs",
    layoutsDir: path.join(__dirname, "public/views/layouts"),
    partialsDir: path.join(__dirname, "public/views/partials")
}))
app.set("view engine", "hbs")
app.set("views", path.join(__dirname, "/public/views"))
//SERVER LISTEN
const server = app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`Server escuchando puerto : ${PORT}`);
})
const io = new IOServer(server)
handleSocket(io)
