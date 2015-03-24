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
        var TestBtnSkin = (function (_super) {
            __extends(TestBtnSkin, _super);
            function TestBtnSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [300, 400]);
                this.elementsContent = [];
                this.__4_i();
                this.__5_i();
                this.states = [
                    new egret.gui.State("up", [
                        new egret.gui.AddItems("__5", "", "last", "")
                    ]),
                    new egret.gui.State("down", [
                        new egret.gui.AddItems("__4", "", "last", ""),
                        new egret.gui.SetProperty("", "width", 96),
                        new egret.gui.SetProperty("", "height", 92)
                    ]),
                    new egret.gui.State("disabled", [])
                ];
            }
            TestBtnSkin.prototype.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__4 = t;
                this.__s(t, ["source", "x", "y"], ["custom_down", 0, 0]);
                return t;
            };
            TestBtnSkin.prototype.__5_i = function () {
                var t = new egret.gui.UIAsset();
                this.__5 = t;
                this.__s(t, ["source", "x", "y"], ["custom_normal", 0, 0]);
                return t;
            };
            return TestBtnSkin;
        })(egret.gui.Skin);
        simple.TestBtnSkin = TestBtnSkin;
        TestBtnSkin.prototype.__class__ = "skins.simple.TestBtnSkin";
    })(simple = skins.simple || (skins.simple = {}));
})(skins || (skins = {}));
