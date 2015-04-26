var skins;
(function (skins) {
    var game;
    (function (game) {
        var MenuSkin = (function (_super) {
            __extends(MenuSkin, _super);
            function MenuSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [800, 480]);
                this.elementsContent = [this.__5_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = MenuSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return MenuSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "width", "x", "y"], [800, 480, 0, 0]);
                t.elementsContent = [this.buyMoneyBtn_i(), this.buyDiamondBtn_i(), this.equipBtn_i(), this.bagBtn_i(), this.strengthenBtn_i(), this.skillBtn_i(), this.chestBtn_i(), this.marketBtn_i(), this.levelTxt_i(), this.moneyTxt_i(), this.diamondTxt_i()];
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "width", "x", "y"], [800, 480, 0, 0]);
                t.elementsContent = [this.__3_i(), this.__4_i()];
                return t;
            };
            __egretProto__.bagBtn_i = function () {
                var t = new egret.gui.Button();
                this.bagBtn = t;
                this.__s(t, ["label", "skinName", "x", "y"], ["背包", skins.game.addBtnSkin, 14, 501]);
                return t;
            };
            __egretProto__.buyDiamondBtn_i = function () {
                var t = new egret.gui.Button();
                this.buyDiamondBtn = t;
                this.__s(t, ["label", "skinName", "x", "y"], ["加钻石", skins.game.addBtnSkin, 14, 217]);
                return t;
            };
            __egretProto__.buyMoneyBtn_i = function () {
                var t = new egret.gui.Button();
                this.buyMoneyBtn = t;
                this.__s(t, ["label", "skinName", "x", "y"], ["加钱", skins.game.addBtnSkin, 13, 19]);
                return t;
            };
            __egretProto__.chestBtn_i = function () {
                var t = new egret.gui.Button();
                this.chestBtn = t;
                this.__s(t, ["label", "skinName", "x", "y"], ["宝箱", skins.game.addBtnSkin, 16, 643]);
                return t;
            };
            __egretProto__.diamondTxt_i = function () {
                var t = new egret.gui.Label();
                this.diamondTxt = t;
                this.__s(t, ["height", "size", "text", "width", "x", "y"], [22, 20, "999999D", 88, 42, 256]);
                return t;
            };
            __egretProto__.equipBtn_i = function () {
                var t = new egret.gui.Button();
                this.equipBtn = t;
                this.__s(t, ["label", "skinName", "x", "y"], ["装备", skins.game.addBtnSkin, 14, 455]);
                return t;
            };
            __egretProto__.levelTxt_i = function () {
                var t = new egret.gui.Label();
                this.levelTxt = t;
                this.__s(t, ["height", "size", "text", "width", "x", "y"], [24, 20, "战力：9999", 110, 76, 20]);
                return t;
            };
            __egretProto__.marketBtn_i = function () {
                var t = new egret.gui.Button();
                this.marketBtn = t;
                this.__s(t, ["label", "skinName", "x", "y"], ["商城", skins.game.addBtnSkin, 17, 689]);
                return t;
            };
            __egretProto__.moneyTxt_i = function () {
                var t = new egret.gui.Label();
                this.moneyTxt = t;
                this.__s(t, ["height", "size", "text", "width", "x", "y"], [24, 20, "999999￥", 86, 42, 59]);
                return t;
            };
            __egretProto__.skillBtn_i = function () {
                var t = new egret.gui.Button();
                this.skillBtn = t;
                this.__s(t, ["label", "skinName", "x", "y"], ["技能", skins.game.addBtnSkin, 15, 597]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["menuBg_png", 0, 0]);
                return t;
            };
            __egretProto__.strengthenBtn_i = function () {
                var t = new egret.gui.Button();
                this.strengthenBtn = t;
                this.__s(t, ["label", "skinName", "x", "y"], ["强化", skins.game.addBtnSkin, 15, 549]);
                return t;
            };
            MenuSkin._skinParts = ["buyMoneyBtn", "buyDiamondBtn", "equipBtn", "bagBtn", "strengthenBtn", "skillBtn", "chestBtn", "marketBtn", "levelTxt", "moneyTxt", "diamondTxt"];
            return MenuSkin;
        })(egret.gui.Skin);
        game.MenuSkin = MenuSkin;
        MenuSkin.prototype.__class__ = "skins.game.MenuSkin";
    })(game = skins.game || (skins.game = {}));
})(skins || (skins = {}));
