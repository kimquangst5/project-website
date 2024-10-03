const boxUser = document.querySelectorAll('[box-user]');
if(boxUser.length > 0){
	boxUser.forEach(box => {
		const add = box.querySelector("[btn-add-friend]");
		const cancel = box.querySelector("[btn-cancel-friend]");
		if(add){
			add.addEventListener('click', () => {
				add.classList.toggle('hidden')
				cancel.classList.toggle('hidden')
				const id = add.getAttribute('btn-add-friend');
				if(id){
					console.log(id)
					socket.emit("CLIENT_ADD_FRIEND", id)
				}
			});
			cancel.addEventListener('click', () => {
				add.classList.toggle('hidden')
				cancel.classList.toggle('hidden')
				const id = cancel.getAttribute('btn-cancel-friend');
				if(id){
					console.log(id)
					socket.emit("CLIENT_CANCEL_FRIEND", id)
				}
			});
		}

		const accept = box.querySelector("[btn-accept-friend]");
		const refuse = box.querySelector("[btn-refuse-friend]");
		const refused = box.querySelector("[btn-refused-friend]");
		const message = box.querySelector("[btn-message-friend]");
		if(accept){
			accept.addEventListener('click', () => {
				message.classList.toggle('hidden')
				accept.classList.toggle('hidden')
				refuse.classList.toggle('hidden')
				const id = accept.getAttribute('btn-accept-friend');
				if(id){
					console.log(id)
					socket.emit("CLIENT_ACCEPT_FRIEND", id)
				}
			});
			refuse.addEventListener('click', () => {
				accept.classList.toggle('hidden')
				refuse.classList.toggle('hidden')
				refused.classList.toggle('hidden')
				const id = refuse.getAttribute('btn-refuse-friend');
				if(id){
					console.log(id)
					socket.emit("CLIENT_REFUSE_FRIEND", id)
				}
			});
		}
	});
}