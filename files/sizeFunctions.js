// element size functions 
function viewportSize(){
	'use strict';
	var height, width;
	if (typeof window.innerHeight !== 'undefined'){
		height = window.innerHeight;
		width = window.innerWidth;
	}
	else if (typeof document.documentElement !== 'undefined' && typeof document.documentElement.clientWidth !== 'undefined' && document.documentElement.clientWidth !== 0){
		height = document.documentElement.clientHeight;
		width = document.documentElement.clientWidth;
	}
	else{
		height = document.getElementsByTagName('body')[0].clientHeight;
		width = document.getElementsByTagName('body')[0].clientWidth;
	}
	return {'width':width, 'height':height};
}
function elementSize(element){
	'use strict';
	return {'width': element.offsetWidth, 'height':element.offsetHeight}; 
}
function imageSize(element){
	'use strict';
	var imageSrc = element.style.backgroundImage.replace(/url\((['"])?(.*?)\1\)/gi, '$2').split(',')[0];
	var image = new Image();
	image.src = imageSrc;
	return {'width': image.width, 'height':image.height};
}
