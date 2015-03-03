var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by lucius on 2015/1/14.
 */
var GameApp = (function (_super) {
    __extends(GameApp, _super);
    function GameApp() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    GameApp.prototype.onAddToStage = function (event) {
        var uiStage = new egret.gui.UIStage();
        this.addChild(uiStage);
        //创建标题栏背景
        var asset = new egret.gui.UIAsset();
        asset.source = "header-background";
        asset.fillMode = egret.BitmapFillMode.REPEAT;
        asset.percentWidth = 100;
        asset.height = 90;
        uiStage.addElement(asset);
        //创建标题文本
        var title = new egret.gui.Label();
        title.horizontalCenter = 0;
        title.top = 25;
        title.text = "Alert";
        uiStage.addElement(title);
        //创建返回按钮
        var backButton = new egret.gui.Button();
        backButton.top = 16;
        backButton.left = 16;
        backButton.label = "Back";
        uiStage.addElement(backButton);
    };
    return GameApp;
})(egret.DisplayObjectContainer);
GameApp.prototype.__class__ = "GameApp";
