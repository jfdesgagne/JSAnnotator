;
(function () {
    "use strict";
    var BASE_CLASS = 'annotator';

    var Annotator = function () {
        this.startBox = $.proxy(this, '_startBox');
        this.updateBoxSize = $.proxy(this, '_updateBoxSize');
        this.endBox = $.proxy(this, '_endBox');
        this.numBoxes = 0;

        this._createElement();
        this._createCrosshairCursor();
        this._enableEvents();
    };

    Annotator.prototype = {
        _createElement: function () {
            this._$el = $('<div class="' + BASE_CLASS + '">');
        },

        _enableEvents: function () {
            this._$el.on('mousemove', this._crosshairCursor.onFollowCursor);
            this._$el.on('mousedown', this.startBox);
        },

        _createCrosshairCursor: function () {
            this._crosshairCursor = new CrosshairCursor(this._$el);
        },

        _startBox: function (event) {
            this._$el.on('mousemove', this.updateBoxSize)
            this._$el.on('mouseup', this.endBox);
            this.numBoxes++;

            this._currentBox = new AnnotationBox(event.clientX, event.clientY);
            this._$el.append(this._currentBox.getElement());
            this._crosshairCursor.enableTempLines(event.clientX, event.clientY);
        },

        _updateBoxSize: function (event) {
            this._currentBox.setEndPosition(event.clientX, event.clientY);
        },

        _endBox: function (event) {
            this._$el.off('mousemove', this.updateBoxSize)
            this._$el.off('mousedown', this.endBox);
            this._currentBox = null;
            this._crosshairCursor.disableTempLines();
        },

        getElement: function () {
            return this._$el;
        }
    };

    //Factory
    Annotator.create = function ($container) {
        var annotator = new Annotator();
        $($container).append(annotator.getElement());
        return annotator;
    }
    window.Annotator = Annotator;
})();