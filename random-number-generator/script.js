window.onload = function() {
    const input_min = document.getElementById("input-min")
    const input_max = document.getElementById("input-max")
    const generate_button = document.getElementById("generate-btn")
    const p_generated = document.getElementById("p-generated")
    
    input_min.addEventListener("input", () => {
        console.log(input_max.style.width)
        input_min.value = input_min.value.replace(/\D/g, '');
    })

    input_max.addEventListener("input", () => {
        input_max.value = input_max.value.replace(/\D/g, '');
    })

    generate_button.onclick = function() {
        let min = parseInt(input_min.value)
        let max = parseInt(input_max.value)

        if (min >= max) {
            p_generated.style.visibility = "visible"
            p_generated.innerText = `Min value cannot be equal or greater than Max value!`
        }

        else {
            let number = Math.floor(Math.random() * (max - min + 1) + min)
            p_generated.style.visibility = "visible"
            p_generated.innerText = `Your number is: ${number}`
        }
        
    }
}
