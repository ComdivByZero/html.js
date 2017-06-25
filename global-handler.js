var GlobalHandler;
(function(gh) {
	"use strict";

	gh.reset = function() {
		gh.storage = [];
		gh.id = 0;
	}

	gh.reset();

	gh.add = function(handler) {
		var i;
		i = gh.id;
		gh.storage[i] = handler;
		++gh.id;
		return {
			id		: i,
			name	: "GlobalHandler.storage[" + i + "]"
		};
	}

	gh.remove = function(id) {
		delete gh.storage[id];
	}

})(GlobalHandler || (GlobalHandler = {}));
