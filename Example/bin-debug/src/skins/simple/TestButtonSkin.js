var skins;
(function (skins) {
    var simple;
    (function (simple) {
        var TestButtonSkin = (function (_super) {
            __extends(TestButtonSkin, _super);
            function TestButtonSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [300, 400]);
                this.elementsContent = [];
                this.__4_i();
                this.__5_i();
                this.states = [
                    new egret.gui.State("up", [
                        new egret.gui.AddItems("__5", "", "last", ""),
                        new egret.gui.SetProperty("", "width", 96),
                        new egret.gui.SetProperty("", "height", 92)
                    ]),
                    new egret.gui.State("down", [
                        new egret.gui.AddItems("__4", "", "last", ""),
                        new egret.gui.SetProperty("", "width", 96),
                        new egret.gui.SetProperty("", "height", 92)
                    ]),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = TestButtonSkin.prototype;
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__4 = t;
                this.__s(t, ["source", "x", "y"], ["custom_down", 0, 0]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.UIAsset();
                this.__5 = t;
                this.__s(t, ["source", "x", "y"], ["custom_normal", 0, 0]);
                return t;
            };
            return TestButtonSkin;
        })(egret.gui.Skin);
        simple.TestButtonSkin = TestButtonSkin;
        TestButtonSkin.prototype.__class__ = "skins.simple.TestButtonSkin";
    })(simple = skins.simple || (skins.simple = {}));
})(skins || (skins = {}));
