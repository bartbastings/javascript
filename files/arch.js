// global var
var drawArch = false;
// calc arch
var calcArch = function (s, l) {
	"use strict";
	return (Math.pow(s, 2) + Math.pow((l / 2), 2)) / (2 * s);
};
// draw arch bottom
var archBottom = function (element, ratioHeight, radius) {
	"use strict";
	var parent = element.parentElement;
	if (parent.parentElement.classList.contains("block--arch")) {
		parent.style.height = ratioHeight + "px";
		parent.style.bottom = "-" + ratioHeight + "px";
		parent.parentElement.style.marginBottom = ratioHeight + "px";
	}
	element.style.height = radius + "px";
	element.style.width = radius + "px";
};
// draw arch top
var archTop = function (element, ratioHeight, radius) {
	"use strict";
	var parent = element.parentElement;
	if (parent.parentElement.classList.contains("block--arch")) {
		parent.style.height = ratioHeight + "px";
		parent.style.top = "-" + ratioHeight + "px";
		parent.parentElement.style.marginTop = ratioHeight + "px";
	}
	element.style.height = radius + "px";
	element.style.width = radius + "px";
};
// draw arch
var arch = function (element) {
	"use strict";
	var width = element.parentElement.offsetWidth, ratio = parseFloat(width / element.dataset.measurement).toFixed(2), ratioHeight = Math.round(element.dataset.height * ratio), radius = Math.round(calcArch(ratioHeight, width) * 2);
	switch (element.dataset.position) {
	case "top":
		archTop(element, ratioHeight, radius);
		break;
	case "bottom":
		archBottom(element, ratioHeight, radius);
		break;
	}
	drawArch = false;
};
// update arch
var updateArch = function () {
	"use strict";
	var elements = document.getElementsByClassName("js-arch");
	if (elements.length > 0) {
		Array.prototype.forEach.call(elements, function (element) {
			arch(element);
		});
	}
};
// arch
var archFunction = function () {
	"use strict";
	if (!drawArch) {
		window.requestAnimationFrame(updateArch);
		drawArch = true;
	}
};