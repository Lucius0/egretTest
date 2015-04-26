var skins;
(function (skins) {
    var game;
    (function (game) {
        var MarketSkin = (function (_super) {
            __extends(MarketSkin, _super);
            function MarketSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [800, 480]);
                this.elementsContent = [this.list_i(), this.closeBtn_i()];
                this.states = [
                    new egret.gui.State("normal", [
                        new egret.gui.SetProperty("closeBtn", "x", 438),
                        new egret.gui.SetProperty("closeBtn", "y", 127)
                    ]),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = MarketSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return MarketSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.list_i = function () {
                var t = new egret.gui.List();
                this.list = t;
                this.__s(t, ["horizontalCenter", "itemRendererSkinName", "skinName", "y"], [0, skins.simple.ItemRendererSkin, skins.simple.ListSkin, 150]);
                return t;
            };
            __egretProto__.closeBtn_i = function () {
                var t = new egret.gui.UIAsset();
                this.closeBtn = t;
                this.__s(t, ["source", "x", "y"], ["closebtn_down_png", 279, 120]);
                return t;
            };
            MarketSkin._skinParts = ["list", "closeBtn"];
            return MarketSkin;
        })(egret.gui.Skin);
        game.MarketSkin = MarketSkin;
        MarketSkin.prototype.__class__ = "skins.game.MarketSkin";
    })(game = skins.game || (skins.game = {}));
})(skins || (skins = {}));
