// button function empty hash
var anchorFunction = function (event) {
	"use strict";
	if (event.currentTarget.getAttribute("href").substr(-1) === "#") {
		event.preventDefault();
	}
};