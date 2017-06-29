var TextareaTab;
(function(tt) {
	"use strict";

	var std_options = {
		tab       : "    ",
		autoindent: true
	};

	function isSpace(ch) {
		return (ch == 32) || (ch == 9);
	}

	function makeTabable(ta, opt) {
		var tab, auto;

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

		ta.addEventListener('keydown', function (e) {
			var start, end, ret, i, j, text, ins;

			start = ta.selectionStart;
			end = ta.selectionEnd;
			text = ta.value;

			ins = null;
			switch (e.which) {
			case 9:
				ins = tab;
				break;
			case 13:
				if (auto) {
					i = start;
					while ((i > 0) && (text.charCodeAt(i - 1) != 10)) {
						--i;
					}
					j = i;
					while (isSpace(text.charCodeAt(j))) {
						++j;
					}
					ins = "\n" + text.substr(i, j - i);
				}
				break;
			default:
				break;
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
		});
	}

	function makeAllTabable(opt) {
		var i, a;
		a = document.getElementsByTagName("textarea");
		for (i = 0; i < a.length; i += 1) {
			makeTabable(a[i], opt);
		}
	}

	function makeTabableById(id, opt) {
		makeTabable(document.getElementById(id), opt);
	}

	tt.makeTabable = makeTabable;
	tt.makeAllTabable = makeAllTabable;
	tt.makeTabableById = makeTabableById;

})(TextareaTab || (TextareaTab = {}));
