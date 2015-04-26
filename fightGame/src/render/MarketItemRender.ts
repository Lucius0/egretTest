/**
 * Created by L on 2015-04-26.
 */
class MarketItemRender extends egret.gui.ItemRenderer
{
    public moneyLabel:egret.gui.Label;
    public diamondLabel:egret.gui.Label;
    public buyMoneyBtn:egret.gui.Button;
    public buyDiamondBtn:egret.gui.Button;

    public constructor()
    {
        super();
        this.touchChildren = true;
    }

    public dataChanged():void
    {
        this.moneyLabel.text = this.data.mLabel;
        this.diamondLabel.text = this.data.dLabel;
        this.buyDiamondBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buyDiamond, this);
        this.buyMoneyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buyMoney, this);
    }

    private buyDiamond(e:egret.TouchEvent):void
    {
        console.log("1");
    }

    private buyMoney(e:egret.TouchEvent):void
    {
        console.log("2");
    }
}