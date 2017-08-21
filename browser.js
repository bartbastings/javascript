// variables
var browserRegexArr,
	userAgent,
	browserArr = ["chrome", "safari", "firefox", "ie", "opera", "android", "edge"];
// classes
var BrowserRegexes = function () {
	"use strict";
	this.regexes = [
		{
			regex: new RegExp("^(Opera)/(\\d+)\\.(\\d+) \\(Nintendo Wii"),
			family_replacement: "Wii",
			manufacturer: "Nintendo"
		},
		{
			regex: new RegExp("(SeaMonkey|Camino)/(\\d+)\\.(\\d+)\\.?([ab]?\\d+[a-z]*)"),
			family_replacement: "Camino",
			other: true
		},
		{
			regex: new RegExp("(Pale[Mm]oon)/(\\d+)\\.(\\d+)\\.?(\\d+)?"),
			family_replacement: "Pale Moon (Firefox Variant)",
			other: true
		},
		{
			regex: new RegExp("(Fennec)/(\\d+)\\.(\\d+)\\.?([ab]?\\d+[a-z]*)"),
			family_replacement: "Firefox Mobile"
		},
		{
			regex: new RegExp("(Fennec)/(\\d+)\\.(\\d+)(pre)"),
			"main_family": "Firefox",
			"family_replacment": "Firefox Mobile"
		},
		{
			regex: new RegExp("(Fennec)/(\\d+)\\.(\\d+)"),
			family_replacement: "Firefox Mobile"
		},
		{
			regex: new RegExp("Mobile.*(Firefox)/(\\d+)\\.(\\d+)"),
			family_replacement: "Firefox Mobile"
		},
		{
			regex: new RegExp("(Namoroka|Shiretoko|Minefield)/(\\d+)\\.(\\d+)\\.(\\d+(?:pre)?)"),
			family_replacement: "Firefox ($1)"
		},
		{
			regex: new RegExp("(Firefox)/(\\d+)\\.(\\d+)(a\\d+[a-z]*)"),
			family_replacement: "Firefox Alpha"
		},
		{
			regex: new RegExp("(Firefox)/(\\d+)\\.(\\d+)(b\\d+[a-z]*)"),
			family_replacement: "Firefox Beta"
		},
		{
			regex: new RegExp("(Firefox)-(?:\\d+\\.\\d+)?/(\\d+)\\.(\\d+)(a\\d+[a-z]*)"),
			family_replacement: "Firefox Alpha"
		},
		{
			regex: new RegExp("(Firefox)-(?:\\d+\\.\\d+)?/(\\d+)\\.(\\d+)(b\\d+[a-z]*)"),
			family_replacement: "Firefox Beta"
		},
		{
			regex: new RegExp("(Namoroka|Shiretoko|Minefield)/(\\d+)\\.(\\d+)([ab]\\d+[a-z]*)?"),
			family_replacement: "Firefox ($1)"
		},
		{
			regex: new RegExp("(Firefox).*Tablet browser (\\d+)\\.(\\d+)\\.(\\d+)"),
			family_replacement: "MicroB",
			tablet: true
		},
		{
			regex: new RegExp("(MozillaDeveloperPreview)/(\\d+)\\.(\\d+)([ab]\\d+[a-z]*)?")
		},
		{
			regex: new RegExp("(Flock)/(\\d+)\\.(\\d+)(b\\d+?)"),
			family_replacement: "Flock",
			other: true
		},
		{
			regex: new RegExp("(RockMelt)/(\\d+)\\.(\\d+)\\.(\\d+)"),
			family_replacement: "Rockmelt",
			other: true
		},
		{
			regex: new RegExp("(Navigator)/(\\d+)\\.(\\d+)\\.(\\d+)"),
			family_replacement: "Netscape"
		},
		{
			regex: new RegExp("(Navigator)/(\\d+)\\.(\\d+)([ab]\\d+)"),
			family_replacement: "Netscape"
		},
		{
			regex: new RegExp("(Netscape6)/(\\d+)\\.(\\d+)\\.(\\d+)"),
			family_replacement: "Netscape"
		},
		{
			regex: new RegExp("(MyIBrow)/(\\d+)\\.(\\d+)"),
			family_replacement: "My Internet Browser",
			other: true
		},
		{
			regex: new RegExp("(Opera Tablet).*Version/(\\d+)\\.(\\d+)(?:\\.(\\d+))?"),
			family_replacement: "Opera Tablet",
			tablet: true
		},
		{
			regex: new RegExp("(Opera)/.+Opera Mobi.+Version/(\\d+)\\.(\\d+)"),
			family_replacement: "Opera Mobile"
		},
		{
			regex: new RegExp("Opera Mobi"),
			family_replacement: "Opera Mobile"
		},
		{
			regex: new RegExp("(Opera Mini)/(\\d+)\\.(\\d+)"),
			family_replacement: "Opera Mini"
		},
		{
			regex: new RegExp("(Opera Mini)/att/(\\d+)\\.(\\d+)"),
			family_replacement: "Opera Mini"
		},
		{
			regex: new RegExp("(Opera)/9.80.*Version/(\\d+)\\.(\\d+)(?:\\.(\\d+))?"),
			family_replacement: "Opera"
		},
		{
			regex: new RegExp("(OPR)/(\\d+)\\.(\\d+)(?:\\.(\\d+))?"),
			family_replacement: "Opera"
		},
		{
			regex: new RegExp("(webOSBrowser)/(\\d+)\\.(\\d+)"),
			family_replacement: "webOS"
		},
		{
			regex: new RegExp("(webOS)/(\\d+)\\.(\\d+)"),
			family_replacement: "webOS"
		},
		{
			regex: new RegExp("(wOSBrowser).+TouchPad/(\\d+)\\.(\\d+)"),
			family_replacement: "webOS TouchPad"
		},
		{
			regex: new RegExp("(luakit)"),
			family_replacement: "LuaKit",
			other: true
		},
		{
			regex: new RegExp("(Lightning)/(\\d+)\\.(\\d+)([ab]?\\d+[a-z]*)"),
			family_replacement: "Lightning",
			other: true
		},
		{
			regex: new RegExp("(Firefox)/(\\d+)\\.(\\d+)\\.(\\d+(?:pre)?) \\(Swiftfox\\)"),
			family_replacement: "Swiftfox",
			other: true
		},
		{
			regex: new RegExp("(Firefox)/(\\d+)\\.(\\d+)([ab]\\d+[a-z]*)? \\(Swiftfox\\)"),
			family_replacement: "Swiftfox",
			other: true
		},
		{
			regex: new RegExp("rekonq"),
			family_replacement: "Rekonq",
			other: true
		},
		{
			regex: new RegExp("(conkeror|Conkeror)/(\\d+)\\.(\\d+)\\.?(\\d+)?"),
			family_replacement: "Conkeror",
			other: true
		},
		{
			regex: new RegExp("(konqueror)/(\\d+)\\.(\\d+)\\.(\\d+)"),
			family_replacement: "Konqueror",
			other: true
		},
		{
			regex: new RegExp("(WeTab)-Browser"),
			family_replacement: "WeTab",
			other: true
		},
		{
			regex: new RegExp("(Comodo_Dragon)/(\\d+)\\.(\\d+)\\.(\\d+)"),
			family_replacement: "Comodo Dragon",
			other: true
		},
		{
			regex: new RegExp("(YottaaMonitor)"),
			family_replacement: "Yottaa Monitor",
			other: true
		},
		{
			regex: new RegExp("(Kindle)/(\\d+)\\.(\\d+)"),
			family_replacement: "Kindle"
		},
		{
			regex: new RegExp("(Symphony) (\\d+).(\\d+)"),
			family_replacement: "Symphony",
			other: true
		},
		{
			regex: new RegExp("Minimo"),
			family_replacement: "Minimo",
			other: true
		},
		{
			regex: new RegExp("(Edge)/(\\d+)\\.(\\d+)"),
			family_replacement: "Edge"
		},
		{
			regex: new RegExp("(CrMo)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)"),
			family_replacement: "Chrome Mobile"
		},
		{
			regex: new RegExp("(CriOS)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)"),
			family_replacement: "Chrome Mobile iOS"
		},
		{
			regex: new RegExp("(Chrome)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+) Mobile"),
			family_replacement: "Chrome Mobile"
		},
		{
			regex: new RegExp("(chromeframe)/(\\d+)\\.(\\d+)\\.(\\d+)"),
			family_replacement: "Chrome Frame"
		},
		{
			regex: new RegExp("(UC Browser)(\\d+)\\.(\\d+)\\.(\\d+)"),
			family_replacement: "UC Browser",
			other: true
		},
		{
			regex: new RegExp("(SLP Browser)/(\\d+)\\.(\\d+)"),
			family_replacement: "Tizen Browser",
			other: true
		},
		{
			regex: new RegExp("(Epiphany)/(\\d+)\\.(\\d+).(\\d+)"),
			family_replacement: "Epiphany",
			other: true
		},
		{
			regex: new RegExp("(SE 2\\.X) MetaSr (\\d+)\\.(\\d+)"),
			family_replacement: "Sogou Explorer",
			other: true
		},
		{
			regex: new RegExp("(Pingdom.com_bot_version_)(\\d+)\\.(\\d+)"),
			family_replacement: "PingdomBot",
			other: true
		},
		{
			regex: new RegExp("(facebookexternalhit)/(\\d+)\\.(\\d+)"),
			family_replacement: "FacebookBot"
		},
		{
			regex: new RegExp("(Twitterbot)/(\\d+)\\.(\\d+)"),
			family_replacement: "TwitterBot"
		},
		{
			regex: new RegExp("(AdobeAIR|Chromium|FireWeb|Jasmine|ANTGalio|Midori|Fresco|Lobo|PaleMoon|Maxthon|Lynx|OmniWeb|Dillo|Camino|Demeter|Fluid|Fennec|Shiira|Sunrise|Chrome|Flock|Netscape|Lunascape|WebPilot|NetFront|Netfront|Konqueror|SeaMonkey|Kazehakase|Vienna|Iceape|Iceweasel|IceWeasel|Iron|K-Meleon|Sleipnir|Galeon|GranParadiso|Opera Mini|iCab|NetNewsWire|ThunderBrowse|Iron|Iris|UP\\.Browser|Bunjaloo|Google Earth|Raven for Mac)/(\\d+)\\.(\\d+)\\.(\\d+)")
		},
		{
			regex: new RegExp("(Bolt|Jasmine|IceCat|Skyfire|Midori|Maxthon|Lynx|Arora|IBrowse|Dillo|Camino|Shiira|Fennec|Phoenix|Chrome|Flock|Netscape|Lunascape|Epiphany|WebPilot|Opera Mini|Opera|NetFront|Netfront|Konqueror|Googlebot|SeaMonkey|Kazehakase|Vienna|Iceape|Iceweasel|IceWeasel|Iron|K-Meleon|Sleipnir|Galeon|GranParadiso|iCab|NetNewsWire|Iron|Space Bison|Stainless|Orca|Dolfin|BOLT|Minimo|Tizen Browser|Polaris)/(\\d+)\\.(\\d+)")
		},
		{
			regex: new RegExp("(iRider|Crazy Browser|SkipStone|iCab|Lunascape|Sleipnir|Maemo Browser) (\\d+)\\.(\\d+)\\.(\\d+)")
		},
		{
			regex: new RegExp("(iCab|Lunascape|Opera|Android|Jasmine|Polaris|BREW) (\\d+)\\.(\\d+)\\.?(\\d+)?")
		},
		{
			regex: new RegExp("(Android) Donut"),
			v2_replacement: "2",
			v1_replacement: "1"
		},
		{
			regex: new RegExp("(Android) Eclair"),
			v2_replacement: "1",
			v1_replacement: "2"
		},
		{
			regex: new RegExp("(Android) Froyo"),
			v2_replacement: "2",
			v1_replacement: "2"
		},
		{
			regex: new RegExp("(Android) Gingerbread"),
			v2_replacement: "3",
			v1_replacement: "2"
		},
		{
			regex: new RegExp("(Android) Honeycomb"),
			v1_replacement: "3"
		},
		{
			regex: new RegExp("(IEMobile)[ /](\\d+)\\.(\\d+)"),
			family_replacement: "IE Mobile"
		},
		{
			regex: new RegExp("(MSIE) (\\d+)\\.(\\d+).*XBLWP7"),
			family_replacement: "IE Large Screen"
		},
		{
			regex: new RegExp("(Firefox)/(\\d+)\\.(\\d+)\\.(\\d+)")
		},
		{
			regex: new RegExp("(Firefox)/(\\d+)\\.(\\d+)(pre|[ab]\\d+[a-z]*)?")
		},
		{
			regex: new RegExp("(Obigo)InternetBrowser"),
			other: true
		},
		{
			regex: new RegExp("(Obigo)\\-Browser"),
			other: true
		},
		{
			regex: new RegExp("(Obigo|OBIGO)[^\\d]*(\\d+)(?:.(\\d+))?"),
			other: true
		},
		{
			regex: new RegExp("(MAXTHON|Maxthon) (\\d+)\\.(\\d+)"),
			family_replacement: "Maxthon",
			other: true
		},
		{
			regex: new RegExp("(Maxthon|MyIE2|Uzbl|Shiira)"),
			v1_replacement: "0",
			other: true
		},
		{
			regex: new RegExp("(PLAYSTATION) (\\d+)"),
			family_replacement: "PlayStation",
			manufacturer: "Sony"
		},
		{
			regex: new RegExp("(PlayStation Portable)[^\\d]+(\\d+).(\\d+)"),
			manufacturer: "Sony"
		},
		{
			regex: new RegExp("(BrowseX) \\((\\d+)\\.(\\d+)\\.(\\d+)"),
			other: true
		},
		{
			regex: new RegExp("(POLARIS)/(\\d+)\\.(\\d+)"),
			family_replacement: "Polaris",
			other: true
		},
		{
			regex: new RegExp("(Embider)/(\\d+)\\.(\\d+)"),
			family_replacement: "Polaris",
			other: true
		},
		{
			regex: new RegExp("(BonEcho)/(\\d+)\\.(\\d+)\\.(\\d+)"),
			family_replacement: "Bon Echo",
			other: true
		},
		{
			regex: new RegExp("(iPod).+Version/(\\d+)\\.(\\d+)\\.(\\d+)"),
			family_replacement: "Mobile Safari",
			manufacturer: "Apple"
		},
		{
			regex: new RegExp("(iPod).*Version/(\\d+)\\.(\\d+)"),
			family_replacement: "Mobile Safari",
			manufacturer: "Apple"
		},
		{
			regex: new RegExp("(iPod)"),
			family_replacement: "Mobile Safari",
			manufacturer: "Apple"
		},
		{
			regex: new RegExp("(iPhone).*Version/(\\d+)\\.(\\d+)\\.(\\d+)"),
			family_replacement: "Mobile Safari",
			manufacturer: "Apple"
		},
		{
			regex: new RegExp("(iPhone).*Version/(\\d+)\\.(\\d+)"),
			family_replacement: "Mobile Safari",
			manufacturer: "Apple"
		},
		{
			regex: new RegExp("(iPhone)"),
			family_replacement: "Mobile Safari",
			manufacturer: "Apple"
		},
		{
			regex: new RegExp("(iPad).*Version/(\\d+)\\.(\\d+)\\.(\\d+)"),
			family_replacement: "Mobile Safari",
			tablet: true,
			manufacturer: "Apple"
		},
		{
			regex: new RegExp("(iPad).*Version/(\\d+)\\.(\\d+)"),
			family_replacement: "Mobile Safari",
			tablet: true,
			manufacturer: "Apple"
		},
		{
			regex: new RegExp("(iPad)"),
			family_replacement: "Mobile Safari",
			tablet: true,
			manufacturer: "Apple"
		},
		{
			regex: new RegExp("(AvantGo) (\\d+).(\\d+)"),
			other: true
		},
		{
			regex: new RegExp("(Avant)"),
			v1_replacement: "1",
			other: true
		},
		{
			regex: new RegExp("^(Nokia)"),
			family_replacement: "Nokia Services (WAP) Browser",
			manufacturer: "Nokia"
		},
		{
			regex: new RegExp("(NokiaBrowser)/(\\d+)\\.(\\d+).(\\d+)\\.(\\d+)"),
			manufacturer: "Nokia"
		},
		{
			regex: new RegExp("(NokiaBrowser)/(\\d+)\\.(\\d+).(\\d+)"),
			manufacturer: "Nokia"
		},
		{
			regex: new RegExp("(NokiaBrowser)/(\\d+)\\.(\\d+)"),
			manufacturer: "Nokia"
		},
		{
			regex: new RegExp("(BrowserNG)/(\\d+)\\.(\\d+).(\\d+)"),
			family_replacement: "NokiaBrowser",
			manufacturer: "Nokia"
		},
		{
			regex: new RegExp("(Series60)/5\\.0"),
			v2_replacement: "0",
			v1_replacement: "7",
			family_replacement: "NokiaBrowser",
			manufacturer: "Nokia"
		},
		{
			regex: new RegExp("(Series60)/(\\d+)\\.(\\d+)"),
			family_replacement: "Nokia OSS Browser",
			manufacturer: "Nokia"
		},
		{
			regex: new RegExp("(S40OviBrowser)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)"),
			family_replacement: "Nokia Series 40 Ovi Browser",
			manufacturer: "Nokia"
		},
		{
			regex: new RegExp("(Nokia)[EN]?(\\d+)"),
			manufacturer: "Nokia"
		},
		{
			regex: new RegExp("(PlayBook).+RIM Tablet OS (\\d+)\\.(\\d+)\\.(\\d+)"),
			family_replacement: "Blackberry WebKit",
			tablet: true,
			manufacturer: "Nokia"
		},
		{
			regex: new RegExp("(Black[bB]erry).+Version/(\\d+)\\.(\\d+)\\.(\\d+)"),
			family_replacement: "Blackberry WebKit",
			manufacturer: "RIM"
		},
		{
			regex: new RegExp("(Black[bB]erry)\\s?(\\d+)"),
			family_replacement: "Blackberry",
			manufacturer: "RIM"
		},
		{
			regex: new RegExp("(OmniWeb)/v(\\d+)\\.(\\d+)"),
			other: true
		},
		{
			regex: new RegExp("(Blazer)/(\\d+)\\.(\\d+)"),
			family_replacement: "Palm Blazer",
			manufacturer: "Palm"
		},
		{
			regex: new RegExp("(Pre)/(\\d+)\\.(\\d+)"),
			family_replacement: "Palm Pre",
			manufacturer: "Palm"
		},
		{
			regex: new RegExp("(Links) \\((\\d+)\\.(\\d+)"),
			other: true
		},
		{
			regex: new RegExp("(QtWeb) Internet Browser/(\\d+)\\.(\\d+)"),
			other: true
		},
		{
			regex: new RegExp("(Silk)/(\\d+)\\.(\\d+)(?:\\.([0-9\\-]+))?"),
			other: true,
			tablet: true
		},
		{
			regex: new RegExp("(AppleWebKit)/(\\d+)\\.?(\\d+)?\\+ .* Version/\\d+\\.\\d+.\\d+ Safari/"),
			family_replacement: "WebKit Nightly"
		},
		{
			regex: new RegExp("(Version)/(\\d+)\\.(\\d+)(?:\\.(\\d+))?.*Safari/"),
			family_replacement: "Safari"
		},
		{
			regex: new RegExp("(Safari)/\\d+")
		},
		{
			regex: new RegExp("(OLPC)/Update(\\d+)\\.(\\d+)"),
			other: true
		},
		{
			regex: new RegExp("(OLPC)/Update()\\.(\\d+)"),
			v1_replacement: "0",
			other: true
		},
		{
			regex: new RegExp("(SEMC\\-Browser)/(\\d+)\\.(\\d+)"),
			other: true
		},
		{
			regex: new RegExp("(Teleca)"),
			family_replacement: "Teleca Browser",
			other: true
		},
		{
			regex: new RegExp("Trident(.*)rv.(\\d+)\\.(\\d+)"),
			family_replacement: "IE"
		}
	];
};
// anonymous functions
var browserExec = function (exec) {
	"use strict";
	browserArr.every(function (browser) {
		var regex = new RegExp("(" + browser + ")", "i");
		if (regex.test(exec)) {
			document.documentElement.setAttribute('data-browser', browser.match(regex)[0].toLowerCase());
		} else {
			return true;
		}
	});
};
var setBrowser = function () {
	"use strict";
	var browserRegexArr = new BrowserRegexes(),
		userAgent = navigator.userAgent;
	
	browserRegexArr.regexes.every(function (element) {
		if (element.regex.test(userAgent)) {
			if (element.family_replacement) {
				document.documentElement.setAttribute('data-browser', element.family_replacement.toLowerCase());
			} else {
				browserExec(element.regex.exec(userAgent)[0]);
			}
			return false;
		} else {
			return true;
		}
	});
};
var isBrowser = function (browser) {
	"use strict";
	var browserRegexArr = new BrowserRegexes(), userAgent = navigator.userAgent, returnValue = false;
	browserRegexArr.regexes.every(function (element) {
		if (element.regex.test(userAgent)) {
			if (element.family_replacement) {
				returnValue = true;
				return false;
			} else {
				browserArr.every(function (browserItem) {
					var regex = new RegExp("(" + browserItem + ")");
					if (regex.test(browser)) {
						returnValue = true;
						return false;
					} else {
						return true;
					}
				});
				return false;
			}
		}
		return true;
	});
	return returnValue;
};