const inputForm = document.getElementById("input-form")
const purposeSelector = document.getElementById("purpose-selector")
const osFamilySelector = document.getElementById("os-family-selector")
const osTypeSelector = document.getElementById("os-type-selector")
const osSpecificSelector = document.getElementById("os-specific-selector")
const envSelector = document.getElementById("env-selector")
const serverIndexInput = document.getElementById("server-index-input")

let osList

const output = document.getElementById("output")

let firstNewName = true

let purposesRequest = new XMLHttpRequest()
purposesRequest.open("GET", `${window.location}/json/purpose.json`)
purposesRequest.send()
purposesRequest.responseType = "json"
purposesRequest.onload = () => {
    if(purposesRequest.status = 200) {
        for(const [abbr, uiText] of Object.entries(purposesRequest.response)) {
            let newOption = new Option(uiText, abbr)
            purposeSelector.add(newOption)
        }
    } else {
        purposesAvailable = {
            "error": "error"
        }
    }
}

let osListRequest = new XMLHttpRequest()
osListRequest.open("GET", `${window.location}/json/os.json`)
osListRequest.send()
osListRequest.responseType = "json"
osListRequest.onload = () => {
    if(osListRequest.status = 200) {
        osList = osListRequest.response
        Object.keys(osList).forEach(elem => {
            let newOption = new Option(elem, elem)
            osFamilySelector.add(newOption)
        })
    } else {
        osList = {
            "error": {
                "error": {
                    "error": "error"
                }
            }
        }
    }
}

osFamilySelector.addEventListener("change", e => {
    updateOSType()
})

function updateOSType() {
    while(osTypeSelector.children.length > 1) {
        osTypeSelector.removeChild(osTypeSelector.lastChild)
    }
    if(osFamilySelector.value) {
        Object.keys(osList[osFamilySelector.value]).forEach(key => {
            osTypeSelector.add(new Option(key, key))
        })
    } else {
        osTypeSelector.add(new Option("Please select an os family", "[os]"))
    }
    updateOsVersion()
}

osTypeSelector.addEventListener("change", e => {
    updateOsVersion()
})

function updateOsVersion() {
    while(osSpecificSelector.children.length > 1) {
        osSpecificSelector.removeChild(osSpecificSelector.lastChild)
    }
    if(osTypeSelector.value) {
        for(const [uiText, value] of Object.entries(osList[osFamilySelector.value][osTypeSelector.value])) {
            let newOption = new Option(uiText, value)
            osSpecificSelector.add(newOption)
        }
    }
}

serverIndexInput.addEventListener("change", e => {
    serverIndexInput.value = twoDigits(serverIndexInput.value)
})

inputForm.addEventListener("change", () => {newName()})
document.addEventListener("keyup", () => {newName()})

inputForm.addEventListener("submit", e => {
    e.preventDefault()
    newName()
})

function newName() {
    if(firstNewName) {
        output.innerText = `[purpose]-[env]-[index]-[os]`
        firstNewName = false
    } else {
        output.innerText = `${purposeSelector.value}-${envSelector.value}-${serverIndexInput.value}-${osSpecificSelector.value}`
    }
}

function twoDigits(number) {
    if(number.length < 2) {
        let newNum = [0, number]
        newNum = newNum.join("")
        return newNum
    } else {
        return number
    }
}

newName()
setTimeout(updateOSType, 100)