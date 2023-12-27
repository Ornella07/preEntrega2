// const container = document.getElementById("cardContainer");


console.log('Mensaje del lado del cliente'); 

document.addEventListener("DOMContentLoaded", () => {

    const messages = document.getElementById('messages');
    const form = document.getElementById('form');
    const input = document.getElementById('input');
    const socket = io();

//?Enviar Mensaje mediante Chat
form.addEventListener('submit', (e)=> {
    e.preventDefault();
    const message = input.value.trim();
    if(message !== ''){
        socket.emit('Chat Message', message);
        input.value = '';
    }
});




socket.on('chat message', (msg) => {
    const item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
    });
});