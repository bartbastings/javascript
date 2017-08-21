var anchors;
// button function empty hash
var anchorFunction = function (event) {
	"use strict";
	if (event.currentTarget.getAttribute("href").substr(-1) === "#") {
		event.preventDefault();
	}
};

// document load
document.addEventListener("DOMContentLoaded", function () {
	"use strict";
	// set var
	anchors = document.querySelectorAll("a[href*='#']");
	//set class element event listener
	if (anchors.length > 0) {
		Array.prototype.forEach.call(anchors, function (anchor) {
			anchor.addEventListener("onclick", anchorFunction, false);
		});
	}
});
