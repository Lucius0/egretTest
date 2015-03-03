var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var skins;
(function (skins) {
    var HSliderSkin = (function (_super) {
        __extends(HSliderSkin, _super);
        function HSliderSkin() {
            _super.call(this);
            this.__s = egret.gui.setProperties;
            this.__s(this, ["minHeight", "minWidth"], [13, 50]);
            this.elementsContent = [this.track_i(), this.trackHighlight_i(), this.thumb_i()];
            this.states = [
                new egret.gui.State("normal", [
                ]),
                new egret.gui.State("disabled", [
                ])
            ];
        }
        Object.defineProperty(HSliderSkin.prototype, "skinParts", {
            get: function () {
                return HSliderSkin._skinParts;
            },
            enumerable: true,
            configurable: true
        });
        HSliderSkin.prototype.thumb_i = function () {
            var t = new egret.gui.Button();
            this.thumb = t;
            this.__s(t, ["height", "skinName", "verticalCenter", "width"], [24, skins.HSliderThumbSkin, 0, 24]);
            return t;
        };
        HSliderSkin.prototype.trackHighlight_i = function () {
            var t = new egret.gui.UIAsset();
            this.trackHighlight = t;
            this.__s(t, ["height", "source", "verticalCenter"], [10, "hslider_fill_png", 0]);
            return t;
        };
        HSliderSkin.prototype.track_i = function () {
            var t = new egret.gui.UIAsset();
            this.track = t;
            this.__s(t, ["height", "source", "verticalCenter", "percentWidth"], [10, "hslider_track_png", 0, 100]);
            return t;
        };
        HSliderSkin._skinParts = ["track", "trackHighlight", "thumb"];
        return HSliderSkin;
    })(egret.gui.Skin);
    skins.HSliderSkin = HSliderSkin;
    HSliderSkin.prototype.__class__ = "skins.HSliderSkin";
})(skins || (skins = {}));
