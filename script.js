const socket = io('http://localhost:3000')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
const messageContainer = document.getElementById('message-container')

//const name = prompt('What is your name?')

function makeid(length) {
    var result = [];
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result.push(characters.charAt(Math.floor(Math.random() *
            charactersLength)));
    }
    return result.join('');
}

const name = makeid(6)
appendMessage('You joined')
socket.emit('new-user', name)

socket.on('chat-message', data => {
    appendMessage(data.message, data.name)
})

socket.on('user-connected', name => {
    appendMessage(`${name} connected`)
})

socket.on('user-disconnected', name => {
    appendMessage(`${name} disconnected`)
})

messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    appendMessage(message, name)
    socket.emit('send-chat-message', message)
    messageInput.value = ''
})

function appendMessage(message, username) {
    const messageElement = document.createElement('div')
    messageElement.style.display = "flex"
    messageElement.style.alignItems = 'center'
    messageElement.innerHTML = `
    <img src="https://www.pngkit.com/png/full/796-7963534_individuals-person-icon-circle-png.png" style="max-width: 64px; max-height: 64px; margin-left: 1rem; margin-right: 1rem"/>
    <div>
        <p>${username ?? "System"}</p>
        <p>${marked(message)}</p>
    </div>
    `
    messageContainer.append(messageElement)
    messageContainer.scrollTop = messageContainer.scrollHeight
}