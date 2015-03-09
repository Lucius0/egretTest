class NetDemo extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private urlloader:egret.URLLoader;
    private onAddToStage(event:egret.Event):void {
        this.urlloader = new egret.URLLoader();
        this.urlloader.dataFormat = egret.URLLoaderDataFormat.VARIABLES;
        this.urlloader.addEventListener(egret.Event.COMPLETE, this.onComplete, this);
        var urlReq:egret.URLRequest = new egret.URLRequest();
        urlReq.url = "http://httpbin.org/post";
        urlReq.method = egret.URLRequestMethod.POST;
        urlReq.data = new egret.URLVariables("test=ok");
        this.urlloader.load(urlReq);
    }

    private onComplete(event:egret.Event):void {
        var loader:egret.URLLoader = <egret.URLLoader>event.target;
        var data:egret.URLVariables = loader.data;
        console.log(data.toString());
        console.log("test---------------------");
    }
}