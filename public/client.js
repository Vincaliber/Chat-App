const socket = io();

let name;
let textarea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message__area');
do {
    name = prompt('Enter your name');
} while (!name);

textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value);
    }
})

function sendMessage(msg) {
    let message = {
        user: name,
        message: msg.trim()
    }

    // Append
    appendMessage(message, 'outgoing');
    textarea.value = '';
    scrollToBottom();

    //send to server
    socket.emit('message', message);
}

function appendMessage(message, type) {
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className, 'message');

    let markup = `
        <h4>${message.user}</h4>
        <p>${message.message}</p>
    `
    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv);


}


// Receive messages
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming');
    scrollToBottom() ;
})

function scrollToBottom() {
    messageArea.scrollTop=messageArea.scrollHeight;
}