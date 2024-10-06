import * as Popper from 'https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js'


const elementChat = document.querySelector('[element-chat]');

// Typing
if(elementChat){
	const input = elementChat.querySelector(`form input`);
	if (input) {
		var typingTimeOut;
		input.addEventListener("input", (event) => {
			socket.emit("CLIENT_SEND_TYPING", "show")
	
			clearTimeout(typingTimeOut)
	
			typingTimeOut = setTimeout(() => {
				socket.emit("CLIENT_SEND_TYPING", "hidden")
			}, 3000);
		});
		input.addEventListener("blur", (event) => {
			socket.emit("CLIENT_SEND_TYPING", "hidden")
		});
	}
}
// Hết Typing

// CLIENT_SEND_MESSAGE
if (elementChat) {
	new Viewer(elementChat)
	const upload = new FileUploadWithPreview.FileUploadWithPreview('upload-many-images', {
		multiple: true,
		maxFileCount: 6
	});

	const form = elementChat.querySelector("form");
	if (form) {
		form.addEventListener("submit", (event) => {
			event.preventDefault();

			const message = event.target.elements[0].value || '';
			const imgaes = upload.cachedFileArray
			if (message || imgaes.length > 0) {
				socket.emit("CLIENT_SEND_MESSAGE", {
					message: message,
					imgaes: imgaes
				})
			}
			event.target.elements[0].value = ''
			upload.resetPreviewPanel(); // clear all selected images

			socket.emit("CLIENT_SEND_TYPING", "hidden")
		});
		const appendchild = elementChat.querySelector('[appendchild]');
		if (appendchild) {
			appendchild.scrollTop = appendchild.scrollHeight

		}
	}

}
// HẾT CLIENT_SEND_MESSAGE

if(elementChat){
	const listTyping = elementChat.querySelector('[list-typing]');
	socket.on("SERVER_RETURN_TYPING", (data) => {
		const checkExsit = listTyping.querySelector(`[user-id = "${data.userId}"]`)
	
		if (data.type == 'show') {
			if (!checkExsit) {
				if (listTyping) {
					const boxTyping = document.createElement('div');
					boxTyping.setAttribute("user-id", data.userId)
					boxTyping.innerHTML = `
						<div>${data.fullName}</div>
						<div class="bg-[#D0D0D0] loading-typing rounded-[10px] w-max px-[10px]" typing-animate=""><span></span><span></span><span></span></div>
					`
					listTyping.appendChild(boxTyping)
				}
			}
		} else {
			const deleted = listTyping.querySelector(`[user-id = "${data.userId}"]`)
			if (deleted) {
				listTyping.removeChild(deleted)
	
			}
		}
	});
}


// Hết Typing



// // SEVER_RETURN_MESSAGE
socket.on("SEVER_RETURN_MESSAGE", (data) => {
	console.log(data)
	const div = document.createElement('div');
	div.classList.add('h-max')
	div.classList.add('w-1/2')
	div.classList.add('p-[5px]')
	const elementChat = document.querySelector('[element-chat]');
	if (elementChat) {
		const userId = elementChat.getAttribute('element-chat');
		let htmlFullName = "";
		let htmlContent = '';
		let htmlImage = '';

		if (userId) {
			const appendchild = elementChat.querySelector('[appendchild]');
			if (userId == data.userId) {
				div.classList.add('ml-auto')
				div.classList.add('flex')
				div.classList.add('justify-end')
				if (data.content) {
					htmlContent = `<div class="w-max text-justify text-wrap text-[white] bg-[#F9005A] rounded-[15px] p-[10px] select-all">${data.content}</div>`
				}
				if (data.images) {
					if (data.images.length > 0) {
						htmlImage += `<div class="flex gap-[10px] justify-end">`
						for (const image of data.images) {
							htmlImage += `<img class="h-[50px] aspect-square rounded-[10px] cursor-pointer" src="${image}" alt="Kim Quang | Preview Ảnh">`
						}
						htmlImage += `</div>`
					}

				}

				htmlFullName = `
					${htmlContent}
					${htmlImage}
					`
			} else {
				if (data.content) {
					htmlContent = `<div class="rounded-[8px] bg-[#F6F6F6] text-justify px-[10px] py-[4px]">${data.content}</div>`
				}
				if(data.images){
					if (data.images.length > 0) {
						htmlImage += `<div class="flex gap-[10px]">`
						for (const image of data.images) {
							htmlImage += `<img class="h-[50px] aspect-square rounded-[10px] cursor-pointer" src="${image}" alt="Kim Quang | Preview Ảnh">`
						}
						htmlImage += `</div>`
					}
				}
				
				htmlFullName = `
					<div class="font-bold text-[14px]">${data.fullName}</div>
					${htmlContent}
					${htmlImage}
				`
			}
			console.log(htmlFullName)
			div.innerHTML = htmlFullName
			appendchild.appendChild(div)
			new Viewer(div)
			if (userId == data.userId) {
				appendchild.scrollTop = appendchild.scrollHeight
			}
		}
	}
});
// SEVER_RETURN_MESSAGE


const emojiPicker = document.querySelector('emoji-picker');
if (emojiPicker) {
	emojiPicker.addEventListener('emoji-click', (event) => {
		const elementChat = document.querySelector('[element-chat]');
		if (elementChat) {
			const form = elementChat.querySelector('form')
			if (form) {
				const input = form.querySelector(`input`);
				if (input) {
					input.value = input.value + event.detail.unicode
				}

			}
		}

	});
}

if (elementChat) {
	const form = elementChat.querySelector('form')
	if (form) {
		const iconFaceSmile = form.querySelector("[icon-face-smile]");
		if (iconFaceSmile) {

			const tooltip = elementChat.querySelector(`[role="tooltip"]`);
			Popper.createPopper(iconFaceSmile, tooltip);
			// tooltip.classList.toggle('hidden');
			iconFaceSmile.addEventListener("click", () => {
				// tooltip.classList.toggle('shown');
				if (tooltip) {
					tooltip.classList.toggle('hidden');
				}
			});
		}
	}

}


if (elementChat) {
	const iconUpImage = elementChat.querySelector('[icon-up-image]');
	if (iconUpImage) {
		const input = elementChat.querySelector(`input#file-upload-with-preview-upload-many-images`)
		const dataUploadId = elementChat.querySelector("[data-upload-id='upload-many-images']");
		new Viewer(dataUploadId)
		const lable = dataUploadId.querySelector('.label-container');
		const inputcontai = dataUploadId.querySelector('.input-container');
		if (inputcontai && lable) {
			lable.classList.add('hidden');
			inputcontai.classList.add('hidden');
		}
		iconUpImage.addEventListener('click', () => {
			if (input) {
				input.click();
			}
		});
	}
}

