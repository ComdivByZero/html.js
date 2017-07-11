var TableConverter;
(function(tc) {
	'use strict';

	tc.std_options = {
		id : null,
		caption : null,
		ishead : true,

		txclass : null,
		tdclass: null,
		thclass: null
	};

	tc.toHtml = function(table, opt) {
		var text, ti, i, j, filter, tdc, thc;

		if (!opt) {
			opt = tc.std_options;
		}
		if (opt && opt.filter) {
			filter = opt.filter;
		} else {
			filter = function(item, line, row) { return item; };
		}
		if (opt.tdclass) {
			tdc = opt.tdclass;
		} else {
			tdc = opt.txclass;
		}
		if (opt.tdclass) {
			thc = opt.thclass;
		} else {
			thc = opt.txclass;
		}
		if (opt.id) {
			text = [
				'<TABLE id="',
				opt.id,
				'">'
			];
			ti = 3;
		} else {
			text = ['<TABLE>'];
			ti = 1;
		}
		if (opt.caption) {
			text[ti] = "<CAPTION>";
			text[ti + 1] = opt.caption;
			text[ti + 2] =  "</CAPTION>";
			ti += 3;
		}
		for (i = 0; i < table.length; ++i) {
			text[ti] = "<TR>";
			++ti;
			for (j = 0; j < table[i].length; ++j) {
				if ((opt.ishead != false) && (i * j == 0)) {
					if (thc) {
						text[ti] = "<TH class=";
						text[ti + 1] = thc;
						text[ti + 2] = ">";
						ti += 5;
					} else {
						text[ti] = "<TH>";
						ti += 3;
					}
					text[ti - 2] = filter(table[i][j], i, j);
					text[ti - 1] = "</TH>";
				} else {
					if (tdc) {
						text[ti] = "<TD class=";
						text[ti + 1] = tdc;
						text[ti + 2] = ">";
						ti += 5;
					} else {
						text[ti] = "<TD>";
						ti += 3;
					}
					text[ti - 2] = filter(table[i][j], i, j);
					text[ti - 1] = "</TD>";
				}
			}
			text[ti] = "</TR>";
			++ti;
		}
		text[ti] = "</TABLE>";
		return text.join('');
	};

	tc.setToId = function(id, table, opt) {
		var d;
		d = document.getElementById(id);
		if (d) {
			d.innerHTML = tc.toHtml(table, opt);
		}
		return d;
	};

	tc.toJs = function(table, opt) {
		var t, i, j, lines, items, filter;

		if (opt && opt.filter) {
			filter = opt.filter;
		} else {
			filter = function(item, i, j) { return item.innerText; };
		}
		lines = table.getElementsByTagName("TR");
		t = [];
		for (i = 0; i < lines.length; ++i) {
			items = lines[i].children;
			t[i] = [];
			for (j = 0; j < items.length; ++j) {
				t[i][j] = filter(items[j], i, j);
			}
		}
		return t;
	};

	tc.getById = function(id, opt) {
		var d, t;
		d = document.getElementById(id);
		if (d) {
			t = tc.toJs(d, opt);
		} else {
			t = null;
		}
		return t;
	};
})(TableConverter || (TableConverter = {}));
