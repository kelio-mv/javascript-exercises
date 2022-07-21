window.onload = function () {
    // get html elements

    const headerText = document.getElementById("header-text")
    const user_input = {
        "hours": document.getElementById("hours"),
        "minutes": document.getElementById("minutes"),
        "seconds": document.getElementById("seconds")
    }
    const toggleButton = document.getElementById("start")
    const timer = document.getElementById("timer")
    const time_up_audio = new Audio("time_up.ogg")

    // start variables

    let startTime = null
    let totalTime = null
    let running = false
    let clickEventType = document.ontouchstart === null ? 'ontouchstart' : 'onclick'

    // binding event listeners

    for (let element of Object.values(user_input)) {
        element.oninput = checkInput
    }
    toggleButton[clickEventType] = toggleState

    // functions

    function checkInput() {
        for (let element of Object.values(user_input)) {
            element.value = element.value.replace(/\D/g, '')
            element.value = element.value.substring(0,2)
        }
        if (user_input["hours"].value > 23) user_input["hours"].value = 23
        if (user_input["minutes"].value > 59) user_input["minutes"].value = 59
        if (user_input["seconds"].value > 59) user_input["seconds"].value = 59
    }
    
    function toggleState() {
        if (running) {
            running = false
        }
        else {
            totalTime = getTotalTime()
            
            if (totalTime > 0) {
                headerText.innerHTML = "Countdown Timer"
                toggleButton.value = "Stop"
                startTime = new Date().getTime()
                running = true
                runTimer()
            }
            else {
                alert("You must set at least 1 second of countdown!")
            }
        }
        
    }

    function runTimer() {
        if (running) {
            let elapsedTime = (new Date().getTime() - startTime) / 1000
            let remainingTime = Math.ceil(totalTime - elapsedTime)

            if (remainingTime > 0) {
                let remaining = {}

                remaining["hours"] = Math.floor(remainingTime/3600)
                remainingTime -= remaining["hours"]*3600

                remaining["minutes"] = Math.floor(remainingTime/60)
                remainingTime -= remaining["minutes"]*60

                remaining["seconds"] = remainingTime
                
                timer.innerHTML = getRemainingText(remaining)
                setTimeout(runTimer, 100)
            }
            else {
                timer.innerHTML = "00:00:00"
                toggleButton.value = "Start"
                headerText.innerHTML = "Time's over!"
                time_up_audio.play()
                running = false
            }
        }
        else {
            timer.innerHTML = "00:00:00"
            toggleButton.value = "Start"
        }
        
    }

    function getTotalTime() {
        let h = user_input["hours"].value ? parseInt(user_input["hours"].value) : 0
        let m = user_input["minutes"].value ? parseInt(user_input["minutes"].value) : 0
        let s = user_input["seconds"].value ? parseInt(user_input["seconds"].value) : 0
        return 3600*h + 60*m + s
    }

    function getRemainingText(remaining) {
        for (let key in remaining) {
            remaining[key] = ("0" + remaining[key]).slice(-2)
        }
        return `${remaining["hours"]}:${remaining["minutes"]}:${remaining["seconds"]}`
    }
}