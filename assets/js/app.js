jQuery(document).ready(function($) {



	// Masonry
	var $lista_masonry = $('#primeiros-posts > ul, #lateral aside.pinterest ul');

	if ($lista_masonry.length > 0) {
		var masonryArgs = {
			itemSelector: '.grid-item',
			columnWidth: '.grid-sizer',
			gutter: '.gutter-sizer',
			percentPosition: true
		};
		$lista_masonry.each(function(index, el) {
			var $thisMasonry = $(el);
			$thisMasonry.masonry(masonryArgs);
			$thisMasonry.find('img').each(function(index, el) {
				$(el).on('load', function(event) {
					console.log('imagem do masonry carregou');
					$thisMasonry.masonry('layout');
				});
			});
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

		$slides.eq(0).addClass('db atual');
		$navBullets.eq(0).addClass('atual');
		$slider.removeClass('before-loading');

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
	if ($('#area-post .area-content').length > 0) {
		var $articlePost = $('#area-post .area-content');
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
			// console.log(posicoesRedesFixas);
		}

		attPosicoes();

		var timerAttPosicoes = setInterval(attPosicoes, 3000);

		var timeOutAttPosicoes = setTimeout(function(){}, 0);

		$(window).on('resize', function(event) {
			clearTimeout(timeOutAttPosicoes);
			timeOutAttPosicoes = setTimeout(attPosicoes, 200);
		});


		$(window).on('scroll', function(event){
			
			var scrollNovo = $(window).scrollTop();
			// console.log(
			// 	$(window).scrollTop(),
			// 	$('html').scrollTop(),
			// 	$('body').scrollTop()
			// 	);
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







