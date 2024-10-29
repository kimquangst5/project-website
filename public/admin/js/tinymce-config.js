const header = document.querySelector('header');
const variable_admin = header.getAttribute('variable')
tinymce.init({
	selector: 'textarea[textarea-mce]',
	plugins: [
		'advlist', 'autolink', 'link', 'image', 'lists', 'charmap', 'preview', 'anchor', 'pagebreak',
		'searchreplace', 'wordcount', 'visualblocks', 'visualchars', 'code', 'fullscreen', 'insertdatetime',
		'media', 'table', 'emoticons', 'help', 'autoresize'
	],
	resize: 'both',
	autoresize_bottom_margin: 50,
	autoresize: 'ON',
	max_height: 500,

	// skin: 'oxide-dark',
	images_upload_url: `/${variable_admin}/upload`,
	skin: "oxide-dark",
});