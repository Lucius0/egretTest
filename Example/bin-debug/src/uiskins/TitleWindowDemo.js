/**
 * Created by lucius on 2015/3/1.
 */
var uiskins;
(function (uiskins) {
    var TitleWindowDemo = (function (_super) {
        __extends(TitleWindowDemo, _super);
        function TitleWindowDemo() {
            _super.call(this);
        }
        var __egretProto__ = TitleWindowDemo.prototype;
        __egretProto__.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.win = new egret.gui.TitleWindow();
            this.win.skinName = "skins.simple.TitleWindowDemoSkin";
            this.win.showCloseButton = true;
            this.win.title = "Hello Window";
            this.win.width = 400;
            var btn = new egret.gui.Button();
            btn.label = "Touch Me";
            btn.horizontalCenter = btn.verticalCenter = 0;
            btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnTouchHandler, this);
            this.win.addElement(btn);
            this.win.addEventListener(egret.gui.CloseEvent.CLOSE, this.closeWindHandler, this);
            egret.gui.PopUpManager.addPopUp(this.win, true, true);
        };
        __egretProto__.btnTouchHandler = function (e) {
            egret.gui.PopUpManager.removePopUp(this.win);
        };
        __egretProto__.closeWindHandler = function (e) {
            egret.gui.PopUpManager.removePopUp(this.win);
        };
        return TitleWindowDemo;
    })(egret.gui.Group);
    uiskins.TitleWindowDemo = TitleWindowDemo;
    TitleWindowDemo.prototype.__class__ = "uiskins.TitleWindowDemo";
})(uiskins || (uiskins = {}));
