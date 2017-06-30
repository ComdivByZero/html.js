var TextareaTab;
(function(tt) {
	"use strict";

	var std_options = {
		tab       : "    ",
		autoindent: true
	};

	function inject(ta, opt) {
		var tab, auto;

		function listen(e) {
			function isSpace(ch) {
				return (ch == ' ') || (ch == '\t');
			}
			var start, end, ret, i, j, text, ins;

			start = ta.selectionStart;
			end = ta.selectionEnd;
			text = ta.value;

			if (9 == e.which) {
				ins = tab;
			} else if (auto && (13 == e.which)) {
				i = start;
				while ((i > 0) && (text.charAt(i - 1) != '\n')) {
					--i;
				}
				j = i;
				while (isSpace(text.charAt(j))) {
					++j;
				}
				ins = "\n" + text.substr(i, j - i);
			} else {
				ins = null;
			}
			if (ins != null) {
				ta.value = text.substr(0, start) + ins + text.substr(end);
				start += ins.length;
				ta.selectionStart = start;
				ta.selectionEnd = start;

				e.preventDefault();
				ret = false;
			}
			return ret;
		}

		if (opt && opt.tab) {
			opt = opt.tab;
		} else {
			tab = std_options.tab;
		}
		if (opt && opt.autoindent) {
			auto = opt.autoindent;
		} else {
			auto = std_options.autoindent;
		}

		ta.addEventListener('keydown', listen);
	}

	function injectAll(opt) {
		var i, a;
		a = document.getElementsByTagName("textarea");
		for (i = 0; i < a.length; i += 1) {
			inject(a[i], opt);
		}
	}

	function injectById(id, opt) {
		inject(document.getElementById(id), opt);
	}

	tt.inject = inject;
	tt.injectAll = injectAll;
	tt.injectById = injectById;

})(TextareaTab || (TextareaTab = {}));
