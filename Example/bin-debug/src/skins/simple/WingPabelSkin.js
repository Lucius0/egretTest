var skins;
(function (skins) {
    var simple;
    (function (simple) {
        var WingPabelSkin = (function (_super) {
            __extends(WingPabelSkin, _super);
            function WingPabelSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [672, 628]);
                this.transitions = [this.__6_i()];
                this.elementsContent = [this.group1_i()];
                this.states = [
                    new egret.gui.State("open", []),
                    new egret.gui.State("close", [])
                ];
            }
            var __egretProto__ = WingPabelSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return WingPabelSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.Move();
                this.__4 = t;
                this.__s(t, ["target", "yFrom"], [this.group1, -672]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Parallel();
                t.children = [this.__4_i()];
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Transition();
                this.__s(t, ["fromState", "toState"], ["close", "open"]);
                t.effect = this.__5_i();
                return t;
            };
            __egretProto__.group1_i = function () {
                var t = new egret.gui.Group();
                this.group1 = t;
                this.__s(t, ["height", "width", "x", "y"], [672, 628, 0, 0]);
                t.elementsContent = [this.__3_i()];
                if (this.__4) {
                    this.__4.target = this.group1;
                }
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["end_background_png", 0, 0]);
                return t;
            };
            WingPabelSkin._skinParts = ["group1"];
            return WingPabelSkin;
        })(egret.gui.Skin);
        simple.WingPabelSkin = WingPabelSkin;
        WingPabelSkin.prototype.__class__ = "skins.simple.WingPabelSkin";
    })(simple = skins.simple || (skins.simple = {}));
})(skins || (skins = {}));
