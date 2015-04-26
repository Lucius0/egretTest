/**
 * Created by L on 2015-04-26.
 */
var MenuScene = (function (_super) {
    __extends(MenuScene, _super);
    function MenuScene() {
        _super.call(this);
        this.skinName = skins.game.MenuSkin;
    }
    var __egretProto__ = MenuScene.prototype;
    __egretProto__.childrenCreated = function () {
        this.addEvents();
        this.initView();
    };
    __egretProto__.initView = function () {
        this.levelTxt.rotation = 90;
        this.moneyTxt.rotation = 90;
        this.diamondTxt.rotation = 90;
        this.buyMoneyBtn.name = "buyMoneyBtn";
        this.buyDiamondBtn.name = "buyDiamondBtn";
        this.equipBtn.name = "equipBtn";
        this.bagBtn.name = "bagBtn";
        this.strengthenBtn.name = "strengthenBtn";
        this.skillBtn.name = "skillBtn";
        this.chestBtn.name = "chestBtn";
        this.marketBtn.name = "marketBtn";
    };
    __egretProto__.addEvents = function () {
        this.buyMoneyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClicked, this);
        this.buyDiamondBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClicked, this);
        this.equipBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClicked, this);
        this.bagBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClicked, this);
        this.strengthenBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClicked, this);
        this.skillBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClicked, this);
        this.chestBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClicked, this);
        this.marketBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClicked, this);
    };
    __egretProto__.btnClicked = function (e) {
        var name = e.target.name;
        switch (name) {
            case "buyMoneyBtn":
            case "buyDiamondBtn":
            case "marketBtn":
                var market = new MarketPanel();
                market.rotation = 90;
                market.anchorX = market.anchorY = 0.5;
                market.y = (this.stage.stageHeight - market.height) / 2 - 30;
                market.x = (this.stage.stageWidth - market.width) / 2 + 50;
                LevelManager.level2.addElement(market);
                break;
        }
    };
    return MenuScene;
})(egret.gui.SkinnableContainer);
MenuScene.prototype.__class__ = "MenuScene";
