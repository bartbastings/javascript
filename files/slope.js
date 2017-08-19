// global var
var drawSlope = false;
// calc slope
var calcSlope = function (angle) {
	"use strict";
	return (angle * (Math.PI / 180));
};
// draw slope top left
var slopeTopLeft = function (element, parent, width, height, color) {
	"use strict";
	if (parent.parentElement.classList.contains("block--slope")) {
		parent.parentElement.style.marginTop = height + "px";
	}
	parent.style.height = height + "px";
	parent.style.top = "-" + height + "px";
	element.style.borderWidth = height + "px 0 0 " + width + "px";
	element.style.borderColor = "transparent transparent transparent " + color;
};
// draw slope top right
var slopeTopRight = function (element, parent, width, height, color) {
	"use strict";
	if (parent.parentElement.classList.contains("block--slope")) {
		parent.parentElement.style.marginTop = height + "px";
	}
	parent.style.height = height + "px";
	parent.style.top = "-" + height + "px";
	element.style.borderWidth = "0 0 " + height + "px " + width + "px";
	element.style.borderColor = "transparent transparent " + color + " transparent";
};
// draw slope bottom left
var slopeBottomLeft = function (element, parent, width, height, color) {
	"use strict";
	if (parent.parentElement.classList.contains("block--slope")) {
		parent.parentElement.style.marginBottom = height + "px";
	}
	parent.style.height = height + "px";
	parent.style.bottom = "-" + height + "px";
	element.style.borderWidth = height + "px " + width + "px 0 0";
	element.style.borderColor = color + " transparent transparent transparent";
};
// draw slope bottom right
var slopeBottomRight  = function (element, parent, width, height, color) {
	"use strict";
	if (parent.parentElement.classList.contains("block--slope")) {
		parent.parentElement.style.marginBottom = height + "px";
	}
	parent.style.height = height + "px";
	parent.style.bottom = "-" + height + "px";
	element.style.borderWidth = "0 " + width + "px " + height + "px 0";
	element.style.borderColor = "transparent " + color + " transparent transparent";
};
// draw slope
var slope = function (element) {
	"use strict";
	var parent = element.parentElement, width = parent.offsetWidth, height = Math.round(Math.tan(calcSlope(element.dataset.angle)) * width), color = "rgb(255,255,255)";
	if (parent.parentElement.classList.contains("block--slope")) {
		color = window.getComputedStyle(parent.parentElement, null).backgroundColor;
	}
	switch (element.dataset.position) {
	case "top-left":
		slopeTopLeft(element, parent, width, height, color);
		break;
	case "top-right":
		slopeTopRight(element, parent, width, height, color);
		break;
	case "bottom-left":
		slopeBottomLeft(element, parent, width, height, color);
		break;
	case "bottom-right":
		slopeBottomRight(element, parent, width, height, color);
		break;
	}
	drawSlope = false;
};
// update slope
var updateSlope = function () {
	"use strict";
	var elements = document.getElementsByClassName("js-slope");
	if (elements.length > 0) {
		Array.prototype.forEach.call(elements, function (element) {
			slope(element);
		});
	}
};
// slope
var slopeFunction = function () {
	"use strict";
	if (!drawSlope) {
		window.requestAnimationFrame(updateSlope);
		drawSlope = true;
	}
};