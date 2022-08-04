export class Network {
    constructor() {
        this.callbacks = {
            onopen: () => {},
            onmessage: () => {},
            onerror: () => {}
        }
    }

    connect(ipAddress, port) {
        this.address = `ws://${ipAddress}:${port}`
        this.socket = new WebSocket(this.address)
        this.socket.onopen = this.onopen.bind(this)
        this.socket.onmessage = this.onmessage.bind(this)
        this.socket.onerror = this.onerror.bind(this)
    }

    on(event, callback) {
        this.callbacks[`on${event}`] = callback
    }

    onopen() {
        console.log(`Connected to ${this.address}`)
        this.callbacks.onopen()
    }

    onmessage(event) {
        console.log(`Received: ${event.data}`)
        const message = JSON.parse(event.data)
        this.callbacks.onmessage(message.tag, message.content)
    }

    onerror() {
        alert("Connection error!")
        this.callbacks.onerror()
    }

    send(tag, content) {
        const message = JSON.stringify({tag, content})
        this.socket.send(message)
        console.log(`Sent: ${message}`)
    }
}