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
        var PuzzleSkin = (function (_super) {
            __extends(PuzzleSkin, _super);
            function PuzzleSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["maxWidth", "minHeight", "minWidth"], [710, 230, 470]);
                this.elementsContent = [this.__4_i(), this.moveArea_i(), this.contentGroup_i()];
                this.states = [
                    new egret.gui.State("normal", [
                        new egret.gui.SetProperty("btn_0", "skinName", new egret.gui.ButtonSkin("button_normal_png")),
                        new egret.gui.SetProperty("btn_1", "skinName", new egret.gui.ButtonSkin("button_normal_png")),
                        new egret.gui.SetProperty("btn_2", "skinName", new egret.gui.ButtonSkin("button_normal_png"))
                    ]),
                    new egret.gui.State("disabled", [
                        new egret.gui.SetProperty("btn_0", "skinName", new egret.gui.ButtonSkin("", "", "button_disabled_png")),
                        new egret.gui.SetStyle("btn_0", "textColor", 0x79B273),
                        new egret.gui.SetProperty("btn_1", "skinName", new egret.gui.ButtonSkin("", "", "button_disabled_png")),
                        new egret.gui.SetStyle("btn_1", "textColor", 0x79B273),
                        new egret.gui.SetProperty("btn_2", "skinName", new egret.gui.ButtonSkin("", "", "button_disabled_png")),
                        new egret.gui.SetStyle("btn_2", "textColor", 0x79B273)
                    ]),
                    new egret.gui.State("down", [
                        new egret.gui.SetProperty("btn_0", "skinName", new egret.gui.ButtonSkin("", "button_down_png")),
                        new egret.gui.SetProperty("btn_1", "skinName", new egret.gui.ButtonSkin("", "button_down_png")),
                        new egret.gui.SetProperty("btn_2", "skinName", new egret.gui.ButtonSkin("", "button_down_png"))
                    ])
                ];
            }
            Object.defineProperty(PuzzleSkin.prototype, "skinParts", {
                get: function () {
                    return PuzzleSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            PuzzleSkin.prototype.__5_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["bottom", "left", "right", "source", "top"], [-4, -2, -2, "panel_headeback_png", -2]);
                return t;
            };
            PuzzleSkin.prototype.btn_0_i = function () {
                var t = new egret.gui.Button();
                this.btn_0 = t;
                this.__s(t, ["enabled", "label", "name", "verticalCenter", "width", "x"], [true, "3 x 3", "btn_0", 2, 112, 21]);
                return t;
            };
            PuzzleSkin.prototype.btn_1_i = function () {
                var t = new egret.gui.Button();
                this.btn_1 = t;
                this.__s(t, ["enabled", "horizontalCenter", "label", "name", "verticalCenter", "width"], [true, 0, "4 x 4", "btn_1", 0, 112]);
                return t;
            };
            PuzzleSkin.prototype.btn_2_i = function () {
                var t = new egret.gui.Button();
                this.btn_2 = t;
                this.__s(t, ["enabled", "label", "name", "verticalCenter", "width", "x"], [true, "5 x 5", "btn_2", 0, 112, 336]);
                return t;
            };
            PuzzleSkin.prototype.contentGroup_i = function () {
                var t = new egret.gui.Group();
                this.contentGroup = t;
                this.__s(t, ["bottom", "clipAndEnableScrolling", "top", "percentWidth"], [0, true, 50, 100]);
                t.elementsContent = [this.btn_0_i(), this.btn_1_i(), this.btn_2_i()];
                return t;
            };
            PuzzleSkin.prototype.moveArea_i = function () {
                var t = new egret.gui.Group();
                this.moveArea = t;
                this.__s(t, ["height", "left", "right"], [50, 0, 0]);
                t.elementsContent = [this.__5_i(), this.titleDisplay_i()];
                return t;
            };
            PuzzleSkin.prototype.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["bottom", "left", "right", "source", "top"], [-10, -4, -10, "panel_back_png", -4]);
                return t;
            };
            PuzzleSkin.prototype.titleDisplay_i = function () {
                var t = new egret.gui.Label();
                this.titleDisplay = t;
                this.__s(t, ["fontFamily", "left", "maxDisplayedLines", "minHeight", "right", "size", "textAlign", "textColor", "verticalAlign", "verticalCenter"], ["Tahoma", 5, 1, 28, 5, 26, "center", 0x727070, "middle", 0]);
                return t;
            };
            PuzzleSkin._skinParts = ["titleDisplay", "moveArea", "btn_0", "btn_1", "btn_2", "contentGroup"];
            return PuzzleSkin;
        })(egret.gui.Skin);
        simple.PuzzleSkin = PuzzleSkin;
        PuzzleSkin.prototype.__class__ = "skins.simple.PuzzleSkin";
    })(simple = skins.simple || (skins.simple = {}));
})(skins || (skins = {}));
