const socket = io()
const $formName = document.querySelector("#formName")
const $nameInput = document.querySelector("#name")
const $emailInput = document.querySelector("#email")
const $btnName = document.querySelector("#btnName")
const $emailHelp = document.querySelector("#emailHelp")
const $divContainer = document.querySelector("#container")
const $tituloSaludo = document.querySelector("#tituloSaludo")
const $formProducts = document.querySelector("#formProducts")
const $tittle = document.querySelector("#tittle")
const $price = document.querySelector("#price")
const $thumbnail = document.querySelector("#thumbnail")
const $btnProducts = document.querySelector("#btnProducts")
const $table = document.querySelector("table")
const $emptyProducts = document.querySelector("#emptyProducts")
const $formMessage = document.querySelector("#formMessage")
const $messageInput = document.querySelector("#message")
const $btnMessage = document.querySelector("#btnMessage")
const $chatContainer = document.querySelector("#chatContainer")

// FORMULARIO DE LOGIN
$btnName.addEventListener("click", (event) => {
    event.preventDefault()
    const name = $nameInput.value
    const email = $emailInput.value
    if (!name || !email) {
        $emailHelp.classList.remove("d-none")
        $formName.reset()
        return
    }
    $emailHelp.classList.add("d-none")
    const user = { name: name, email: email }
    socket.emit("userLogin", user)
    $formName.classList.add("d-none")
    $divContainer.classList.remove("d-none")

})
// SALUDO
socket.on("userLoginServer", ({ name, email }) => {
    $tituloSaludo.innerHTML = `Bienvenid@ ${name}`
    socket.on("serverMessage", ({fyh, message}) => {
        const chat = {email: email, fyh: fyh, message: message}
        const html = `
                <div class="d-flex"><span class="text-info">{{chat.email}}</span> <span class="text-success">[{{chat.fyh}}]</span>: {{chat.message}} </div>
            `
        const template = Handlebars.compile(html);
        const data = template({ chat: chat })
        $chatContainer.innerHTML += data
        socket.emit("clientChatForBDD", chat)
    })
})
// SI HAY MENSAJES PREVIAMENTE GUARDADOS
socket.on("serverChats", messages => {
        const html = `
            {{#each messages}}
                <div class="d-flex"><span class="text-info">{{this.email}}</span> <span class="text-success">[{{this.fyh}}]</span>: {{this.message}} </div>
            {{/each}}
            `
        const template = Handlebars.compile(html);
        const data = template({ messages: messages })
        $chatContainer.innerHTML = data
})

$btnProducts.addEventListener("click", (event) => {
    event.preventDefault()
    const product = { tittle: $tittle.value, price: $price.value, thumbnail: $thumbnail.value}
    socket.emit("clientProduct",product)
    $formProducts.reset()
})
socket.on("serverProduct", products => {
    if (products.length > 0) {
        $table.classList.remove("d-none")
        $emptyProducts.classList.add("d-none")
        const html = `
            {{#each products}}
                <tr >
                    <th scope="col">{{this.id}}</th>
                    <th scope="col">{{this.tittle}}</th>
                    <th scope="col">$ {{this.price}}</th>
                    <th scope="col"><img src={{this.thumbnail}}></th>
                </tr>
            {{/each}}
            `
        const template = Handlebars.compile(html);
        const data = template({ products: products })
        $table.innerHTML = data
    }
})
$btnMessage.addEventListener("click",event => {
    event.preventDefault()
    const message = $messageInput.value
    socket.emit("clientMessage", message)
    $formMessage.reset()
    

})


