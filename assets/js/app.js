jQuery(document).ready(function($) {



	// Masonry
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



	// Slider
	var $slider = $('#slider-principal');
	if ($slider.length > 0) {
		var $slides = $slider.find('section');
		var currentSlide = 1;
		var nSlides = $slides.length;
		var $navBullets = $slider.find('.bullets button');
		var $navNextPrev = $slider.find('.next-prev button');
		var transitandoSlide = false;

		var transitionendPrefixed = 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend';

		var trocarSlider = function(futureSlide){
			var $currentSlide = $slides.eq(currentSlide-1);
			var $futureSlide = $slides.eq(futureSlide-1);
			transitandoSlide = true;
			var h2saiu = false;
			$futureSlide.addClass('before-atual');
			$currentSlide.addClass('deixando-atual')
			.find('h2').on(transitionendPrefixed, function(){
				if (!h2saiu) {
					h2saiu = true;
					$navBullets.removeClass('atual').eq(futureSlide-1).addClass('atual');
					$currentSlide.removeClass('db atual before-atual deixando-atual');
					$futureSlide.addClass('db');
					setTimeout(function(){
						var h2entrou = false;
						$futureSlide.addClass('atual')
						.find('h2').on(transitionendPrefixed, function(){
							if (!h2entrou) {
								h2entrou = true;
								$futureSlide.removeClass('before-atual');
								currentSlide = futureSlide;
								transitandoSlide = false;
							}
						});
					}, 50);	
				}
			});
		}

		$navBullets.on('click', function(event) {
			if (!transitandoSlide && !$(this).hasClass('atual')) {
				var indexBulletClicado = $navBullets.index($(this))+1;
				trocarSlider(indexBulletClicado);
			}
		});

		$navNextPrev.on('click', function(event) {
			if (!transitandoSlide) {
				if ($(this).hasClass('prev')) {
					if (currentSlide > 1) {
						trocarSlider(currentSlide-1);					
					} else{
						trocarSlider(nSlides);
					}
				} else if ($(this).hasClass('next')){
					if (currentSlide < nSlides) {
						trocarSlider(currentSlide+1);					
					} else{
						trocarSlider(1);
					}
				}
			}
		});
	}



	// Submenus
	var $submenus = $('#menuglobal .submenu');

	$submenus.each(function(index, el) {
		var $subcategorias = $(el).find('.subcateg > a');
		var $conjPosts = $(el).find('.posts');
		$subcategorias.removeClass('atual').first().addClass('atual');
		$conjPosts.addClass('dn').first().removeClass('dn');

		$subcategorias.on('mouseenter', function(event) {
			$subcategorias.removeClass('atual');
			$(this).addClass('atual');
			var thisIndex = $subcategorias.index($(this));
			$conjPosts.addClass('dn').eq(thisIndex).removeClass('dn');
		});
	});




	// Botao do menu
	var $btmenu = $('#menuglobal .telas-pequenas .btmenu');
	$btmenu.on('click', function(event) {
		$(this).closest('.telas-pequenas').find('nav').toggleClass('db');;
	});




	// Redes sociais fixo
	if ($('#area-post article').length > 0) {
		var $articlePost = $('#area-post article');
		var $redesSociaisPost = $articlePost.find('.redes-sociais');
		var $menuglobal = $('#menuglobal');
		var posicoesRedesFixas = {}

		var attPosicoes = function(){
			posicoesRedesFixas = {
				comeco: 
					$articlePost.offset().top
					 - $menuglobal.height(),
				fim: 
					$articlePost.offset().top
					 + $articlePost.height()
					 - $redesSociaisPost.height() 
					 - $menuglobal.height()
			}
		}

		attPosicoes();

		var timeOutAttPosicoes = setTimeout(function(){}, 0);

		$(window).on('resize', function(event) {
			clearTimeout(timeOutAttPosicoes);
			var timeOutAttPosicoes = setTimeout(attPosicoes, 100);
		});

		$(window).on('scroll', function(event){
			var scrollNovo = $('html').scrollTop();
			if (scrollNovo >= posicoesRedesFixas.fim) {
				$redesSociaisPost.addClass('pos-fixado').removeClass('fixo');
			}
			else if(scrollNovo >= posicoesRedesFixas.comeco){
				$redesSociaisPost.addClass('fixo').removeClass('pos-fixado');
			}
			else{
				$redesSociaisPost.removeClass('pos-fixado fixo');
			}
		})
	}
	

});







