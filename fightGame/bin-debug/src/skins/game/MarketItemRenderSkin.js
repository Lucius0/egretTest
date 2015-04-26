var skins;
(function (skins) {
    var game;
    (function (game) {
        var MarketItemRenderSkin = (function (_super) {
            __extends(MarketItemRenderSkin, _super);
            function MarketItemRenderSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [48, 320]);
                this.elementsContent = [this.__4_i()];
                this.states = [
                    new egret.gui.State("up", []),
                    new egret.gui.State("down", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = MarketItemRenderSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return MarketItemRenderSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.buyDiamondBtn_i = function () {
                var t = new egret.gui.Button();
                this.buyDiamondBtn = t;
                this.__s(t, ["height", "label", "width", "x", "y"], [40, "按钮", 73, 241, 4]);
                return t;
            };
            __egretProto__.buyMoneyBtn_i = function () {
                var t = new egret.gui.Button();
                this.buyMoneyBtn = t;
                this.__s(t, ["height", "label", "width", "x", "y"], [40, "按钮", 73, 88, 4]);
                return t;
            };
            __egretProto__.diamondLabel_i = function () {
                var t = new egret.gui.Label();
                this.diamondLabel = t;
                this.__s(t, ["size", "text", "textColor", "verticalCenter", "x"], [20, "标签", 0x000000, 0, 174]);
                return t;
            };
            __egretProto__.moneyLabel_i = function () {
                var t = new egret.gui.Label();
                this.moneyLabel = t;
                this.__s(t, ["size", "text", "textColor", "verticalCenter", "width", "x"], [20, "标签", 0x000000, 3, 70, 6]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "width", "x", "y"], [48, 320, 0, 0]);
                t.elementsContent = [this.moneyLabel_i(), this.diamondLabel_i(), this.buyMoneyBtn_i(), this.buyDiamondBtn_i()];
                return t;
            };
            MarketItemRenderSkin._skinParts = ["moneyLabel", "diamondLabel", "buyMoneyBtn", "buyDiamondBtn"];
            return MarketItemRenderSkin;
        })(egret.gui.Skin);
        game.MarketItemRenderSkin = MarketItemRenderSkin;
        MarketItemRenderSkin.prototype.__class__ = "skins.game.MarketItemRenderSkin";
    })(game = skins.game || (skins.game = {}));
})(skins || (skins = {}));
