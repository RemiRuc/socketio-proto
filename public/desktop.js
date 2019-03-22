var socket = io.connect('http://10.137.27.2:1337')

let id = Math.floor(Math.random() * Math.floor(999999))

/** TO DO : Check if id is unique */

document.getElementById("id").innerHTML = id

socket.emit('computerConnexion', {id: id})

socket.on("mobileDisconnected", () => {
    document.getElementById('connexion-div').style.display = "block"
    document.getElementById('questions-div').style.display = "none"
})

socket.on("mobileConnected", () => {
    document.getElementById('connexion-div').style.display = "none"
    document.getElementById('questions-div').style.display = "block"
})