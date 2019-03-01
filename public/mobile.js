var socket = io.connect('http://localhost:1337')

let rooms = []

socket.on("getRoom", (data) => {
        rooms = data.data
        console.log(rooms)
})

socket.on("computerDisconnected", () => {
    document.getElementById('connexion-div').style.display = "block"
    document.getElementById('questions-div').style.display = "none"
    console.log('computer disconected')
})

socket.on("mobileConnected", () => {
    document.getElementById('connexion-div').style.display = "none"
    document.getElementById('questions-div').style.display = "block"
})

document.getElementById("form").addEventListener("submit", (event) => {
    let code = document.getElementById("code").value
    let i = rooms.indexOf( code )
    if (i > -1) {
        socket.emit("askMobileConnexion", code)
    }
    event.preventDefault()
    return false
})