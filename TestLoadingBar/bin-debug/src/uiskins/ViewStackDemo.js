var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by lucius on 2015/3/1.
 */
var uiskins;
(function (uiskins) {
    var ViewStackDemo = (function (_super) {
        __extends(ViewStackDemo, _super);
        function ViewStackDemo() {
            _super.call(this);
        }
        ViewStackDemo.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.viewStack1 = new egret.gui.ViewStack();
            var btn1 = new egret.gui.Button();
            btn1.label = "btn one";
            this.viewStack1.addElement(btn1);
            var btn2 = new egret.gui.Button();
            btn2.label = "btn two";
            this.viewStack1.addElement(btn2);
            this.viewStack1.selectedIndex = 1;
            var timer = new egret.Timer(500);
            timer.addEventListener(egret.TimerEvent.TIMER, this.changeIndexByTimer, this);
            timer.start();
            this.addElement(this.viewStack1);
        };
        ViewStackDemo.prototype.changeIndexByTimer = function (e) {
            this.viewStack1.selectedIndex = this.viewStack1.selectedIndex == 0 ? 1 : 0;
        };
        return ViewStackDemo;
    })(egret.gui.Group);
    uiskins.ViewStackDemo = ViewStackDemo;
    ViewStackDemo.prototype.__class__ = "uiskins.ViewStackDemo";
})(uiskins || (uiskins = {}));
