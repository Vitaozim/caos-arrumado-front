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


	var $slider = $('#slider-principal');
	if ($slider.length > 0) {
		var $slides = $slider.find('section');
		var currentSlide = 1;
		var nSlides = $slides.length;
		var $navBullets = $slider.find('.bullets button');
		var $navNextPrev = $slider.find('.next-prev button');
		var transitandoSlide = false;

		var trocarSlider = function(futureSlide){
			transitandoSlide = true;
			$slides.eq(futureSlide-1).addClass('before-atual');
			$slides.eq(currentSlide-1).addClass('deixando-atual')
			.find('h2').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
				$slides.eq(currentSlide-1).removeClass('db atual before-atual deixando-atual');
				$slides.eq(futureSlide-1).addClass('db');
				setTimeout(function(){
					$slides.eq(futureSlide-1).addClass('atual');

				}, 50);
			});
		}

		setTimeout(function(){
			console.log('foi');
			trocarSlider(4);
		}, 1000);
	}
});







