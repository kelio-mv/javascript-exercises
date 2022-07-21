window.onload = function () {
    const elements = {
        "header": document.getElementById("header"),
        "title": document.getElementById("title"),
        "content": document.getElementById("content"),
        "delete-btn": document.getElementById("delete-btn"),
        "cancel-btn": document.getElementById("cancel-btn"),
        "save-btn": document.getElementById("save-btn")
    }
    if (sessionStorage.editing == "true") {
        elements["header"].innerHTML = "Edit Note"
        elements["save-btn"].querySelector("a").innerHTML = "Back"
        elements["delete-btn"].style.display = "block"
        elements["save-btn"].style.display = "block"
        loadNote()
        elements["title"].oninput = handleInput
        elements["content"].oninput = handleInput
    }
    else {
        elements["header"].innerHTML = "Create Note"
        elements["save-btn"].querySelector("a").innerHTML = "Save"
        elements["cancel-btn"].style.display = "block"
        elements["save-btn"].style.display = "block"
    }

    // assign onclick callbacks

    elements["delete-btn"].onclick = () => {
        localStorage.removeItem(sessionStorage.title)
        location.href = "index.html"
    }
    elements["cancel-btn"].onclick = () => {
        location.href = "index.html"
    }
    elements["save-btn"].onclick = saveNote

    // functions

    function loadNote() {
        elements["title"].value = sessionStorage.title
        elements["content"].value = localStorage[sessionStorage.title]
    }

    function handleInput() {
        if (
            elements["title"].value == sessionStorage.title &&
            elements["content"].value == localStorage[sessionStorage.title]
        ) {
            elements["cancel-btn"].style.display = "none"
            elements["save-btn"].querySelector("a").innerHTML = "Back"
        }
        else {
            elements["cancel-btn"].style.display = "block"
            elements["save-btn"].querySelector("a").innerHTML = "Save"
        }
    }

    function saveNote() {
        const title = elements["title"].value
        const content = elements["content"].value

        if (title == "Title" || title == "") {
            alert("Please set a title!")
            return
        }
        else if (sessionStorage.editing == "true") {
            // if user changed title while editing
            if (title != sessionStorage.title) {
                if (title in localStorage) {
                    alert("This note already exists. Please set another title!")
                    return
                }
                else {
                    localStorage.removeItem(sessionStorage.title)
                }
            }
        }
        else {
            if (title in localStorage) {
                alert("This note already exists. Please set another title!")
                return
            }
        }
        localStorage.setItem(title, content)
        location.href = "index.html"
    }
}