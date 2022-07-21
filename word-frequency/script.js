window.onload = function () {
    const textarea = document.getElementsByTagName("textarea")[0]
    const table = document.getElementsByTagName("table")[0]

    textarea.addEventListener("input", function () {
        text = textarea.value.toLowerCase().replaceAll(/[^a-záàâãéèêíïóôõöúç]/gm, " ")
        words = text.split(" ").filter(e => e != "")
        frequency = {}
        for (let word of words) {
            if (!(word in frequency)) {
                frequency[word] = count(word, words)
            }
        }
        frequency = sort_by_frequency(frequency)

        reset_table(table)
        let index = 1
        for (let word in frequency) {
            table.insertRow()
            table.rows[index].insertCell()
            table.rows[index].insertCell()
            table.rows[index].cells[0].innerHTML = word
            table.rows[index].cells[1].innerHTML = frequency[word]
            index++
        }
    })
}

function count(string, array) {
    let times = 0
    array.forEach(element => {
        if (element === string) times += 1
    })
    return times
}

function sort_by_frequency(frequency) {
    entries = Object.entries(frequency)
    entries.sort((a, b) => b[1] - a[1])
    return Object.fromEntries(entries)
}

function reset_table(table) {
    while (table.rows.length > 1) {
        table.deleteRow(1)
    }
}