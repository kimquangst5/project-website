var socket = io()

// CLIENT_SEND_MESSAGE
const formChat = document.querySelector('[form-chat]');
if (formChat) {
	formChat.addEventListener("submit", (event) => {
		event.preventDefault();
		const message = event.target.elements[0].value;
		if (event.target.elements[0].value) {
			socket.emit("CLIENT_SEND_MESSAGE", message)
		}
		event.target.elements[0].value = ''
	});
}
// HẾT CLIENT_SEND_MESSAGE

// SEVER_RETURN_MESSAGE
socket.on("SEVER_RETURN_MESSAGE", (data) => {
	console.log(data)
	const div = document.createElement('div');
	div.classList.add('col-span-1')
	const formChat = document.querySelector('[form-chat]');
	if (formChat) {
		const userId = formChat.getAttribute('form-chat');
		if (userId) {
			if (userId == data.userId) {
				div.innerHTML = `
					<div class="text-right h-max flex justify-end my-[7px]"><div class="bg-[#F5F5F5] w-max rounded-[8px] p-[10px]">${data.content}</div></div>
				`
			} else {
				div.innerHTML = `
					<div><div class="font-bold text-[14px]">${data.fullName}</div><div class="rounded-[8px] bg-[#F1556A] text-[white] w-max px-[10px] py-[4px]">${data.content}</div></div>
`
			}
		}
		const appendchild = formChat.querySelector('[appendchild]');
		if (appendchild) {
			appendchild.appendChild(div)
		}
	}
	// body.appendChild(fullName)
	// body.appendChild(content)
});
// SEVER_RETURN_MESSAGE