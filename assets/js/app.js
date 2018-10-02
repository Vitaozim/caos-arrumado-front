jQuery(document).ready(function($) {
	var $lista_mainposts = $('#primeiros-posts > ul');
	var $lista_pinterest = $('#lateral aside.pinterest ul');

	if ($lista_mainposts.length > 0) {
		$lista_mainposts.masonry({
			itemSelector: '.grid-item',
			columnWidth: '.grid-sizer',
			gutter: '.gutter-sizer',
			percentPosition: true
		});
	}

	if ($lista_pinterest.length > 0) {
		$lista_pinterest.masonry({
			itemSelector: '.grid-item',
			gutter: '.gutter-sizer',
			percentPosition: true
		});
	}
});