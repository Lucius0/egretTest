var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var NetDemo = (function (_super) {
    __extends(NetDemo, _super);
    function NetDemo() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    NetDemo.prototype.onAddToStage = function (event) {
        this.urlloader = new egret.URLLoader();
        this.urlloader.dataFormat = egret.URLLoaderDataFormat.VARIABLES;
        this.urlloader.addEventListener(egret.Event.COMPLETE, this.onComplete, this);
        var urlReq = new egret.URLRequest();
        urlReq.url = "http://httpbin.org/post";
        urlReq.method = egret.URLRequestMethod.POST;
        urlReq.data = new egret.URLVariables("test=ok");
        this.urlloader.load(urlReq);
    };
    NetDemo.prototype.onComplete = function (event) {
        var loader = event.target;
        var data = loader.data;
        console.log(data.toString());
        console.log("test---------------------");
    };
    return NetDemo;
})(egret.DisplayObjectContainer);
NetDemo.prototype.__class__ = "NetDemo";
