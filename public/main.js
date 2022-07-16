
const socket = io.connect()

socket.on('messages', (data) =>{
    render(data)
})

function render(data) {
    let html = data.map( (elem, index) =>{
        return(
            `<div>
                <stronge>${elem.author} </stronge>
                <em>${elem.text}</em>
            </div>`
        )
    }).join(' ')

    document.getElementById('messages').innerHTML = html // Insertamos el mensaje en el div del HTML
}

function addMessage() {
    let mensaje = {
        author: document.getElementById('nombre').value,
        text: document.getElementById('texto').value
    }

    socket.emit( 'new-message',mensaje ) // new-message  es el nombre del evento (recordar)


    document.getElementById('texto').focus()  // al enviar no deja el cursor en el texto


    return false // Nos permite que no se recargue la pagina
}