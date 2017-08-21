// variables
var dir = "backoffice";
/* [description] */
var getLangcode = function (dir) {
	"use strict";
	var pathname = window.location.pathname, regex, match, lang;
	if (dir === "backoffice") {
		regex = new RegExp("(backoffice)\/([a-z]{2})\/?");
		match = regex.exec(pathname);
		lang = match[2];
	} else if (dir === "site") {
		regex = new RegExp("^\/([a-z]{2})\/?");
		match = regex.exec(pathname);
		lang = match[1];
	}
	return lang;
};

var ajaxTranslationFunction = function (langCode, key, callBack) {
	"use strict";
	$.ajax({
		method: "POST",
		url: "/translations/" + dir + "/" + langCode + ".json",
		dataType: "JSON"
	}).done(function (data) {
		if (typeof (data.key) !== "undefined") {
			callBack(data[key]);
		} else {
			callBack(key);
		}
	});
};
