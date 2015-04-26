var skins;
(function (skins) {
    var game;
    (function (game) {
        var addBtnSkin = (function (_super) {
            __extends(addBtnSkin, _super);
            function addBtnSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [30, 30]);
                this.elementsContent = [this.__4_i()];
                this.states = [
                    new egret.gui.State("up", []),
                    new egret.gui.State("down", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = addBtnSkin.prototype;
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["add_png", 0, 0]);
                return t;
            };
            return addBtnSkin;
        })(egret.gui.Skin);
        game.addBtnSkin = addBtnSkin;
        addBtnSkin.prototype.__class__ = "skins.game.addBtnSkin";
    })(game = skins.game || (skins.game = {}));
})(skins || (skins = {}));
