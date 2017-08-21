// variables
var osRegexArr, userAgent;
// classes
var OsRegexes = function () {
	"use strict";
	this.regexes = [
		{
			regex: new RegExp("(Android) (\\d+)\\.(\\d+)(?:[.\\-]([a-z0-9]+))?")
		},
		{
			regex: new RegExp("(Android)\\-(\\d+)\\.(\\d+)(?:[.\\-]([a-z0-9]+))?")
		},
		{
			regex: new RegExp("(Android) Donut"),
			os_v2_replacement: "2",
			os_v1_replacement: "1"
		},
		{
			regex: new RegExp("(Android) Eclair"),
			os_v2_replacement: "1",
			os_v1_replacement: "2"
		},
		{
			regex: new RegExp("(Android) Froyo"),
			os_v2_replacement: "2",
			os_v1_replacement: "2"
		},
		{
			regex: new RegExp("(Android) Gingerbread"),
			os_v2_replacement: "3",
			os_v1_replacement: "2"
		},
		{
			regex: new RegExp("(Android) Honeycomb"),
			os_v1_replacement: "3"
		},
		{
			regex: new RegExp("(Silk-Accelerated=[a-z]{4,5})"),
			os_replacement: "Android"
		},
		{
			regex: new RegExp("(Windows Phone 6\\.5)")
		},
		{
			regex: new RegExp("(Windows (?:NT 5\\.2|NT 5\\.1))"),
			os_replacement: "Windows XP"
		},
		{
			regex: new RegExp("(XBLWP7)"),
			os_replacement: "Windows Phone OS"
		},
		{
			regex: new RegExp("(Windows NT 6\\.1)"),
			os_replacement: "Windows 7"
		},
		{
			regex: new RegExp("(Windows NT 6\\.0)"),
			os_replacement: "Windows Vista"
		},
		{
			regex: new RegExp("(Windows 98|Windows XP|Windows ME|Windows 95|Windows CE|Windows 7|Windows NT 4\\.0|Windows Vista|Windows 2000)")
		},
		{
			regex: new RegExp("(Windows NT 6\\.4|Windows NT 10\\.0)"),
			os_replacement: "Windows 10"
		},
		{
			regex: new RegExp("(Windows NT 6\\.2)"),
			os_replacement: "Windows 8"
		},
		{
			regex: new RegExp("(Windows Phone 8)"),
			os_replacement: "Windows Phone 8"
		},
		{
			regex: new RegExp("(Windows NT 5\\.0)"),
			os_replacement: "Windows 2000"
		},
		{
			regex: new RegExp("(Windows Phone OS) (\\d+)\\.(\\d+)")
		},
		{
			regex: new RegExp("(Windows ?Mobile)"),
			os_replacement: "Windows Mobile"
		},
		{
			regex: new RegExp("(WinNT4.0)"),
			os_replacement: "Windows NT 4.0"
		},
		{
			regex: new RegExp("(Win98)"),
			os_replacement: "Windows 98"
		},
		{
			regex: new RegExp("(Tizen)/(\\d+)\\.(\\d+)"),
			other: true
		},
		{
			regex: new RegExp("(Mac OS X) (\\d+)[_.](\\d+)(?:[_.](\\d+))?"),
			manufacturer: "Apple"
		},
		{
			regex: new RegExp("(?:PPC|Intel) (Mac OS X)"),
			manufacturer: "Apple"
		},
		{
			regex: new RegExp("(CPU OS|iPhone OS) (\\d+)_(\\d+)(?:_(\\d+))?"),
			os_replacement: "iOS",
			manufacturer: "Apple"
		},
		{
			regex: new RegExp("(iPhone|iPad|iPod); Opera"),
			os_replacement: "iOS",
			manufacturer: "Apple"
		},
		{
			regex: new RegExp("(iPad); Opera"),
			tablet: true,
			manufacturer: "Apple"
		},
		{
			regex: new RegExp("(iPhone|iPad|iPod).*Mac OS X.*Version/(\\d+)\\.(\\d+)"),
			os_replacement: "iOS",
			manufacturer: "Apple"
		},
		{
			regex: new RegExp("(CrOS) [a-z0-9_]+ (\\d+)\\.(\\d+)(?:\\.(\\d+))?"),
			os_replacement: "Chrome OS"
		},
		{
			regex: new RegExp("(Debian)-(\\d+)\\.(\\d+)\\.(\\d+)(?:\\.(\\d+))?"),
			other: true
		},
		{
			regex: new RegExp("(Linux Mint)(?:/(\\d+))?"),
			other: true
		},
		{
			regex: new RegExp("(Mandriva)(?: Linux)?/(\\d+)\\.(\\d+)\\.(\\d+)(?:\\.(\\d+))?"),
			other: true
		},
		{
			regex: new RegExp("(Symbian[Oo][Ss])/(\\d+)\\.(\\d+)"),
			os_replacement: "Symbian OS"
		},
		{
			regex: new RegExp("(Symbian/3).+NokiaBrowser/7\\.3"),
			os_replacement: "Symbian^3 Anna"
		},
		{
			regex: new RegExp("(Symbian/3).+NokiaBrowser/7\\.4"),
			os_replacement: "Symbian^3 Belle"
		},
		{
			regex: new RegExp("(Symbian/3)"),
			os_replacement: "Symbian^3"
		},
		{
			regex: new RegExp("(Series 60|SymbOS|S60)"),
			os_replacement: "Symbian OS"
		},
		{
			regex: new RegExp("(MeeGo)"),
			other: true
		},
		{
			regex: new RegExp("Symbian [Oo][Ss]"),
			os_replacement: "Symbian OS"
		},
		{
			regex: new RegExp("(Black[Bb]erry)[0-9a-z]+/(\\d+)\\.(\\d+)\\.(\\d+)(?:\\.(\\d+))?"),
			os_replacement: "BlackBerry OS",
			manufacturer: "RIM"
		},
		{
			regex: new RegExp("(Black[Bb]erry).+Version/(\\d+)\\.(\\d+)\\.(\\d+)(?:\\.(\\d+))?"),
			os_replacement: "BlackBerry OS",
			manufacturer: "RIM"
		},
		{
			regex: new RegExp("(RIM Tablet OS) (\\d+)\\.(\\d+)\\.(\\d+)"),
			os_replacement: "BlackBerry Tablet OS",
			tablet: true,
			manufacturer: "RIM"
		},
		{
			regex: new RegExp("(Play[Bb]ook)"),
			os_replacement: "BlackBerry Tablet OS",
			tablet: true,
			manufacturer: "RIM"
		},
		{
			regex: new RegExp("(Black[Bb]erry)"),
			os_replacement: "Blackberry OS",
			manufacturer: "RIM"
		},
		{
			regex: new RegExp("(webOS|hpwOS)/(\\d+)\\.(\\d+)(?:\\.(\\d+))?"),
			os_replacement: "webOS"
		},
		{
			regex: new RegExp("(SUSE|Fedora|Red Hat|PCLinuxOS)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)"),
			other: true
		},
		{
			regex: new RegExp("(SUSE|Fedora|Red Hat|Puppy|PCLinuxOS|CentOS)/(\\d+)\\.(\\d+)\\.(\\d+)"),
			other: true
		},
		{
			regex: new RegExp("(Ubuntu|Kindle|Bada|Lubuntu|BackTrack|Red Hat|Slackware)/(\\d+)\\.(\\d+)")
		},
		{
			regex: new RegExp("(Windows|OpenBSD|FreeBSD|NetBSD|Ubuntu|Kubuntu|Android|Arch Linux|CentOS|WeTab|Slackware)")
		},
		{
			regex: new RegExp("(Linux|BSD)"),
			other: true
		}
	];
};
// anonymous functions
var setOs = function () {
	"use strict";
	var osRegexArr = new OsRegexes(),
		userAgent = navigator.userAgent;
	
	osRegexArr.regexes.every(function (element) {
		if (element.regex.test(userAgent)) {
			if (element.os_replacement) {
				document.documentElement.setAttribute('data-os', element.os_replacement.toLowerCase());
			}
			return false;
		} else {
			return true;
		}
	});
};