/**
 * Created by L on 2015-04-26.
 */
var LevelManager = (function (_super) {
    __extends(LevelManager, _super);
    function LevelManager() {
        _super.call(this);
    }
    var __egretProto__ = LevelManager.prototype;
    LevelManager.setup = function (root) {
        this.root = root;
        this.level1 = new egret.gui.Group();
        this.level1.name = "level1";
        this.root.addElement(this.level1);
        this.level2 = new egret.gui.Group();
        this.level2.name = "level2";
        this.root.addElement(this.level2);
        this.level3 = new egret.gui.Group();
        this.level3.name = "level3";
        this.root.addElement(this.level3);
    };
    LevelManager.openTouchEvent = function () {
        this.level1.touchChildren = this.level1.touchEnabled = true;
    };
    LevelManager.closeTouchEvent = function () {
        this.level1.touchChildren = this.level1.touchEnabled = false;
    };
    return LevelManager;
})(egret.DisplayObjectContainer);
LevelManager.prototype.__class__ = "LevelManager";
