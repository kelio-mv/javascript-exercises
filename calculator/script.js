window.onload = function() {

    // start variables

    const display = document.querySelector("#display p")
    const operators = ["+", "-", "*", "/"]
    const clickEventType = document.ontouchstart === null ? 'ontouchstart' : 'onclick'

    // binding event listeners

    for (let button of document.getElementsByClassName("number")) {
        button[clickEventType] = (event) => { handleInput("number", event.target.innerHTML) }
    }
    for (let button of document.getElementsByClassName("operator")) {
        button[clickEventType] = (event) => { handleInput("operator", event.target.innerHTML) }
    }
    document.getElementById("delete")[clickEventType] = () => handleInput("delete")
    document.getElementById("calculate")[clickEventType] = calculate
    document.getElementById("clear")[clickEventType] = reset

    // functions

    function handleInput(type, value) {
        if (display.innerHTML == "Infinity") { display.innerHTML = "0" }
        if (display.innerHTML.length < 15) {
            if (type == "number") {
                display.innerHTML = display.innerHTML == "0" ? value : display.innerHTML + value
            }
            else if (type == "operator") {
                if (display.innerHTML == "0") {
                    return
                }
                else if (isThereOperator(display.innerHTML)) {
                    try {
                        calculate()
                        display.innerHTML += value
                    }
                    catch {}
                }
                else {
                    display.innerHTML += value
                }
            }
        }
        if (type == "delete") {
            display.innerHTML = display.innerHTML.length == 1 ? "0" : display.innerHTML.slice(0, -1)
        }
        resizeDisplayFont()
    }

    function isThereOperator(text) {
        for (let op of operators) {
            if (text.indexOf(op) != -1) return true
        }
    }

    function resizeDisplayFont() {
        if (display.innerHTML.length > 11) {
            display.style.fontSize = "24px"
        }
        else if (display.innerHTML.length > 7) {
            display.style.fontSize = "32px"
        }
        else {
            display.style.fontSize = "48px"
        }
    }

    function calculate() {
        display.innerHTML = eval(display.innerHTML).toString().slice(0, 15)
        resizeDisplayFont()
    }

    function reset() {
        display.innerHTML = "0"
        resizeDisplayFont()
    }    
}