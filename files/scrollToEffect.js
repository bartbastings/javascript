(function(){
	
	this.ScrollToEffect = function(element, target){
		var defaults = {
			duration : 500
		};
		if (arguments[0] && typeof arguments[0] === "object") {
			this.options = extendDefaults(defaults, arguments[0]);
		}
	};
	
	function scrollToEffect(element, target) {
		var duration = this.options.duration; 
		target = Math.round(target);
		duration = Math.round(duration);
		if (duration < 0) {
			return Promise.reject("bad duration");
		}
		if (duration === 0) {
			element.scrollTop = target;
			return Promise.resolve();
		}
		var start_time = Date.now();
		var end_time = start_time + duration;
		
		var start_top = element.scrollTop;
		var distance = target - start_top;
		
		var smooth_step = function(start, end, point) {
			if(point <= start) { return 0; }
			if(point >= end) { return 1; }
			var x = (point - start) / (end - start); // interpolation
			return x*x*(3 - 2*x);
		};
		
		return new Promise(function(resolve, reject) {
			var previous_top = element.scrollTop;
		
			var scroll_frame = function() {
				if(element.scrollTop !== previous_top) {
					reject("interrupted");
					return;
				}
		
				var now = Date.now();
				var point = smooth_step(start_time, end_time, now);
				var frameTop = Math.round(start_top + (distance * point));
				element.scrollTop = frameTop;
		
				if(now >= end_time) {
					resolve();
					return;
				}
				
				if(element.scrollTop === previous_top && element.scrollTop !== frameTop) {
					resolve();
					return;
				}
				previous_top = element.scrollTop;
				
				setTimeout(scroll_frame, 0);
			};
			setTimeout(scroll_frame, 0);
		});
	}
	
	ScrollToEffect.prototype.scrollToEffect = function(element, target){
		scrollToEffect.call(this, element, target);
	};
	
	function extendDefaults(source, properties) {
		var property;
		for (property in properties) {
			if (properties.hasOwnProperty(property)) {
				source[property] = properties[property];
			}
		}
		return source;
	
