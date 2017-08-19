// global var
var changeWidth = 1, zoom = 1, pageFooterHeight = 1, pageHeaderHeight = 1, anchors, navBtn, navMenu, hashBtns, slideDownBtns;
// header
var fixedHeader = function () {
	"use strict";
	var pageHeader = document.getElementById("pageHeader"), pageHeaderHeightNew = pageHeader.clientHeight;
	if (pageHeader.classList.contains("is-fixed-header")) {
		if (pageHeaderHeight !== pageHeaderHeightNew) {
			document.getElementById("pageMain").style.paddingTop = pageHeaderHeightNew + "px";
			pageHeaderHeight = pageHeaderHeightNew;
		}
	}
};
// footer
var stickyFooter = function () {
	"use strict";
	var pageFooter = document.getElementById("pageFooter"), pageFooterHeightNew = pageFooter.clientHeight;
	if (pageFooter.classList.contains("is-sticky-footer")) {
		if (pageFooterHeight !== pageFooterHeightNew) {
			document.getElementById("pageMain").style.marginBottom = "-" + pageFooterHeightNew + "px";
			pageFooterHeight = pageFooterHeightNew;
		}
	}
};
//
var navBtnFunction = function (event) {
	"use strict";
	event.currentTarget.classList.toggle("is-open");
	navMenu.classList.toggle("is-open");
	if (!navMenu.classList.contains("is-open")) {
		navMenu.style.height = "0px";
	} else {
		navMenu.style.height = document.getElementsByClassName("js-navList")[0].scrollHeight + "px";
	}
	event.preventDefault();
};
//
var slideDownBtnFunction = function (event) {
	"use strict";
	//do something here
	
};
/* time, height
var fps = 15, navElement = false, navHeight = false;
var animateFunction = function(animationTime) {
	var duration = animationTime, end = + new Date() + duration, height = document.getElementsByClassName('js-navList')[0].scrollHeight;
	var step = function() {
		var current = +new Date(), remaining = end - current;
		if(remaining < (1000/60).toFixed(2)) {
			rate = 1 - remaining/duration;
			navMenu.style.height = (height-(height*rate)).toFixed(2)+'px';
			setTimeout(function(){ navMenu.style.height = '0px'; },(1000/60).toFixed(2));
			return;
		} else {
			var rate = 1 - remaining/duration;
			navMenu.style.height = (height-(height*rate)).toFixed(2)+'px';
		}
		window.requestAnimationFrame(step);
	}
	step();
}
*/
// load function
var loadFunction = function (event) {
	"use strict";
	//do something here
	
};
// scroll function
var scrollFunction = function (event) {
	"use strict";
	//do something here
	
};
// resize function
var resizeFunction = function () {
	"use strict";
	// var
	var zoomNew = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	// global functions
	archFunction();
	slopeFunction();
	// zoom resize function
	if (zoom !== zoomNew) {
		fixedHeader();
		stickyFooter();
		zoom = zoomNew;
	}
	//
	if (window.matchMedia("(max-width: 32em)").matches) {
		if (changeWidth !== 512) {
			//do something here
			
			changeWidth = 512;
		}
	} else if (window.matchMedia("(min-width: 32.063em) and (max-width: 50em)").matches) {
		if (changeWidth !== 800) {
			//do something here
			
			changeWidth = 800;
		}
	} else if (window.matchMedia("(min-width: 50.063em) and (max-width: 64em)").matches) {
		if (changeWidth !== 1024) {
			//do something here
			
			changeWidth = 1024;
		}
	} else if (window.matchMedia("(min-width: 64.063em)).matches").matches) {
		if (changeWidth !== 1200) {
			//do something here
			
			changeWidth = 1200;
		}
	}
};
// document load
document.addEventListener("DOMContentLoaded", function () {
	"use strict";
	// set var
	anchors = document.querySelectorAll("a[href*='#']");
	hashBtns = document.getElementsByClassName("js-hash");
	slideDownBtns = document.getElementsByClassName("js-slideDown");
	navBtn = document.getElementById("navBtn");
	navMenu = document.getElementById("navMenu");
	zoom = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	// global functions
	fixedHeader();
	stickyFooter();
	archFunction();
	slopeFunction();
	urlLocationFuction();
	// event check
	if (window.addEventListener) {
		// window events
		window.addEventListener("load", loadFunction, false);
		window.addEventListener("scroll", scrollFunction, false);
		window.addEventListener("resize", resizeFunction, false);
		// element event
		navBtn.addEventListener("click", navBtnFunction, false);
		// elements event
		if (anchors.length > 0) {
			Array.prototype.forEach.call(anchors, function (anchor) {
				anchor.addEventListener("click", anchorFunction, false);
			});
		}
		if (hashBtns.length > 0) {
			Array.prototype.forEach.call(hashBtns, function (hashBtn) {
				hashBtn.addEventListener("click", navHashFunction, false);
			});
		}
		if (slideDownBtns.length > 0) {
			Array.prototype.forEach.call(slideDownBtns, function (slideDownBtn) {
				slideDownBtn.addEventListener("click", slideDownBtnFunction, false);
			});
		}
	} else if (window.attachEvent) {
		// window events
		window.attachEvent("onload", loadFunction);
		window.attachEvent("onscroll", scrollFunction);
		window.attachEvent("onresize", resizeFunction);
		// element event
		navBtn.attachEvent("onclick", navBtnFunction);
		// elements event
		if (anchors.length > 0) {
			Array.prototype.forEach.call(anchors, function (anchor) {
				anchor.attachEvent("onclick", anchorFunction);
			});
		}
		if (hashBtns.length > 0) {
			Array.prototype.forEach.call(hashBtns, function (hashBtn) {
				hashBtn.attachEvent("onclick", navHashFunction);
			});
		}
		if (slideDownBtns.length > 0) {
			Array.prototype.forEach.call(slideDownBtns, function (slideDownBtn) {
				slideDownBtn.attachEvent("onclick", slideDownBtnFunction);
			});
		}
	} else {
		// window events
		window.onload = loadFunction();
		window.onscroll = scrollFunction();
		window.onresize = resizeFunction();
		// element event
		navBtn.onclick = navBtnFunction();
		// elements event
		if (anchors.length > 0) {
			Array.prototype.forEach.call(anchors, function (anchor) {
				anchor.onclick = anchorFunction();
			});
		}
		if (hashBtns.length > 0) {
			Array.prototype.forEach.call(hashBtns, function (hashBtn) {
				hashBtn.onclick = navHashFunction();
			});
		}
		if (slideDownBtns.length > 0) {
			Array.prototype.forEach.call(slideDownBtns, function (slideDownBtn) {
				slideDownBtn.onclick = slideDownBtnFunction();
			});
		}
	}
});