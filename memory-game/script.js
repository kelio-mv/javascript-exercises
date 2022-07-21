window.onload = function () {
    const fruits = ["banana", "apple", "orange", "lemon", "watermelon", "pineapple", "grape", "avocado"]
    const shuffledFruits = shuffle(fruits.concat(fruits))
    const elements = document.getElementsByClassName("element")
    const selectedElements = []
    const clickType = document.ontouchstart === null ? 'ontouchstart' : 'onclick'
    setupElements()

    // functions

    function shuffle(array) {
        let currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex != 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    function setupElements() {
        const elementsArr = Array.from(elements)
        elementsArr.forEach(
            (element, index) => {
                element.querySelector("img").src = `img/${shuffledFruits[index]}.png`
                element.id = index
                element[clickType] = onClick
            }
        )
    }

    function onClick(event) {
        const id = event.currentTarget.id
        const element = elements[id].querySelector("img")

        if (
            selectedElements.length < 2 &&
            selectedElements.indexOf(element) == -1 &&
            element.className != "visible"
        ) {
            selectedElements.push(element)
            element.style.display = "inline-block"

            if (selectedElements.length == 2) {
                if (selectedElements[0].src == selectedElements[1].src) {
                    makeSelectedVisible()
                    checkGameState()
                }
                else {
                    setTimeout(clearSelected, 1000)
                }
            }
        }
    }

    function makeSelectedVisible() {
        selectedElements[0].className = "visible"
        selectedElements[1].className = "visible"
        selectedElements.length = 0
    }

    function clearSelected() {
        for (let element of selectedElements) {
            element.style.display = "none"
        }
        selectedElements.length = 0
    }

    function checkGameState() {
        if (document.getElementsByClassName("visible").length == shuffledFruits.length) {
            alert("Congratulations! You won!")
            setTimeout(
                () => { location.reload() }, 3000
            )
        }
    }
}