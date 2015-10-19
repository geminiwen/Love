// variables
var $window = $(window), gardenCtx, gardenCanvas, $garden, garden, horseCanvas, $horse, horseCtx;
var clientWidth = $(window).width();
var clientHeight = $(window).height();
var points = [];

$(function () {
    // setup garden
	$loveHeart = $("#loveHeart");
	var offsetX = $loveHeart.width() / 2;
	var offsetY = $loveHeart.height() / 2 - 55;
    $garden = $("#garden");
    $horse = $('#horse');

    gardenCanvas = $garden[0];
	gardenCanvas.width = $("#loveHeart").width();
    gardenCanvas.height = $("#loveHeart").height();

    horseCanvas = $horse[0];
    horseCanvas.width = gardenCanvas.width;
    horseCanvas.height = gardenCanvas.height;

    gardenCtx = gardenCanvas.getContext("2d");
    gardenCtx.globalCompositeOperation = "lighter";
    garden = new Garden(gardenCtx, gardenCanvas);

    horseCtx = horseCanvas.getContext("2d");

	
	$("#content").css("width", $loveHeart.width() + $("#code").width());
	$("#content").css("height", Math.max($loveHeart.height(), $("#code").height()));
	$("#content").css("margin-top", 20);

    // renderLoop
    setInterval(function () {
        garden.render();
    }, Garden.options.growSpeed);
});

$(window).resize(function() {
    var newWidth = $(window).width();
    var newHeight = $(window).height();
    if (newWidth != clientWidth && newHeight != clientHeight) {
        location.replace(location);
    }
});

function getHeartPoint(angle) {
	var t = angle / Math.PI;
	var x = 8* (16 * Math.pow(Math.sin(t), 3));
	var y = - 8 * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
	return new Array(offsetX + x, offsetY + y);
}

function drawBackground() {
	var ctx = horseCtx;
	var img = new Image();
	img.src = "img/2.png";
	var cwidth = gardenCanvas.width;
	var cheight = gardenCanvas.height;
	
	img.onload = function () {
		var scale = Math.min((cwidth / img.width), (cheight / img.height));
		var alpha = 0.1;

		var bgInterval = setInterval(function () {
		    ctx.clearRect(0, 0, cwidth, cheight);
			ctx.save();
			ctx.moveTo(points[0][0], points[0][1]);
			ctx.beginPath();
			for(var i = 1; i < points.length; i ++ ){
				ctx.lineTo(points[i][0], points[i][1]);
			}
			ctx.lineTo(points[0][0], points[0][1]);
			ctx.clip();
			ctx.globalAlpha = alpha;
			ctx.drawImage(img, 
					0, 0, img.width, img.height,
					(cwidth - img.width * scale) / 2, (cheight - img.height * scale) / 2,
	                img.width * scale, img.height * scale);
			ctx.restore();

			alpha += 0.02;
			if (alpha >= 1) {
				clearInterval(bgInterval);
			}
		}, 200);
		
	}
}

function startHeartAnimation() {
	var interval = 50;
	var angle = 10;
	var heart = new Array();
	var animationTimer = setInterval(function () {
		var bloom = getHeartPoint(angle);
		points.push(bloom);
		var draw = true;
		for (var i = 0; i < heart.length; i++) {
			var p = heart[i];
			var distance = Math.sqrt(Math.pow(p[0] - bloom[0], 2) + Math.pow(p[1] - bloom[1], 2));
			if (distance < Garden.options.bloomRadius.max * 1.3) {
				draw = false;
				break;
			}
		}
		if (draw) {
			heart.push(bloom);
			garden.createRandomBloom(bloom[0], bloom[1]);
		}
		if (angle >= 30) {
			clearInterval(animationTimer);
			drawBackground();
			showMessages();
		} else {
			angle += 0.2;
		}
	}, interval);
}

function timeElapse(date){
	var current = Date();
	var seconds = (Date.parse(current) - Date.parse(date)) / 1000;
	var days = Math.floor(seconds / (3600 * 24));
	seconds = seconds % (3600 * 24);
	var hours = Math.floor(seconds / 3600);
	if (hours < 10) {
		hours = "0" + hours;
	}
	seconds = seconds % 3600;
	var minutes = Math.floor(seconds / 60);
	if (minutes < 10) {
		minutes = "0" + minutes;
	}
	seconds = seconds % 60;
	if (seconds < 10) {
		seconds = "0" + seconds;
	}
	var result = "<span class=\"digit\">" + days + "</span> days <span class=\"digit\">" + hours + "</span> hours <span class=\"digit\">" + minutes + "</span> minutes <span class=\"digit\">" + seconds + "</span> seconds"; 
	$("#elapseClock").html(result);
}

function showMessages() {
	adjustWordsPosition();
	// $('#messages').fadeIn(5000, function() {
	// 	showLoveU();
	// });
}

function adjustWordsPosition() {
	$('#words').css("position", "absolute");
	$('#words').css("top", $("#garden").position().top + 195);
	$('#words').css("left", $("#garden").position().left + 70);
}

function adjustCodePosition() {
	$('#code').css("margin-top", ($("#garden").height() - $("#code").height()) / 2);
}

function showLoveU() {
	$('#loveu').fadeIn(3000);
}