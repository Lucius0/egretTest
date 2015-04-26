/**
 * Created by L on 2015-04-26.
 */
class MarketPanel extends egret.gui.SkinnableContainer
{
    public constructor()
    {
        super();

        this.skinName = skins.game.MarketSkin;
        this.initListData();
    }
    public list: egret.gui.List;

    private dataSource: Array<any> = [];
    private initListData():void
    {
        for(var i:number = 1; i < 10; i++)
        {
            this.dataSource.push({mLabel:"mLabel:"+i, dLabel:"dLabel" + i});
        }
    }

    public childrenCreated(){
        this.list.addEventListener(egret.gui.IndexChangeEvent.CHANGE, this.onListSelectionChange, this);
    }

    public partAdded(partName:string,instance:any):void {
        super.partAdded(partName,instance);
        if( instance == this.list )
        {
            this.list.height = this.stage.stageWidth - 250;
            this.list.itemRendererSkinName = skins.game.MarketItemRenderSkin;
            this.list.itemRenderer = new egret.gui.ClassFactory(MarketItemRender);
            this.list.dataProvider = new egret.gui.ArrayCollection(this.dataSource);
        }
    }

    private onListSelectionChange(event:egret.gui.IndexChangeEvent):void{
        console.log("You have selected " + this.list.selectedItem.label);
    }
}