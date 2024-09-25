var socket = io()

// CLIENT_SEND_MESSAGE
const formChat = document.querySelector('[form-chat]');
if(formChat){
	formChat.addEventListener("submit", (event) => {
		event.preventDefault();
		const message = event.target.elements[0].value;
		if(event.target.elements[0].value){
			socket.emit("CLIENT_SEND_MESSAGE", message)
		}
		event.target.elements[0].value = ''
	});
}
// HẾT CLIENT_SEND_MESSAGE