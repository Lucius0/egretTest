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
        var TitleWindowDemoSkin = (function (_super) {
            __extends(TitleWindowDemoSkin, _super);
            function TitleWindowDemoSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["maxWidth", "minHeight", "minWidth"], [710, 230, 470]);
                this.elementsContent = [this.__1_i(), this.moveArea_i(), this.__2_i(), this.contentGroup_i()];
            }
            Object.defineProperty(TitleWindowDemoSkin.prototype, "skinParts", {
                get: function () {
                    return TitleWindowDemoSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            TitleWindowDemoSkin.prototype.__2_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["bottom", "fillAlpha", "fillColor", "left", "right", "top"], [10, 1, 0xffffff, 10, 10, 50]);
                return t;
            };
            TitleWindowDemoSkin.prototype.closeButton_i = function () {
                var t = new egret.gui.Button();
                this.closeButton = t;
                this.__s(t, ["right", "skinName", "verticalCenter"], [10, skins.simple.CloseButtonSkin, 0]);
                return t;
            };
            TitleWindowDemoSkin.prototype.contentGroup_i = function () {
                var t = new egret.gui.Group();
                this.contentGroup = t;
                this.__s(t, ["bottom", "top", "percentWidth"], [0, 50, 100]);
                return t;
            };
            TitleWindowDemoSkin.prototype.moveArea_i = function () {
                var t = new egret.gui.Group();
                this.moveArea = t;
                this.__s(t, ["height", "left", "right"], [50, 3, 9]);
                t.elementsContent = [this.titleDisplay_i(), this.closeButton_i()];
                return t;
            };
            TitleWindowDemoSkin.prototype.__1_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillAlpha", "fillColor", "percentHeight", "strokeAlpha", "strokeColor", "strokeWeight", "percentWidth"], [1, 0xff0000, 100, 1, 0x888888, .5, 100]);
                return t;
            };
            TitleWindowDemoSkin.prototype.titleDisplay_i = function () {
                var t = new egret.gui.Label();
                this.titleDisplay = t;
                this.__s(t, ["fontFamily", "left", "maxDisplayedLines", "minHeight", "right", "size", "textAlign", "textColor", "verticalAlign", "verticalCenter"], ["Tahoma", 5, 1, 28, 5, 26, "center", 0xffffff, "middle", 0]);
                return t;
            };
            TitleWindowDemoSkin._skinParts = ["titleDisplay", "closeButton", "moveArea", "contentGroup"];
            return TitleWindowDemoSkin;
        })(egret.gui.Skin);
        simple.TitleWindowDemoSkin = TitleWindowDemoSkin;
        TitleWindowDemoSkin.prototype.__class__ = "skins.simple.TitleWindowDemoSkin";
    })(simple = skins.simple || (skins.simple = {}));
})(skins || (skins = {}));
