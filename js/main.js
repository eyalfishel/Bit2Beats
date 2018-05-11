;(function () {
	
	'use strict';

	var mobileMenuOutsideClick = function() {

		$(document).click(function (e) {
	    var container = $("#gtco-offcanvas, .js-gtco-nav-toggle");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {
	    	$('.js-gtco-nav-toggle').addClass('');

	    	if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-gtco-nav-toggle').removeClass('active');
				
	    	}
	    
	    	
	    }
		});

	};


	var offcanvasMenu = function() {

		$('#page').prepend('<div id="gtco-offcanvas" />');
		$('#page').prepend('<a href="#" class="js-gtco-nav-toggle gtco-nav-toggle "><i></i></a>');
		var clone1 = $('.menu-1 > ul').clone();
		$('#gtco-offcanvas').append(clone1);
		var clone2 = $('.menu-2 > ul').clone();
		$('#gtco-offcanvas').append(clone2);

		$('#gtco-offcanvas .has-dropdown').addClass('offcanvas-has-dropdown');
		$('#gtco-offcanvas')
			.find('li')
			.removeClass('has-dropdown');

		// Hover dropdown menu on mobile
		$('.offcanvas-has-dropdown').mouseenter(function(){
			var $this = $(this);

			$this
				.addClass('active')
				.find('ul')
				.slideDown(500, 'easeOutExpo');				
		}).mouseleave(function(){

			var $this = $(this);
			$this
				.removeClass('active')
				.find('ul')
				.slideUp(500, 'easeOutExpo');				
		});


		$(window).resize(function(){

			if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-gtco-nav-toggle').removeClass('active');
				
	    	}
		});
	};


	var burgerMenu = function() {

		$('body').on('click', '.js-gtco-nav-toggle', function(event){
			var $this = $(this);


			if ( $('body').hasClass('overflow offcanvas') ) {
				$('body').removeClass('overflow offcanvas');
			} else {
				$('body').addClass('overflow offcanvas');
			}
			$this.toggleClass('active');
			event.preventDefault();

		});
	};



	var contentWayPoint = function() {
		var i = 0;

		// $('.gtco-section').waypoint( function( direction ) {


			$('.animate-box').waypoint( function( direction ) {

				if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {
					
					i++;

					$(this.element).addClass('item-animate');
					setTimeout(function(){

						$('body .animate-box.item-animate').each(function(k){
							var el = $(this);
							setTimeout( function () {
								var effect = el.data('animate-effect');
								if ( effect === 'fadeIn') {
									el.addClass('fadeIn animated-fast');
								} else if ( effect === 'fadeInLeft') {
									el.addClass('fadeInLeft animated-fast');
								} else if ( effect === 'fadeInRight') {
									el.addClass('fadeInRight animated-fast');
								} else {
									el.addClass('fadeInUp animated-fast');
								}

								el.removeClass('item-animate');
							},  k * 50, 'easeInOutExpo' );
						});
						
					}, 100);
					
				}

			} , { offset: '85%' } );
		// }, { offset: '90%'} );
	};



	var changeWayPoint = function() {
		var i = 0;

		// $('.gtco-section').waypoint( function( direction ) {


			$('.animate-change').waypoint( function( direction ) {

				if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {
					
					i++;

					$(this.element).addClass('item-animate');
					setTimeout(function(){

						$('body .animate-change.item-animate').each(function(k){
							var el = $(this);
							setTimeout( function () {
								el.addClass('changed animated-fast');
								el.removeClass('item-animate');
							},  k * 100, 'easeInOutExpo' );
						});
						
					}, 100);
					
				}

			} , { offset: '85%' } );
		// }, { offset: '90%'} );
	};


	var dropdown = function() {

		$('.has-dropdown').mouseenter(function(){

			var $this = $(this);
			$this
				.find('.dropdown')
				.css('display', 'block')
				.addClass('animated-fast fadeInUpMenu');

		}).mouseleave(function(){
			var $this = $(this);

			$this
				.find('.dropdown')
				.css('display', 'none')
				.removeClass('animated-fast fadeInUpMenu');
		});

	};


	var owlCarousel = function(){
		
		var owl = $('.owl-carousel-carousel');
		owl.owlCarousel({
			items: 3,
			loop: true,
			margin: 40,
			nav: true,
			dots: true,
			navText: [
		      "<i class='ti-arrow-left owl-direction'></i>",
		      "<i class='ti-arrow-right owl-direction'></i>"
	     	],
	     	responsive:{
	        0:{
	            items:1
	        },
	        600:{
	            items:2
	        },
	        1000:{
	            items:3
	        }
	    	}
		});


		var owl = $('.owl-carousel-fullwidth');
		owl.owlCarousel({
			items: 1,
			loop: true,
			margin: 20,
			nav: true,
			dots: true,
			smartSpeed: 800,
			autoHeight: true,
			navText: [
		      "<i class='ti-arrow-left owl-direction'></i>",
		      "<i class='ti-arrow-right owl-direction'></i>"
	     	]
		});


		

	};

	var tabs = function() {

		// Auto adjust height
		$('.gtco-tab-content-wrap').css('height', 0);
		var autoHeight = function() {

			setTimeout(function(){

				var tabContentWrap = $('.gtco-tab-content-wrap'),
					tabHeight = $('.gtco-tab-nav').outerHeight(),
					formActiveHeight = $('.tab-content.active').outerHeight(),
					totalHeight = parseInt(tabHeight + formActiveHeight + 90);

					tabContentWrap.css('height', totalHeight );

				$(window).resize(function(){
					var tabContentWrap = $('.gtco-tab-content-wrap'),
						tabHeight = $('.gtco-tab-nav').outerHeight(),
						formActiveHeight = $('.tab-content.active').outerHeight(),
						totalHeight = parseInt(tabHeight + formActiveHeight + 90);

						tabContentWrap.css('height', totalHeight );
				});

			}, 100);
			
		};

		autoHeight();


		// Click tab menu
		$('.gtco-tab-nav a').on('click', function(event){
			
			var $this = $(this),
				tab = $this.data('tab');

			$('.tab-content')
				.addClass('animated-fast fadeOutDown');

			$('.tab-content')
				.removeClass('active');

			$('.gtco-tab-nav li').removeClass('active');
			
			$this
				.closest('li')
					.addClass('active')

			$this
				.closest('.gtco-tabs')
					.find('.tab-content[data-tab-content="'+tab+'"]')
					.removeClass('animated-fast fadeOutDown')
					.addClass('animated-fast active fadeIn');


			autoHeight();
			event.preventDefault();

		}); 
	};


	var goToTop = function() {

		$('.js-gotop').on('click', function(event){
			
			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500, 'easeInOutExpo');
			
			return false;
		});

		$(window).scroll(function(){

			var $win = $(window);
			if ($win.scrollTop() > 200) {
				$('.js-top').addClass('active');
			} else {
				$('.js-top').removeClass('active');
			}

		});
	
	};


	// Loading page
	var loaderPage = function() {
		$(".gtco-loader").fadeOut("slow");
	};

	var counter = function() {
		$('.js-counter').countTo({
			 formatter: function (value, options) {
	      return value.toFixed(options.decimals);
	    },
		});
	};

	var counterWayPoint = function() {
		if ($('#gtco-counter').length > 0 ) {
			$('#gtco-counter').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout( counter , 400);					
					$(this.element).addClass('animated');
				}
			} , { offset: '90%' } );
		}
	};

	
	$(function(){
		mobileMenuOutsideClick();
		offcanvasMenu();
		burgerMenu();
		contentWayPoint();
		dropdown();
		owlCarousel();
		tabs();
		goToTop();
		loaderPage();
		counterWayPoint();
		changeWayPoint();
	});


	//Bitcoin Hackathon - Bitcoin Embassy in Tel-Aviv

	//for old selector- update currency symbol
    function updateSymbol(e){
        var selected = $(".currency-selector option:selected");
        $(".currency-symbol").text(selected.data("symbol"))
        $(".currency-amount").prop("placeholder", selected.data("placeholder"))
        $('.currency-addon-fixed').text(selected.text())


    }

    $(".currency-selector").on("change", updateSymbol)

    updateSymbol()

	//Register for updates
    $(".selectBlocks").on("change", getFeesByTime)
    $(".wantedFee").on("input", onFeeUpdated)

	//update data when wanted fee is updated
    function onFeeUpdated(e)
	{
        var wantedFee = $(".wantedFee")[0].value;
        var fees={};
        //Get the latest fees
        $.get( "https://bitcoinfees.earn.com/api/v1/fees/list?format=json&cors=true", function( data ) {
            console.log( "result data.", data );
            fees = data.fees;
            getRecommendedTime(fees, wantedFee);
        });

    }

	//update data when wanted time is updated
    function getFeesByTime(e) {
        var fees={};

        var selected = $(".selectBlocks option:selected");
        var time = parseInt(selected[0].value)*10;// change from blocks to minutes
        //Get the latest fees
        $.get( "https://bitcoinfees.earn.com/api/v1/fees/list?format=json&cors=true", function( data ) {
            console.log( "result data.", data );
            fees = data.fees;
            getRecommendedFee(fees, time);
        });

    };

    //Get the recommended fee
    function getRecommendedFee(fees, time)
	{
        var i;
        for( i=0; i<=fees.length; i++){
            var maxWaiting = parseInt(fees[i].maxMinutes);
            var minWaiting = parseInt(fees[i].minMinutes);
            if(time>=maxWaiting){
                calculateFee(fees[i], time);
                break;
            }
        }

    }

    function getRecommendedTime(fees, wantedFee)
    {
        var i;
        var satoshiInUSD = parseInt(document.getElementById("rate").innerText)/100000000;
        var wantedFee_Number = parseFloat(wantedFee);
        var wantedFee_InSatoshi = wantedFee_Number/satoshiInUSD;
        var median_transaction_size = 225;
        var wantedFee_InSatoshiPerByte = Math.ceil(wantedFee_InSatoshi/median_transaction_size);

        for( i=0; i<=fees.length; i++){
            var maxFee = parseInt(fees[i].maxFee);
            var minFee = parseInt(fees[i].minFee);

            if(wantedFee_InSatoshiPerByte>=minFee && wantedFee_InSatoshiPerByte<= maxFee)
            {
                wantedFee_InSatoshiPerByte = Math.ceil((maxFee+minFee)/2);
                var averageFee = wantedFee_InSatoshiPerByte*median_transaction_size;
                var time = (parseInt(fees[i].minMinutes) + parseInt(fees[i].maxMinutes))/2;
                updateFeeAndTime(averageFee, wantedFee_InSatoshiPerByte , time.toString());
                break;
            }
        }

    }

    //Calculate fee
    function calculateFee(recommended, selectedTime)
	{
        //From Bitcoin divide to get Satoshi Price
        var satoshiInUSD = parseInt(document.getElementById("rate").innerText)/100000000;
        var minFee_InUSD= (parseInt(recommended.minFee)*satoshiInUSD);
        var maxFee_InUSD = (parseInt(recommended.maxFee)*satoshiInUSD);
        var averageFee = (minFee_InUSD+maxFee_InUSD)/2;
        var averageFee_Satoshi = Math.ceil((recommended.minFee + recommended.maxFee)/2);

       // var recommendedFeeString = "Between "+ (minFee_InUSD*median_transaction_size).toFixed(10).toString()
		//	+ " to " + (maxFee_InUSD*median_transaction_size).toFixed(10).toString() +" USD ";

        updateFeeAndTime(averageFee, averageFee_Satoshi, selectedTime.toString());


	}
    //Update results in UI
	function updateFeeAndTime(averageFee, averageFee_Satoshi, time)
	{
        var median_transaction_size = 225;
        var recommendedFeeString = averageFee.toFixed(10).toString() + " USD";

        var resultSatoshiPerByte = averageFee_Satoshi.toString() +" Satoshi/Byte (Satoshi per Bye) ";

        var resultTotalSatoshi = "(Total in Satoshis:  "+ (averageFee_Satoshi*median_transaction_size).toString()
            + " Satoshis)";

        var resultTime = "About " + time + " Minutes (" + time/10 + " Blocks)";

        document.getElementById("resultFee").innerText  = recommendedFeeString;
        document.getElementById("wantedTime").innerText  = time + " minutes ";
        document.getElementById("resultSatoshiPerByte").innerText  = resultSatoshiPerByte;
        document.getElementById("resultTotalSatoshi").innerText  = resultTotalSatoshi;
        document.getElementById("resultTime").innerText  = resultTime;
        document.getElementById("waitingTime").innerText  = resultTime;

	}


    //Updated visibility according to selected radio button
    $(document).ready(function() {
        var fees = {};

        $('input[type="radio"]').click(function() {


            if($(this).attr('id') == 'choose_recommendedfee') {
                $('#recommendedfee').show();
                $('#recommendedtime').hide();
            }
            else if($(this).attr('id') == 'choose_recommendedtime'){
                $('#recommendedfee').hide();
                $('#recommendedtime').show();

                }

            else {
                $('#recommendedfee').hide();
                $('#recommendedtime').hide();
            }


        });
    });

    function getJSONP(url, success) {

        var ud = '_' + +new Date,
            script = document.createElement('script'),
            head = document.getElementsByTagName('head')[0]
                || document.documentElement;

        window[ud] = function(data) {
            head.removeChild(script);
            success && success(data);
        };

        script.src = url.replace('callback=?', 'callback=' + ud);
        head.appendChild(script);

    }


}());