;
(function () {
    "use strict";
    var BASE_CLASS = 'crosshairCursor-',
        LINE_CLASS = BASE_CLASS + 'line',
        TEMP_LINE = LINE_CLASS + '-temp',
        HLINE_CLASS = BASE_CLASS + 'hLine',
        VLINE_CLASS = BASE_CLASS + 'vLine';

    var CrosshairCursor = function ($el) {
        this._$el = $el;
        this._bindedFn = {
            onMouseMove: $.proxy(this, '_onMouseMove')
        };
        this._createLines();
        this._enableEvents();
    };

    CrosshairCursor.prototype = {
        _enableEvents: function () {
            this._$el.on('mousemove', this._bindedFn.onMouseMove);
        },

        enableTempLines: function (x, y) {
            this._$tempHLine = $('<div class="' + LINE_CLASS + ' ' + TEMP_LINE + ' ' + HLINE_CLASS + '">');
            this._$tmpVLine = $('<div class="' + LINE_CLASS + ' ' + TEMP_LINE + ' ' + VLINE_CLASS + '">');
            this._$el.append(this._$tempHLine, this._$tmpVLine);
            this.draw(this._$tempHLine, this._$tmpVLine, event.clientX, event.clientY);
        },

        disableTempLines: function () {
            if (this._$tempHLine) {
                this._$tempHLine.remove();
                this._$tempHLine = null;
                this._$tmpVLine.remove();
                this._$tmpVLine = null;
            }
        },

        _createLines: function (event) {
            this._$hLine = $('<div class="' + LINE_CLASS + ' ' + HLINE_CLASS + '">');
            this._$vLine = $('<div class="' + LINE_CLASS + ' ' + VLINE_CLASS + '">');
            this._$el.append(this._$hLine, this._$vLine);
        },

        draw: function ($hLine, $vLine, x, y) {
            $hLine.css('top', y);
            $vLine.css('left', x);
        },

        _onMouseMove: function (event) {
            this.draw(this._$hLine, this._$vLine, event.clientX, event.clientY);
        }
    };

    window.CrosshairCursor = CrosshairCursor;
})();