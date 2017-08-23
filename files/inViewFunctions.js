// also need to include sizeFunctions.js
function elementIntoView(element, itemScroll)
{
	'use strict';
	var viewSize = viewportSize();
	var viewTop = itemScroll;
	var viewBottom = viewTop + viewSize.height;
	var elementTop = element.offsetTop;
	var elementBottom = elementTop+(elementSize(element).height);

	return ((elementTop < viewBottom) && (elementBottom > viewTop));
}
function elementIntoViewGrid(element, itemScroll)
{
	'use strict';
	var viewSize = viewportSize();
	var viewTop = itemScroll;
	var viewBottom = viewTop + viewSize.height;
	var elementTop = element.offsetTop;
	var elementBottom = elementTop+(elementSize(element).height);
	var grid1 = Math.round((elementSize(element).height)*.3);
	var grid2 = Math.round((elementSize(element).height)*.7);
	
	var gridTop = elementTop+grid1;
	var gridBottom = elementTop+grid2;
	
	return ((viewTop > gridTop) && (viewBottom < gridBottom));
}
