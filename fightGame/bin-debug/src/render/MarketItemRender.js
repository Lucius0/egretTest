/**
 * Created by L on 2015-04-26.
 */
var MarketItemRender = (function (_super) {
    __extends(MarketItemRender, _super);
    function MarketItemRender() {
        _super.call(this);
        this.touchChildren = true;
    }
    var __egretProto__ = MarketItemRender.prototype;
    __egretProto__.dataChanged = function () {
        this.moneyLabel.text = this.data.mLabel;
        this.diamondLabel.text = this.data.dLabel;
        this.buyDiamondBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buyDiamond, this);
        this.buyMoneyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buyMoney, this);
    };
    __egretProto__.buyDiamond = function (e) {
        console.log("1");
    };
    __egretProto__.buyMoney = function (e) {
        console.log("2");
    };
    return MarketItemRender;
})(egret.gui.ItemRenderer);
MarketItemRender.prototype.__class__ = "MarketItemRender";
