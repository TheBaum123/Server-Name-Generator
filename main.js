const inputForm = document.getElementById("input-form")
const purposeSelector = document.getElementById("purpose-selector")

const envSelector = document.getElementById("env-selector")
const serverIndexInput = document.getElementById("server-index-input")


const output = document.getElementById("output")

let firstNewName = true

let purposesRequest = new XMLHttpRequest()
purposesRequest.open("GET", "/json/purpose.json")
purposesRequest.send()
purposesRequest.responseType = "json"
purposesRequest.onload = () => {
    if(purposesRequest.status = 200) {
        for(const [abbr, uiText] of Object.entries(purposesRequest.response)) {
            let newOption = document.createElement("option")
            newOption.value = abbr
            newOption.id = `${abbr}-option`
            purposeSelector.appendChild(newOption)
            document.getElementById(`${abbr}-option`).innerText = uiText
        }
    } else {
        purposesAvailable = {
            "error": "error"
        }
    }
}

serverIndexInput.addEventListener("change", e => {
    if(serverIndexInput.value.length < 2) {
        serverIndexInput.value = twoDigits(serverIndexInput.value)
    }
})

inputForm.addEventListener("change", e => {
    newName()
})

inputForm.addEventListener("submit", e => {
    e.preventDefault()
    newName()
})

function newName() {
    if(firstNewName) {
        output.innerText = `[purpose]-[os]-[env]-[index]`
        firstNewName = false
    } else {
        output.innerText = `${purposeSelector.value}-[os]-${envSelector.value}-${serverIndexInput.value}`
    }
}

function twoDigits(number) {
    if(number.length < 2) {
        let newNum = [0, number]
        newNum = newNum.join("")
        return newNum
    }
}

document.addEventListener("load", newName())