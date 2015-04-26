/**
 * Created by L on 2015-04-26.
 */
var MarketPanel = (function (_super) {
    __extends(MarketPanel, _super);
    function MarketPanel() {
        _super.call(this);
        this.dataSource = [];
        this.skinName = skins.game.MarketSkin;
        this.initListData();
    }
    var __egretProto__ = MarketPanel.prototype;
    __egretProto__.initListData = function () {
        for (var i = 1; i < 10; i++) {
            this.dataSource.push({ mLabel: "mLabel:" + i, dLabel: "dLabel" + i });
        }
    };
    __egretProto__.childrenCreated = function () {
        this.list.addEventListener(egret.gui.IndexChangeEvent.CHANGE, this.onListSelectionChange, this);
    };
    __egretProto__.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
        if (instance == this.list) {
            this.list.height = this.stage.stageWidth - 250;
            this.list.itemRendererSkinName = skins.game.MarketItemRenderSkin;
            this.list.itemRenderer = new egret.gui.ClassFactory(MarketItemRender);
            this.list.dataProvider = new egret.gui.ArrayCollection(this.dataSource);
        }
    };
    __egretProto__.onListSelectionChange = function (event) {
        console.log("You have selected " + this.list.selectedItem.label);
    };
    return MarketPanel;
})(egret.gui.SkinnableContainer);
MarketPanel.prototype.__class__ = "MarketPanel";
