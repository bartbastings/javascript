// window
var windowYPosition = function () {
	"use strict";
	if (window.pageYOffset) {
		// All browsers, except IE9 and earlier
		return window.pageYOffset;
	}
	if (document.documentElement && document.documentElement.scrollTop) {
		// Internet Explorer 6 - standards mode
		return document.documentElement.scrollTop;
	}
	if (document.body.scrollTop) {
		// IE9 and earlier
		return document.body.scrollTop;
	}
	return 0;
};
//
var elmYPosition = function (element) {
	"use strict";
	var y = element.offsetTop, node = element;
	while (node.offsetParent && node.offsetParent !== document.body) {
		node = node.offsetParent;
		y += node.offsetTop;
	}
	return y;
};
// scroll animation function
var animateScrollFunction = function (animationTime, startY, stopY, direction) {
	"use strict";
	var duration = animationTime, end = +new Date() + duration;
	// step function
	function step() {
		var current = +new Date(), remaining = end - current, rate;
		if (direction === "down") {
			if (remaining < parseFloat(1000 / 60).toFixed(2)) {
				rate = 1 - remaining / duration;
				window.scrollTo(0, startY + parseFloat(stopY * rate).toFixed(2));
				setTimeout(function () {
					window.scrollTo(0, stopY);
				}, parseFloat(1000 / 60).toFixed(2));
				return;
			}
			rate = 1 - remaining / duration;
			window.scrollTo(0, startY + parseFloat(stopY * rate).toFixed(2));
			
		} else {
			if (remaining < parseFloat(1000 / 60).toFixed(2)) {
				rate = 1 - remaining / duration;
				window.scrollTo(0, startY - parseFloat(startY * rate).toFixed(2));
				setTimeout(function () {
					window.scrollTo(0, stopY);
				}, parseFloat(1000 / 60).toFixed(2));
				return;
			}
			rate = 1 - remaining / duration;
			window.scrollTo(0, startY - parseFloat(startY * rate).toFixed(2));
		}
		window.requestAnimationFrame(step);
	}
	step();
};
// slide to id function
var slideToIdFunction = function (hash) {
	"use strict";
	var element = document.getElementById(hash.replace("#", "")), startY = windowYPosition(), stopY = elmYPosition(element), distance = stopY > startY ? stopY - startY : startY - stopY, direction = stopY > startY ? "down" : "up", animationTime = 0;
	if (element !== undefined && element !== null) {
		if (direction === "down") {
			animationTime = Math.round((element.offsetTop - startY) / 3);
		} else {
			animationTime = Math.round((startY - element.offsetTop) / 3);
		}
		if (animationTime <= 300) {
			animationTime = 300;
		}
		if (distance !== 0) {
			animateScrollFunction(animationTime, startY, stopY, direction);
		}
	}
};
// url onLoad location fuction
var urlLocationFuction = function () {
	"use strict";
	var urlLocation = window.location.hash;
	if (urlLocation.length > 0) {
		slideToIdFunction(urlLocation);
	}
};
// anchor with hash function
var navHashFunction = function (event) {
	"use strict";
	var element = event.currentTarget;
	if (element.getAttribute("href") !== "" && element.getAttribute("href").charAt(0) === "#") {
		slideToIdFunction(element.getAttribute("href"));
	}
};