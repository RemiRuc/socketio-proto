var socket = io.connect('http://localhost:1337')

let rooms = []

socket.on("getRoom", (data) => {
        rooms = data.data
        console.log(rooms)
})

socket.on("computerDisconnected", () => {
    console.log('computer disconected')
})

document.getElementById("form").addEventListener("submit", (event) => {
    event.preventDefault()
    let code = document.getElementById("code").value
    let i = rooms.indexOf( code )
    if (i > -1) {
        socket.emit("mobileConnexion", code)
    }
})