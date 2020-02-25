/**** LOADING ****/
$(window).on('load', function(){
	setTimeout(function(){
		$('#loader img').fadeOut(750);
		$('#loader').delay(1500).fadeOut(750);
		$('.modal-button').delay(2500).fadeIn(750);
	}, 1500);
});

/**** ANTI-TOUCH CURSOR ****/
var mouse = {
	'x': 0,
	'y': 0
};

homex = 0;
homey = 0;
forcex = 0;
forcey = 0;
magnet = 600;


$('#container').on('mousemove', function (event) {
	mouse = {
		'x': event.pageX,
		'y': event.pageY
	};
});

$('.particle').each(function (index, el) {
	$(el).data("homex", parseInt($(el).position().left));
	$(el).data("homey", parseInt($(el).position().top));
});

$('.particle').css('position', 'absolute');
setInterval(function () {
	$('.particle').each(function (index, el) {
		el = $(el);
		position = el.position();
		x0 = el.offset().left;
		y0 = el.offset().top;
		x1 = mouse.x;
		y1 = mouse.y;
		distancex = x1 - x0;
		distancey = y1 - y0;

		distance = Math.sqrt((distancex * distancex) + (distancey * distancey));

		powerx = x0 - (distancex / distance) * magnet / distance;
		powery = y0 - (distancey / distance) * magnet / distance;

		forcex = (forcex + (el.data('homex') - x0) / 2) / 2.1;
		forcey = (forcey + (el.data('homey') - y0) / 2) / 2.1;

		el.css('left', powerx + forcex);
		el.css('top', powery + forcey);
	});
}, 50);

/**** AUDIO ****/
let audioFiles = ["nt-0", "nt-1", "nt-2", "nt-3", "nt-4", "nt-5", "nt-6", "nt-7"];
let i = 0;
let audio = document.getElementById('audio');
$('#container').on('mousedown', () => {
	if (i >= audioFiles.length) i=0;
	let audioFile = `assets/audio/${audioFiles[i]}.mp3`;
	$(audio).attr('src', audioFile);
	audio.play();
	i++;
});

/**** CLICK EFFECT ****/
$('#container').on('mousedown', () => {
	$('.particle, #container').addClass('clicked');
});

$('#container').on('mouseup', () => {
	$('.particle, #container').removeClass('clicked');
});

/**** MODAL HANDLING ****/
$('.modal-button, #manifesto').on('click', function(){
	$('#manifesto').toggleClass('open');
});