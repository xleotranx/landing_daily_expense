(function ($) {

	"use strict";


	$(window).stellar({
		responsive: true,
		parallaxBackgrounds: true,
		parallaxElements: true,
		horizontalScrolling: false,
		hideDistantElements: false,
		scrollProperty: 'scroll'
	});


	var fullHeight = function () {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function () {
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	// loader
	var loader = function () {
		setTimeout(function () {
			if ($('#ftco-loader').length > 0) {
				$('#ftco-loader').removeClass('show');
			}
		}, 1);
	};
	loader();

	var carousel = function () {
		$('.home-slider').owlCarousel({
			loop: true,
			autoplay: true,
			margin: 0,
			animateOut: 'fadeOut',
			animateIn: 'fadeIn',
			nav: true,
			dots: true,
			autoplayHoverPause: false,
			items: 1,
			navText: ["<span class='ion-ios-arrow-back'></span>", "<span class='ion-ios-arrow-forward'></span>"],
			responsive: {
				0: {
					items: 1
				},
				600: {
					items: 1
				},
				1000: {
					items: 1
				}
			}
		});

		$('.carousel-testimony').owlCarousel({
			center: true,
			loop: true,
			items: 1,
			margin: 30,
			stagePadding: 0,
			nav: false,
			navText: ['<span class="ion-ios-arrow-back">', '<span class="ion-ios-arrow-forward">'],
			responsive: {
				0: {
					items: 1
				},
				600: {
					items: 2
				},
				1000: {
					items: 3
				}
			}
		});

	};
	carousel();

	$('nav .dropdown').hover(function () {
		var $this = $(this);
		// 	 timer;
		// clearTimeout(timer);
		$this.addClass('show');
		$this.find('> a').attr('aria-expanded', true);
		// $this.find('.dropdown-menu').addClass('animated-fast fadeInUp show');
		$this.find('.dropdown-menu').addClass('show');
	}, function () {
		var $this = $(this);
		// timer;
		// timer = setTimeout(function(){
		$this.removeClass('show');
		$this.find('> a').attr('aria-expanded', false);
		// $this.find('.dropdown-menu').removeClass('animated-fast fadeInUp show');
		$this.find('.dropdown-menu').removeClass('show');
		// }, 100);
	});


	$('#dropdown04').on('show.bs.dropdown', function () {
		console.log('show');
	});



	var counter = function () {

		$('#section-counter').waypoint(function (direction) {

			if (direction === 'down' && !$(this.element).hasClass('ftco-animated')) {

				var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
				$('.number').each(function () {
					var $this = $(this),
						num = $this.data('number');
					console.log(num);
					$this.animateNumber(
						{
							number: num,
							numberStep: comma_separator_number_step
						}, 7000
					);
				});

			}

		}, { offset: '95%' });

	}
	counter();

	var contentWayPoint = function () {
		var i = 0;
		$('.ftco-animate').waypoint(function (direction) {

			if (direction === 'down' && !$(this.element).hasClass('ftco-animated')) {

				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function () {

					$('body .ftco-animate.item-animate').each(function (k) {
						var el = $(this);
						setTimeout(function () {
							var effect = el.data('animate-effect');
							if (effect === 'fadeIn') {
								el.addClass('fadeIn ftco-animated');
							} else if (effect === 'fadeInLeft') {
								el.addClass('fadeInLeft ftco-animated');
							} else if (effect === 'fadeInRight') {
								el.addClass('fadeInRight ftco-animated');
							} else {
								el.addClass('fadeInUp ftco-animated');
							}
							el.removeClass('item-animate');
						}, k * 50, 'easeInOutExpo');
					});

				}, 100);

			}

		}, { offset: '95%' });
	};
	contentWayPoint();

	$('.nav-scroll-link .nav-link').on('click', function (e) {
		e.preventDefault();
		if ($(this).hasClass('nav-link-open')) {
			window.open($(this).attr('href'), '_blank');
			return;
		}
		const liNav = $(this).parent();
		liNav.addClass('active');
		liNav.siblings().removeClass('active');
		var target = $(this).attr('href');
		$('html, body').animate({
			scrollTop: $(target).offset().top - 100
		}, 500);
	});
	
	// form contact
	$('#contactForm').submit(function(e) {
		e.preventDefault();
		const formData = new FormData(this);
		const name = formData.get('name');
		const email = formData.get('email');
		const subject = formData.get('subject');
		const message = formData.get('message');

		//add validate
		if (!name || !email || !subject || !message) {
			$('#form-message-warning').removeClass('d-none').text('Vui lòng điền đầy đủ thông tin');
			$('#form-message-success').addClass('d-none');
			return false;
		}

		// Validate email format
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			$('#form-message-warning').removeClass('d-none').text('Email không hợp lệ');
			$('#form-message-success').addClass('d-none');
			return false;
		}

		// Validate name length
		if (name.length < 2) {
			$('#form-message-warning').removeClass('d-none').text('Tên phải có ít nhất 2 ký tự');
			$('#form-message-success').addClass('d-none');
			return false;
		}

		// Validate subject length
		if (subject.length < 5) {
			$('#form-message-warning').removeClass('d-none').text('Chủ đề phải có ít nhất 5 ký tự');
			$('#form-message-success').addClass('d-none');
			return false;
		}

		// Validate message length
		if (message.length < 10) {
			$('#form-message-warning').removeClass('d-none').text('Tin nhắn phải có ít nhất 10 ký tự');
			$('#form-message-success').addClass('d-none');
			return false;
		}

		// Clear any previous warning messages
		$('#form-message-warning').addClass('d-none');


		// https://n8n.smartedge.vn/webhook-test/237019c4-3f47-4dc3-b3ec-122b33396008
		const url = 'https://n8n.smartedge.vn/webhook/237019c4-3f47-4dc3-b3ec-122b33396008';
		const data = {
			name,
			email,
			subject,
			message
		};
		fetch(url, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(response => response.json())
		.then(data => {
			$('#form-message-success').removeClass('d-none');
			$('#form-message-warning').addClass('d-none');
			$('#contactForm')[0].reset();
			$('#contactForm').removeClass('was-validated');
		})
		.catch(error => {
			console.error('Error:', error);
			$('#form-message-warning').removeClass('d-none');
			$('#form-message-success').addClass('d-none');
			$('#contactForm').addClass('was-validated');
		});
	});

})(jQuery);

