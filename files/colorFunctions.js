// color functions
function cutHex(hex) {
	'use strict';
	return (hex.charAt(0)==="#") ? hex.substring(1,7):hex;
}
function hexToRgb(hex){
	'use strict';
	hex = cutHex(hex);
	var r = parseInt(hex.substring(0,2),16); 
	var g = parseInt(hex.substring(2,4),16);
	var b = parseInt(hex.substring(4,6),16);
	return {'r':r, 'g':g, 'b':b};
}
function rgbToHex(rgb){
	'use strict';
	rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
	return (rgb && rgb.length === 4) ? "#" + ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) + ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) + ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
}
function setBackgroundColor(element, color){
	'use strict';
	var bgColor = hexToRgb(color);
	bgColor = bgColor.r+','+bgColor.g+','+bgColor.b;
	element.style.backgroundColor = 'rgb(' +bgColor+ ')';
}
function colorEffect(element, currentColor, nextColor, steps, durartionStep){
	'use strict';
	var startColor = hexToRgb(currentColor);
	var endColor = hexToRgb(nextColor);
	
	var red_change = (startColor.r - endColor.r) / steps;
	var green_change = (startColor.g - endColor.g)/ steps;
	var blue_change = (startColor.b - endColor.b)/ steps;
	
	endColor = endColor.r+','+endColor.g+','+endColor.b;
	
	var stepcount = 0;
	var timer = setInterval(function(){
		startColor.r = parseInt(startColor.r - red_change);
		startColor.g = parseInt(startColor.g - green_change);
		startColor.b = parseInt(startColor.b - blue_change);
		startColor = startColor.r+','+startColor.g+','+startColor.b;
		
		element.style.backgroundColor = 'rgb(' +startColor+ ')';
		stepcount += 1;
		if (stepcount >= steps) {
			element.style.backgroundColor = 'rgb(' +endColor+ ')';
			clearInterval(timer);
		}
	}, durartionStep);
}
