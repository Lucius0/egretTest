var skins;
(function (skins) {
    var simple;
    (function (simple) {
        var ToggleRendererSkin = (function (_super) {
            __extends(ToggleRendererSkin, _super);
            function ToggleRendererSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.height = 80;
                this.elementsContent = [this.__4_i(), this.labelDisplay_i(), this.toggleButton_i()];
                this.states = [
                    new egret.gui.State("up", [
                        new egret.gui.SetProperty("__4", "source", "button_normal_png")
                    ]),
                    new egret.gui.State("down", [
                        new egret.gui.SetProperty("__4", "source", "button_down_png"),
                        new egret.gui.SetProperty("labelDisplay", "textColor", 0xffffff)
                    ]),
                    new egret.gui.State("disabled", [
                        new egret.gui.SetProperty("__4", "source", "button_disabled_png"),
                        new egret.gui.SetProperty("labelDisplay", "textColor", 0xcccccc)
                    ])
                ];
            }
            var __egretProto__ = ToggleRendererSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return ToggleRendererSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.labelDisplay_i = function () {
                var t = new egret.gui.Label();
                this.labelDisplay = t;
                this.__s(t, ["fontFamily", "percentHeight", "paddingLeft", "size", "textAlign", "textColor", "verticalAlign", "percentWidth"], ["Tahoma", 100, 20, 24, "left", 0x111111, "middle", 100]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__4 = t;
                this.__s(t, ["percentHeight", "percentWidth"], [100, 100]);
                return t;
            };
            __egretProto__.toggleButton_i = function () {
                var t = new egret.gui.ToggleButton();
                this.toggleButton = t;
                this.__s(t, ["hostComponentKey", "right", "verticalCenter"], ["ToggleOnOffButton", 30, 0]);
                return t;
            };
            ToggleRendererSkin._skinParts = ["labelDisplay", "toggleButton"];
            return ToggleRendererSkin;
        })(egret.gui.Skin);
        simple.ToggleRendererSkin = ToggleRendererSkin;
        ToggleRendererSkin.prototype.__class__ = "skins.simple.ToggleRendererSkin";
    })(simple = skins.simple || (skins.simple = {}));
})(skins || (skins = {}));
