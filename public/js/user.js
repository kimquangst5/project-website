const boxUser = document.querySelectorAll('[box-user]');
if (boxUser.length > 0) {
	boxUser.forEach(box => {
		const add = box.querySelector("[btn-add-friend]");
		const cancel = box.querySelector("[btn-cancel-friend]");
		if (add) {
			add.addEventListener('click', () => {
				add.classList.toggle('hidden')
				cancel.classList.toggle('hidden')
				const id = add.getAttribute('btn-add-friend');
				if (id) {
					console.log(id)
					socket.emit("CLIENT_ADD_FRIEND", id)
				}
			});
		}
		if (cancel) {
			cancel.addEventListener('click', () => {
				console.log(cancel)
				add.classList.toggle('hidden')
				cancel.classList.toggle('hidden')
				const id = cancel.getAttribute('btn-cancel-friend');
				if (id) {
					console.log(id)
					socket.emit("CLIENT_CANCEL_FRIEND", id)
				}
			});
		}


		const accept = box.querySelector("[btn-accept-friend]");
		const refuse = box.querySelector("[btn-refuse-friend]");
		const refused = box.querySelector("[btn-refused-friend]");
		const message = box.querySelector("[btn-message-friend]");
		if (accept) {
			accept.addEventListener('click', () => {
				message.classList.toggle('hidden')
				accept.classList.toggle('hidden')
				refuse.classList.toggle('hidden')
				const id = accept.getAttribute('btn-accept-friend');
				if (id) {
					console.log(id)
					socket.emit("CLIENT_ACCEPT_FRIEND", id)
				}
			});
			refuse.addEventListener('click', () => {
				accept.classList.toggle('hidden')
				refuse.classList.toggle('hidden')
				refused.classList.toggle('hidden')
				const id = refuse.getAttribute('btn-refuse-friend');
				if (id) {
					console.log(id)
					socket.emit("CLIENT_REFUSE_FRIEND", id)
				}
			});
		}
	});
}

socket.on("SEVER_RETURN_REQUEST_LENGTH", (data) => {
	console.log(data)
	const idData = data.id
	const lengthData = data.length
	if (data) {
		const lisFriend = document.querySelector('[list-friend]');
		if (lisFriend) {
			const idRequestEle = lisFriend.querySelector('[id-request]');
			if (idRequestEle) {
				const idRequest = idRequestEle.getAttribute('id-request');
				if (idRequest) {
					if (idRequest == idData) {
						idRequestEle.innerHTML = lengthData
					}
				}
			}
		}
	}
})

socket.on("SEVER_RETURN_ACCEPT_LENGTH", (data) => {
	console.log(data)
	const idData = data.id
	const lengthData = data.length
	if (data) {
		const lisFriend = document.querySelector('[list-friend]');
		if (lisFriend) {
			const idAcceptEle = lisFriend.querySelector('[id-accept]');
			if (idAcceptEle) {
				const idAccept = idAcceptEle.getAttribute('id-accept');
				if (idAccept) {
					if (idAccept == idData) {
						idAcceptEle.innerHTML = lengthData
					}
				}
			}
		}
	}
})