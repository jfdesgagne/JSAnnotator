;
(function () {
    "use strict";
    var BASE_CLASS = 'annotation-box';

    var AnnotationBox = function (x, y) {
        this._createElement();
        this._startX = x;
        this._startY = y;

    };

    AnnotationBox.prototype = {
        _createElement: function () {
            this._$el = $('<div class="' + BASE_CLASS + '">');
        },

        getElement: function () {
            return this._$el;
        },

        setEndPosition: function (x2, y2) {
            var x1 = Math.min(this._startX, x2),
                y1 = Math.min(this._startY, y2),
                x2 = Math.max(this._startX, x2),
                y2 = Math.max(this._startY, y2),
                w = x2 - x1,
                h = y2 - y1;

            this.update(x1, y1, w, h);
        },

        update: function (x, y, w, h) {
            this._$el.css({
                'left': x,
                'top': y,
                'width': w,
                'height': h
            })
        }
    };

    window.AnnotationBox = AnnotationBox;
})();