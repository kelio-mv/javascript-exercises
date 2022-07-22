window.onload = function () {
    const canvas = document.querySelector('canvas')
    const ctx = canvas.getContext('2d')
    let drawing = false

    canvas.width = document.getElementById("canvas-container").offsetWidth
    canvas.height = document.getElementById("canvas-container").offsetHeight
    ctx.lineWidth = document.getElementById("line-width").innerHTML
    ctx.lineCap = "round"

    assignEventListeners()

    // functions

    function assignEventListeners() {
        document.getElementById("decrease-width").onclick = () => {
            changeLineWidth("decrease")
        }
        document.getElementById("increase-width").onclick = () => {
            changeLineWidth("increase")
        }
        document.getElementById("color-picker").oninput = () => {
            ctx.strokeStyle = document.getElementById("color-picker").value
        }
        document.getElementById("clear-btn").onclick = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
        }

        canvas.onmousedown = (e) => {
            ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop)
            ctx.stroke()
            drawing = true
        }
        window.onmouseup = () => {
            drawing = false
            ctx.beginPath()
        }
        canvas.onmousemove = (e) => {
            if (!drawing) {
                return
            }
            ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop)
            ctx.stroke()
        }
        window.onresize = () => {
            canvas.width = document.getElementById("canvas-container").offsetWidth
            canvas.height = document.getElementById("canvas-container").offsetHeight
        }
    }

    function changeLineWidth(request) {
        if (request == "increase" && ctx.lineWidth < 9) {
            ctx.lineWidth += 1
        }
        else if (request == "decrease" && ctx.lineWidth > 1) {
            ctx.lineWidth -= 1
        }
        document.getElementById("line-width").innerHTML = ctx.lineWidth
    }
}