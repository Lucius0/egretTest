var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by lucius on 2015/2/3.
 */
var uidemo;
(function (uidemo) {
    var PanelDemo = (function (_super) {
        __extends(PanelDemo, _super);
        function PanelDemo() {
            _super.call(this);
        }
        PanelDemo.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.skinName = "skins.simple.PuzzleSkin";
            //this.panel = new egret.gui.Panel();
            //this.panel.skinName = "skins.simple.PuzzleSkin";
            //this.panel.title = "测试拼图";
            //this.panel.x = this.panel.y = 40;
            //this.panel.width = 400;
            //this.panel.height = 300;
            //this.addElement(this.panel);
            //this.panel.validateNow();
        };
        PanelDemo.prototype.childrenCreated = function () {
            for (var i = 0; i < 3; i++) {
                this["btn_" + i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.TouchTapHandler, this);
            }
        };
        PanelDemo.prototype.TouchTapHandler = function (e) {
            var name = e.target.name;
            switch (name) {
                case "btn_0":
                    this.btn_0.label = name + "00000";
                    break;
            }
        };
        return PanelDemo;
    })(egret.gui.Panel);
    uidemo.PanelDemo = PanelDemo;
    PanelDemo.prototype.__class__ = "uidemo.PanelDemo";
})(uidemo || (uidemo = {}));
