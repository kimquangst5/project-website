// Fillter Status
const buttonStatus = document.querySelectorAll(`button[button-status]`);
if (buttonStatus.length > 0) {
	let url = new URL(window.location.href);
	buttonStatus.forEach(button => {
		button.addEventListener('click', () => {
			const status = button.getAttribute('button-status') || '';
			url.searchParams.delete('page')
			if (status) {
				url.searchParams.set('status', status)
			} else {
				url.searchParams.delete('status')
			}
			window.location.href = url.href;
		});
	});
	const statusCurrent = url.searchParams.get('status') || '';
	const buttonStatusCurrent = document.querySelector(`button[button-status = '${statusCurrent}']`);
	buttonStatusCurrent.classList.add('bg-[#FA6B04]', 'text-[white]')
}
// End Fillter Status

// Search
const formSearch = document.querySelector(`form[form-search]`);
if (formSearch) {
	let url = new URL(window.location.href)
	formSearch.addEventListener('submit', (event) => {
		event.preventDefault();
		const value = event.target.elements[0].value;
		if (value) {
			url.searchParams.set('key', value)
		} else {
			url.searchParams.delete('key')
		}
		window.location.href = url.href
	});
}
// End Search

// Pagination
const buttonPagination = document.querySelectorAll(`li[button-pagination]`);

if (buttonPagination.length > 0) {
	let url = new URL(window.location.href);
	buttonPagination.forEach(button => {
		button.addEventListener('click', () => {
			const value = button.getAttribute('button-pagination') || '';
			if (value) {
				url.searchParams.set('page', value);
			} else {
				url.searchParams.delete('page');
			}
			window.location.href = url.href;
		});
	});
	const valueCurrent = url.searchParams.get('page') || '1';
	const buttonPagiCurr = document.querySelector(`li[button-pagination = '${valueCurrent}' ]`);
	buttonPagiCurr.classList.add('bg-[#FA6B04]', 'text-[white]')
}

const pagination = document.querySelector(`ul[phanTrang]`);

if (pagination) {
	const value = pagination.getAttribute('phanTrang');
	const totalPage = pagination.getAttribute('totalPage');
	if (value == 0 || totalPage == 1) {
		pagination.style.display = 'none'
	}
}

const buttonAnglesLeft = document.querySelector(`li[button-angles-left]`);
if (buttonAnglesLeft) {
	let url = new URL(window.location.href);
	buttonAnglesLeft.addEventListener('click', () => {
		url.searchParams.delete('page')
		window.location.href = url.href
	});
}

const buttonAnglesRight = document.querySelector(`li[button-angles-right]`);
if (buttonAnglesRight) {
	let url = new URL(window.location.href);
	buttonAnglesRight.addEventListener('click', () => {
		const value = buttonAnglesRight.getAttribute('button-angles-right')
		url.searchParams.set('page', value)
		window.location.href = url.href
	});
}

const buttonAngleLeft = document.querySelector(`li[button-angle-left]`);
if (buttonAngleLeft) {
	let url = new URL(window.location.href);
	buttonAngleLeft.addEventListener('click', () => {
		const value = buttonAngleLeft.getAttribute('button-angle-left')
		url.searchParams.set('page', value - 1)
		window.location.href = url.href
	});
}

const buttonAngleRight = document.querySelector(`li[button-angle-right]`);
if (buttonAngleRight) {
	let url = new URL(window.location.href);
	buttonAngleRight.addEventListener('click', () => {
		const value = buttonAngleRight.getAttribute('button-angle-right')
		url.searchParams.set('page', parseInt(value) + 1)
		window.location.href = url.href
	});
}
// Hết Pagination

// Change Status
const buttonChangeStatus = document.querySelectorAll(`button[link]`);

if (buttonChangeStatus.length > 0) {
	buttonChangeStatus.forEach(button => {
		button.addEventListener('click', () => {
			let link = button.getAttribute('link');
			fetch(link, {
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
					},
				})
				.then(res => res.json())
				.then(data => {
					if (data.code == 200) {
						window.location.reload();
					}
				})
		});


	});
}
// Hết Change Status

// Change Status Many Product
const checkAll = document.querySelector(`[name="checkAll"]`);
if(checkAll){
	checkAll.addEventListener('click', () => {
		const checkItem = document.querySelectorAll(`input[name="checkItem"]`);
		if(checkItem.length > 0){
			checkItem.forEach(item => {
				item.checked = checkAll.checked
			});
		}
	});
}

