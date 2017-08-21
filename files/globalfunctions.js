Element.prototype.hasClass = function (className) {
	"use strict";
	if (this.classList) {
		return this.classList.contains(className);
	} else {
		var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
		return reg.test(className);
	}
};
Element.prototype.addClass = function (className) {
	"use strict";
	if (this.classList) {
		this.classList.add(className);
	} else if (!this.hasClass(className)) {
		this.className += ' ' + className;
	}
};
Element.prototype.removeClass = function (className) {
	"use strict";
	if (this.classList) {
		this.classList.remove(className);
	} else if (this.hasClass(className)) {
		var reg = new RegExp('\\b' + className + '\\b', 'g');
		this.className = this.className.replace(reg, ' ');
	}
};
Element.prototype.removeElement = function () {
	"use strict";
	if (this.parentNode !== null) {
		this.parentNode.removeChild(this);
	}
};
Element.prototype.insertAfter = function (element) {
	"use strict";
	var nextDiv = this.nextSibling;
	nextDiv.parentNode.insertBefore(element, nextDiv);
};
Element.prototype.toggle = function () {
	"use strict";
	if (this.hasClass('is_hidden')) {
		this.removeClass('is_hidden');
	} else {
		this.addClass('is_hidden');
	}
};
