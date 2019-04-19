/*--------------------------------------------------------------
Draggable
alternative to jQuery UI’s draggable
based on comments from: http://css-tricks.com/snippets/jquery/draggable-without-jquery-ui/
usage example: $('.post-thumbnail, article header').draggable();
--------------------------------------------------------------*/
(function($) {
	if (!jQuery().draggable) {
		$.fn.draggable = function() {
			this
				.css('cursor', 'move')
				.on('mousedown touchstart', function(e) {
					var $dragged = $(this);

					var x = $dragged.offset().left - e.pageX,
						y = $dragged.offset().top - e.pageY,
						z = $dragged.css('z-index');

					if (!$.fn.draggable.stack) {
						$.fn.draggable.stack = 999;
					}
					stack = $.fn.draggable.stack;
					
					$(window)
						.on('mousemove.draggable touchmove.draggable', function(e) {
							$dragged
								//.css({'z-index': stack, 'transform': 'scale(1.1)', 'transition': 'transform .3s', 'bottom': 'auto', 'right': 'auto'})
								.offset({
									left: x + e.pageX,
									top: y + e.pageY
								})
								.find('a').one('click.draggable', function(e) {
									e.preventDefault();
								});

							e.preventDefault();
						})
						.one('mouseup touchend touchcancel', function() {
							$(this).off('mousemove.draggable touchmove.draggable click.draggable');
							$dragged.css({'z-index': stack, 'transform': 'scale(1)'})
							$.fn.draggable.stack++;
						});

					e.preventDefault();
				});
			return this;
		};
	}
})(jQuery);


$(function() {
	function update() {
		var $a = $("#rectA")[0].style;
		var $b = $("#rectB")[0].style;
		var a = {
			x1: parseInt($a.left),
			y1: parseInt($a.top),
			x2: parseInt($a.left) + parseInt($a.width),
			y2: parseInt($a.top) + parseInt($a.height)
		};
		var b = {
			x1: parseInt($b.left),
			y1: parseInt($b.top),
			x2: parseInt($b.left) + parseInt($b.width),
			y2: parseInt($b.top) + parseInt($b.height)
		};

		var comp0 = a.x1 < b.x2;
		var comp1 = a.x2 > b.x1;
		var comp2 = a.y1 < b.y2;
		var comp3 = a.y2 > b.y1;
		var intersect = comp0 && comp1 && comp2 && comp3;

		$("#comp0").removeClass("" + !comp0).addClass("" + comp0).text(comp0);
		$("#comp1").removeClass("" + !comp1).addClass("" + comp1).text(comp1);
		$("#comp2").removeClass("" + !comp2).addClass("" + comp2).text(comp2);
		$("#comp3").removeClass("" + !comp3).addClass("" + comp3).text(comp3);
		$("#answer").removeClass("" + !intersect).addClass("" + intersect).text(intersect);

		/** /function acolor(b) { return b ? "c00" : "transparent"; };
		function bcolor(b) { return b ? "#00c" : "transparent"; };

		$("#rectA").css({
			borderTopColor: acolor(comp2),
			borderRightColor: acolor(comp1),
			borderBottomColor: acolor(comp3),
			borderLeftColor: acolor(comp0)
		});

		$("#rectB").css({
			borderTopColor: bcolor(comp3),
			borderRightColor: bcolor(comp0),
			borderBottomColor: bcolor(comp2),
			borderLeftColor: bcolor(comp1)
		});/**/
	}

	update();

	$('#intersection_area .rect').draggable();
	setInterval(function() { update(); }, 10);
/*	var area_offset = $("#intersection_area").offset();

	$('#intersection_area .rect').bind('drag', function(event) {
		var this_offset = $(this).offset();
		$(this).css({
			top: this_offset.top - area_offset.top,
			left: this_offset.left - area_offset.left
		});
		update();
	});*/
});
