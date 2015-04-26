/**
 * Created by L on 2015-04-26.
 */
class GameApp extends egret.DisplayObjectContainer
{
    private loadingView: LoadingUI;

    public constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        egret.Injector.mapClass("egret.gui.IAssetAdapter", AssetAdapter);
        egret.gui.Theme.load("resource/theme.thm");
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/fightGame.json", "resource/");
        RES.loadConfig("resource/resource.json", "resource/");
    }

    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("fightGame");
    }

    private onResourceLoadComplete(event: RES.ResourceEvent): void {
        if (event.groupName == "fightGame") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.createScene();
        }
    }

    private onResourceLoadError(event: RES.ResourceEvent): void {
        console.warn("Group:" + event.groupName + " has failed to load");
        this.onResourceLoadComplete(event);
    }

    private onResourceProgress(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    private guiLayer: egret.gui.UIStage;

    private createScene(): void {
        this.guiLayer = new egret.gui.UIStage();
        LevelManager.setup(this.guiLayer);
        this.addChild(this.guiLayer);

        var menuScene:MenuScene = new MenuScene();
        LevelManager.level1.addElement(menuScene);
    }
}