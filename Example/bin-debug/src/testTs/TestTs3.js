/**
 * Created by lucius on 2015/4/28.
 */
/**
 * 访问和修改对象的私有属性保护属性
 */
var TestTs3 = (function (_super) {
    __extends(TestTs3, _super);
    function TestTs3() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var __egretProto__ = TestTs3.prototype;
    __egretProto__.onAddToStage = function (event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        egret.Profiler.getInstance().run();
        var a = new Haha();
        a.haha();
        //a.xixi();//编译失败...
        a['xixi']();
        a['lala'] = function () {
            console.log('这酸爽,简直不敢信!');
        };
        //a.lala();/...
        a['lala']();
    };
    return TestTs3;
})(egret.DisplayObjectContainer);
TestTs3.prototype.__class__ = "TestTs3";
var Haha = (function () {
    function Haha() {
    }
    var __egretProto__ = Haha.prototype;
    __egretProto__.haha = function () {
        console.log('publichaha');
    };
    __egretProto__.xixi = function () {
        console.log('privatexixi');
    };
    return Haha;
})();
Haha.prototype.__class__ = "Haha";
