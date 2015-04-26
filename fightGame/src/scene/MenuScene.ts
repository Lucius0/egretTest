/**
 * Created by L on 2015-04-26.
 */
class MenuScene extends egret.gui.SkinnableContainer
{
    private buyMoneyBtn:egret.gui.Button;
    private buyDiamondBtn:egret.gui.Button;
    private equipBtn:egret.gui.Button;
    private bagBtn:egret.gui.Button;
    private strengthenBtn:egret.gui.Button;
    private skillBtn:egret.gui.Button;
    private chestBtn:egret.gui.Button;
    private marketBtn:egret.gui.Button;

    private levelTxt:egret.gui.Label;
    private diamondTxt:egret.gui.Label;
    private moneyTxt:egret.gui.Label;

    public constructor()
    {
        super();
        this.skinName = skins.game.MenuSkin;
    }

    public childrenCreated():void
    {
        this.addEvents();
        this.initView();
    }

    private initView():void
    {
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
    }

    private addEvents():void
    {
        this.buyMoneyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClicked, this);
        this.buyDiamondBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClicked, this);
        this.equipBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClicked, this);
        this.bagBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClicked, this);
        this.strengthenBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClicked, this);
        this.skillBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClicked, this);
        this.chestBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClicked, this);
        this.marketBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClicked, this);
    }

    private btnClicked(e:egret.TouchEvent):void
    {
        var name:string = e.target.name;

        switch (name)
        {
            case "buyMoneyBtn":
            case "buyDiamondBtn":
            case "marketBtn":
                var market:MarketPanel = new MarketPanel();
                market.rotation = 90;
                market.anchorX = market.anchorY = 0.5;
                market.y = (this.stage.stageHeight - market.height) / 2 - 30;
                market.x = (this.stage.stageWidth - market.width) / 2 + 50;
                LevelManager.level2.addElement(market);
                break;
        }
    }
}