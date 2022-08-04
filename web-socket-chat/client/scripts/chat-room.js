import { Network } from "./network.js"

window.onload = function() {
    const elements = {
        connectedUsers: document.querySelector("ul.connected-users"),
        messages: document.querySelector(".messages"),
        input: document.querySelector("input")
    }
    const network = new Network()

    network.on("open", () => {
        network.send("username", sessionStorage.username)
    })
    
    network.on("message", (tag, content) => {
        if (tag == "online-users") {
            elements.connectedUsers.innerHTML = ""
            for (let username of content) {
                const li = document.createElement("li")
                li.innerHTML = username
                elements.connectedUsers.appendChild(li)
            }
            elements.input.disabled = false
        }
        else if (tag == "chat") {
            const p = `<p><span>${content.username}: </span>${content.message}</p>`
            elements.messages.innerHTML += p
            elements.messages.scrollTop = elements.messages.scrollHeight
        }
    })

    elements.input.onkeydown = (e) => {
        if ((e.code == "Enter" || e.code == "NumpadEnter") && elements.input.value.trim()) {
            network.send("chat", elements.input.value)
            elements.input.value = ""
        }
    }

    network.connect(sessionStorage.ipAddress, sessionStorage.port)
}