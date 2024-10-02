// const boxUser = document.querySelectorAll('[box-user]');
// if(boxUser.length > 0){
// 	boxUser.forEach(box => {
// 		const add = box.querySelector("[btn-add-friend]");
// 		const cancel = box.querySelector("[btn-cancel-friend]");
// 		if(add){
// 			add.addEventListener('click', () => {
// 				add.classList.toggle('hidden')
// 				cancel.classList.toggle('hidden')
// 				const id = add.getAttribute('btn-add-friend');
// 				if(id){
// 					console.log(id)
// 					socket.emit("CLIENT_ADD_FRIEND", id)
// 				}
// 			});
// 			cancel.addEventListener('click', () => {
// 				add.classList.toggle('hidden')
// 				cancel.classList.toggle('hidden')

// 			});
// 		}
// 	});
// }