const checkItem = document.querySelectorAll(`input[name="checkItem"]`);
if(checkItem.length > 0){
	checkItem.forEach(item => {
		item.addEventListener('click', () => {
			let itemChecked = document.querySelectorAll(`input[name="checkItem"]:checked`);
			
			if(itemChecked.length == checkItem.length){
				checkAll.checked = true
			}
			else{
				checkAll.checked = false
			}
		});
	});
}

const tickItem = document.querySelectorAll(`[tickItem]`);
if(tickItem.length > 0){
	tickItem.forEach(item => {
		item.addEventListener('click', () => {
			const parent = item.parentElement;
			const input = parent.querySelector('input');
			input.checked = !input.checked
			let itemChecked = document.querySelectorAll(`input[name="checkItem"]:checked`);
			
			if(itemChecked.length == checkItem.length){
				checkAll.checked = true
			}
			else{
				checkAll.checked = false
			}
			// input.checked = !input.checked
		});
	});
}
// Hết Change Status Many Product

// Box Actions
const boxActions = document.querySelector(`[box-actions]`);
if(boxActions){
	const button = boxActions.querySelector('button');
	if(button){
		button.addEventListener('click', () => {
			const select = boxActions.querySelector('select');
			const value = select.value;
			let itemChecked = document.querySelectorAll(`input[name="checkItem"]:checked`);
			let ids = [];
			if(value && itemChecked.length > 0){
				itemChecked.forEach(input => {
					ids.push(input.value);
				});
				const data = {
					status: value,
					ids: ids
				};
				
				const link = boxActions.getAttribute('box-actions');
				fetch(link, {
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(data),
				})
					.then(res => res.json())
					.then(data => {
						if(data.code == 200){
							window.location.reload();
						}
						
					})
			}
		});
	}
}
// Hết Box Actions

// Xóa bản ghi
const buttonDelete = document.querySelectorAll(`[button-delete]`);
if(buttonDelete.length > 0){
	buttonDelete.forEach(button => {
		button.addEventListener('click', () => {
			const link = button.getAttribute('button-delete');
			
			fetch(link, {
				method: 'PATCH'
			})
				.then(res => res.json())
				.then(data => {
					if(data.code == 200)
						window.location.reload();
				})
		});
	});
}
// Xóa bản ghi

// Khôi phục bản ghi
const buttonRestore = document.querySelectorAll(`button[restore]`);
if(buttonRestore.length > 0){
	buttonRestore.forEach(button => {
		button.addEventListener('click', () => {
			const id = button.getAttribute('restore');
			fetch(`/admin/product/trash/${id}`, {
				method: 'PATCH',
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then(res => res.json())
				.then(data => {
					if(data.code == 200){
						window.location.reload();
					}
				})
			
		});
	});
}
// Hết Khôi phục bản ghi

// Xóa vĩnh viễn bản ghi
const permanentlyDelete = document.querySelectorAll(`button[permanently-delete]`);
if(permanentlyDelete.length > 0){
	permanentlyDelete.forEach(button => {
		button.addEventListener('click', () => {
			const id = button.getAttribute('permanently-delete');
			fetch(`/admin/product/trash/${id}`, {
				method: 'DELETE',
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then(res => res.json())
				.then(data => {
					if(data.code == 200){
						window.location.reload();
					}
				})
			
		});
	});
}
// Hết Xóa vĩnh viễn bản ghi

// Thay đổi vị trí sản phẩm
const listPosition = document.querySelectorAll(`input[name="position"]`);

if(listPosition.length > 0){
	listPosition.forEach(input => {
		input.addEventListener('change', () => {
			const link = input.getAttribute('link');
			const position = parseInt(input.value);

			const data = {
				position: position
			}
			
			fetch(link, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data)
			})
				.then(res => res.json())
				.then(data => {
					location.reload();
				})
		});
	});
}
// Hết Thay đổi vị trí sản phẩm

// Show Alert
const showAlert = document.querySelector(`[show-alert]`);
if(showAlert){
	let time = showAlert.getAttribute('show-alert') || 1000;
	const times = parseInt(time)
	
	setTimeout(() => {
		showAlert.classList.add('hidden')
	}, times);
}
// Hết Show Alert

const upploadImage = document.querySelector(`[upload-image]`);

if(upploadImage){
	const input = upploadImage.querySelector(`[upload-image-input]`);
	const images = upploadImage.querySelector(`img`);
	input.addEventListener('change', () => {
		const file = input.files[0];
		
		if(file){
			images.src = URL.createObjectURL(file)
		}
	});
	// images.addEventListener('click', () => {
	// 	const link = images.src;
	// 	window.open(link, '_blank');
	// });
}