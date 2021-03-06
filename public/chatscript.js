const socket = io('/')

var roomsgs=document.getElementById('messages')
var textmsg=document.getElementById('textarea')
var username = document.getElementById('usertext')

socket.emit('join-chatRoom', CHATROOM_ID)
console.log("inx chat script")
socket.on('load msgs', function(docs) {
    for (var i=0; i < docs.length; i++) {
        displayMsg(docs[i]);
    }
});

function displayMsg (data) {
    var message = document.createElement('div');
    message.setAttribute('class', 'chat-message');
    message.textContent = data.name+":  " +data.message;
    roomsgs.appendChild(message);
    // roomsgs.insertBefore(message, messages.firstChild);
    // roomsgs.appendChild('<span class="msg"><b>' + data.name + ': </b>' + data.message + "</span><br/>");
}

//To emit messages when pressed enter
textmsg.addEventListener('keydown', function(event){
    if(event.which === 13 && event.shiftKey == false){
        // Emit to server input
        socket.emit('input', {
            name:username.value,
            message:textmsg.value
        });

        textmsg.value = ''
        event.preventDefault();
    }
})

function sendmsg(){
    socket.emit('input', {
        name:username.value,
        message:textmsg.value
    });
    textmsg.value = ''
}

socket.on('output', function(data){

    console.log("in out" , data);
    console.log(data.length)
    // Build out message div
    var message = document.createElement('div');
    message.setAttribute('class', 'chat-message');
    message.textContent = data.name+ ": " +data.message;
    roomsgs.appendChild(message);
    roomsgs.insertBefore(message, roomsgs.firstChild);
        
});