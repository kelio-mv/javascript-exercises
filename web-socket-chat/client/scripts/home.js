import { Network } from "./network.js"

window.onload = function() {
    const elements = {
        "ipAddress": document.querySelector(".ip-address"),
        "port": document.querySelector(".port"),
        "username": document.querySelector(".username"),
        "joinBtn": document.querySelector(".join")
    }
    
    elements.joinBtn.onclick = function() {
        if (elements.username.value.length < 3 || elements.username.value.length > 15) {
            alert("Seu nome deve ter entre 3 a 15 caracteres!")
            return
        }
        const network = new Network()

        network.on("open", () => {
            sessionStorage.ipAddress = elements.ipAddress.value
            sessionStorage.port = elements.port.value
            sessionStorage.username = elements.username.value
            location.href = "chat-room.html"
        })
        network.connect(elements.ipAddress.value, elements.port.value)
    }
}