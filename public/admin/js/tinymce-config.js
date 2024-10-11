tinymce.init({
	selector: 'textarea[textarea-mce]',
	plugins: [
		'advlist', 'autolink', 'link', 'image', 'lists', 'charmap', 'preview', 'anchor', 'pagebreak',
		'searchreplace', 'wordcount', 'visualblocks', 'visualchars', 'code', 'fullscreen', 'insertdatetime',
		'media', 'table', 'emoticons', 'help'
	],
	// skin: 'oxide-dark',
	images_upload_url: '/admin/upload',
});