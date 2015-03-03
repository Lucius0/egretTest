var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var skins;
(function (skins) {
    var simple;
    (function (simple) {
        var progressBar = (function (_super) {
            __extends(progressBar, _super);
            function progressBar() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [220, 400]);
                this.elementsContent = [this.track_i(), this.thumb_i(), this.labelDisplay_i()];
                this.states = [
                    new egret.gui.State("normal", [
                    ]),
                    new egret.gui.State("disabled", [
                    ])
                ];
            }
            Object.defineProperty(progressBar.prototype, "skinParts", {
                get: function () {
                    return progressBar._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            progressBar.prototype.labelDisplay_i = function () {
                var t = new egret.gui.Label();
                this.labelDisplay = t;
                this.__s(t, ["left", "maxDisplayedLines", "right", "size", "textAlign", "textColor", "verticalAlign", "verticalCenter"], [5, 1, 5, 20, "center", 0x707070, "middle", 0]);
                return t;
            };
            progressBar.prototype.thumb_i = function () {
                var t = new egret.gui.Rect();
                this.thumb = t;
                this.__s(t, ["bottom", "fillColor", "top", "width"], [0, 822867, 0, 20]);
                return t;
            };
            progressBar.prototype.track_i = function () {
                var t = new egret.gui.Rect();
                this.track = t;
                this.__s(t, ["fillColor", "left", "right", "strokeAlpha", "strokeColor", "strokeWeight"], [0xe6e6e6, 0, 0, 1, 14210003, 2]);
                return t;
            };
            progressBar._skinParts = ["track", "thumb", "labelDisplay"];
            return progressBar;
        })(egret.gui.Skin);
        simple.progressBar = progressBar;
        progressBar.prototype.__class__ = "skins.simple.progressBar";
    })(simple = skins.simple || (skins.simple = {}));
})(skins || (skins = {}));
