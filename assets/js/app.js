jQuery(document).ready(function($) {
	var $lista_mainposts = $('#primeiros-posts > ul');

	if ($lista_mainposts.length > 0) {
		$lista_mainposts.masonry({
			itemSelector: '.grid-item',
			columnWidth: '.grid-sizer',
			gutter: '.gutter-sizer',
			percentPosition: true
		});
	}
});