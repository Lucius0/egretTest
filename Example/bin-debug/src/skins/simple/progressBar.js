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
                this.elementsContent = [this.__3_i(), this.track_i(), this.thumb_i(), this.labelDisplay_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
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
                this.__s(t, ["height", "left", "maxDisplayedLines", "right", "size", "textAlign", "textColor", "verticalAlign", "verticalCenter"], [104, 5, 1, 5, 20, "center", 0xffffff, "middle", 0]);
                return t;
            };
            progressBar.prototype.__3_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["bottom", "fillMode", "left", "right", "scale9Grid", "source", "top"], [0, "scale", 0, 0, egret.gui.getScale9Grid("30,20,30,5"), "resource/assets/simple/ProgressBar/Progressbar_fill.png", 0]);
                return t;
            };
            progressBar.prototype.thumb_i = function () {
                var t = new egret.gui.UIAsset();
                this.thumb = t;
                this.__s(t, ["bottom", "fillMode", "left", "scale9Grid", "source", "top", "width"], [5, "scale", 8, egret.gui.getScale9Grid("15,15,44,5"), "resource/assets/simple/ProgressBar/Progressbar_track.png", 5, 71]);
                return t;
            };
            progressBar.prototype.track_i = function () {
                var t = new egret.gui.Group();
                this.track = t;
                this.__s(t, ["bottom", "left", "right", "top"], [5, 8, 9, 5]);
                return t;
            };
            progressBar._skinParts = ["track", "thumb", "labelDisplay"];
            return progressBar;
        })(egret.gui.Skin);
        simple.progressBar = progressBar;
        progressBar.prototype.__class__ = "skins.simple.progressBar";
    })(simple = skins.simple || (skins.simple = {}));
})(skins || (skins = {}));
