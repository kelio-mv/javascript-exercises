class Network {
    constructor(port) {
        this.port = port
        this.ws = require('ws')
        this.clients = []
        this.onmessage = () => {}
        this.onclose = () => {}
    }

    listen() {
        this.socket = new this.ws.Server({port: this.port})
        console.log(`The WebSocket Server is running on port ${this.port}`)

        this.socket.on("connection", (socket) => {
            console.log("A client has connected!")

            const client = {
                socket: socket,
                send: (tag, content) => {
                    const message = JSON.stringify({tag, content})
                    socket.send(message)
                    console.log(`Sent: ${message}`)
                }
            }
            this.clients.push(client)

            socket.on("message", (data) => {
                console.log(`Received: ${data.toString()}`)
                const message = JSON.parse(data.toString())
                this.onmessage(client, message)
            })
            socket.on("close", () => {
                console.log("A client has disconnected!")
                this.clients.splice(this.clients.indexOf(client), 1)
                this.onclose(client)
            })
            // socket.on("error", () => {})
        })
    }

    broadcast(tag, content) {
        this.clients.forEach(client => client.send(tag, content))
    }
}

const network = new Network(3000)
network.onmessage = (client, message) => {
    const tag = message.tag
    const content = message.content

    if (tag == "username") {
        client.username = content
        network.broadcast("online-users", network.clients.map(client => client.username))
    }
    else if (tag == "chat") {
        network.broadcast("chat", {username: client.username, message: content})
    }
}
network.onclose = () => {
    network.broadcast("online-users", network.clients.map(client => client.username))
}
network.listen()