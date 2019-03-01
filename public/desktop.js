var socket = io.connect('http://localhost:1337')

let id = Math.floor(Math.random() * Math.floor(999999))

/** TO DO : Check if id is unique */

document.getElementById("id").innerHTML = id

socket.emit('computerConnexion', {id: id})

socket.on("mobileDisconnected", () => {
    console.log('mobile disconected')
})