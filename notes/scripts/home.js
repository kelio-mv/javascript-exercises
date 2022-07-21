window.onload = function () {
    const notesContainer = document.getElementById("main")
    const createButton = document.getElementsByClassName("btn-container")[0]
    updateNotesContainer()
    assignEventsCallbacks()

    // functions

    function updateNotesContainer() {
        for (let key of Object.keys(localStorage)) {
            const note = document.createElement("div")
            const title = document.createElement("h2")
            const content = document.createElement("p")

            note.className = "note container"
            title.innerHTML = key
            content.innerHTML = localStorage.getItem(key)

            note.appendChild(title)
            note.appendChild(content)
            notesContainer.appendChild(note)
        }
    }

    function assignEventsCallbacks() {
        for (let note of document.getElementsByClassName("note")) {
            note.onclick = function (event) {
                sessionStorage.setItem("title", event.currentTarget.querySelector("h2").innerHTML)
                sessionStorage.setItem("editing", true)
                location.href = "note-viewer.html"
            }
        }
        createButton.onclick = () => {
            sessionStorage.setItem("editing", false)
            location.href = "note-viewer.html"
        }
    }
}