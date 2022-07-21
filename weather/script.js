window.onload = function() {
    const inputElement = document.getElementById("user-input")
    const outputContainer = document.getElementsByClassName("output")[0]
    const outputElements = {
        "location": document.getElementById("location"),
        "time": document.getElementById("time"),
        "temperature": document.getElementById("temperature"),
        "weather-condition": document.getElementById("weather-condition"),
        "weather-condition-icon": document.getElementById("weather-condition-icon")
    }
    document.getElementById("search-btn").onclick = search

    function search() {
        const request = new XMLHttpRequest()
        const city = inputElement.value
        
        request.open("GET", `http://api.weatherapi.com/v1/current.json?key=a914a0bb74bf4871953122731222007&q=${city}&aqi=no`)
        request.send()
        request.onload = function() {
            if (request.status == 200) {
                data = JSON.parse(request.responseText)
                outputElements["location"].innerHTML = `${data.location.name}, ${data.location.region}, ${data.location.country}`
                outputElements["time"].innerHTML = `${data.location.localtime.split(" ")[1]}`
                outputElements["temperature"].innerHTML = `${parseInt(data.current.temp_c)}º C`
                outputElements["weather-condition"].innerHTML = data.current.condition.text
                outputElements["weather-condition-icon"].src = data.current.condition.icon
                outputContainer.style.visibility = "visible"
            }
            else {
                alert("Error! Couldn't get location data")
            }
        }
    }
}