/**
 * Created by lucius on 2015/2/3.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Puzzle = (function (_super) {
    __extends(Puzzle, _super);
    function Puzzle() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    Puzzle.prototype.onAddToStage = function (event) {
        //注入自定义的素材解析器
        egret.Injector.mapClass("egret.gui.IAssetAdapter", AssetAdapter);
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        egret.gui.Theme.load("resource/theme.thm");
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/puzzle.json", "resource/");
    };
    Puzzle.prototype.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.loadGroup("puzzle");
    };
    Puzzle.prototype.onResourceLoadComplete = function (event) {
        if (event.groupName == "puzzle") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            this.createScene();
        }
    };
    Puzzle.prototype.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " 中有加载失败的项目");
        //忽略加载失败的项目
        this.onResourceLoadComplete(event);
    };
    Puzzle.prototype.createScene = function () {
        this.gameStage = new egret.Sprite();
        this.addChild(this.gameStage);
        this.totalNum = this.rowNum * this.rowNum;
        this.canvas = new egret.Rectangle(0, 0, 440, 440);
        this.piecesSpace = new egret.Rectangle(0, 450, 440, 200);
        this.bmpData = RES.getRes("map_png");
        this.bmp = new egret.Bitmap();
        this.bmp.texture = this.bmpData;
        this.bmp.x = this.canvas.x;
        this.bmp.y = this.canvas.y;
        this.bmp.visible = true;
        this.gameStage.addChild(this.bmp);
        this.piecesList = [];
        this.rowNum = 3;
        this.startBtn = new egret.gui.Button();
        this.startBtn.y = 700;
        this.startBtn.x = this.stage.width / 2 - 80;
        this.startBtn.label = "Start";
        this.backBtn = new egret.gui.Button();
        this.backBtn.y = 700;
        this.backBtn.x = this.stage.width / 2 + 80;
        this.backBtn.label = "Back";
        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.onStart, this);
        this.backBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.onBack, this);
        this.addChild(this.startBtn);
        this.addChild(this.backBtn);
    };
    Puzzle.prototype.onStart = function (e) {
        this.totalNum = this.rowNum * this.rowNum;
        this.pWidth = this.canvas.width / this.rowNum;
        this.pHeight = this.canvas.height / this.rowNum;
        this.bmp.visible = false;
        this.initPieces();
        this.drawLines();
    };
    Puzzle.prototype.onBack = function (e) {
        this.bmp.visible = true;
        this.clearPieces();
    };
    Puzzle.prototype.initPieces = function () {
        this.clearPieces();
        for (var i = 0; i < this.rowNum; i++) {
            for (var j = 0; j < this.rowNum; j++) {
                var piece = new Pieces();
                piece.id = new egret.Point((j * this.pWidth + this.canvas.x), (i * this.pHeight + this.canvas.y));
                piece.bmp = piece.getBitmap(this.pWidth * i, this.pHeight * j, this.pWidth, this.pHeight, "map_png");
                //piece.x = i * this.pWidth;
                //piece.y = j * this.pHeight;
                piece.x = this.piecesSpace.x + (this.piecesSpace.width - piece.width) * Math.random();
                piece.y = this.piecesSpace.y + (this.piecesSpace.height - piece.height) * Math.random();
                this.piecesList.push(piece);
                this.gameStage.addChild(piece);
                piece.touchChildren = piece.touchEnabled = true;
                piece.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.startDrag, this);
            }
        }
    };
    Puzzle.prototype.startDrag = function (e) {
        this.target = (e.currentTarget);
        this.target.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.doDrag, this);
        this.target.addEventListener(egret.TouchEvent.TOUCH_END, this.stopDraging, this);
        this.target.dragale = true;
        this.startPoint = this.target.globalToLocal(e.stageX, e.stageY);
    };
    Puzzle.prototype.doDrag = function (e) {
        if (this.target.dragale) {
            this.gameStage.setChildIndex(this.target, (this.gameStage.numChildren - 1));
            this.target.x = e.stageX - this.startPoint.x;
            this.target.y = e.stageY - this.startPoint.y;
        }
    };
    Puzzle.prototype.stopDraging = function (e) {
    };
    Puzzle.prototype.drawLines = function () {
        if (this.lineSprite) {
            this.removeChild(this.lineSprite);
        }
        this.lineSprite = new egret.Sprite();
        this.lineSprite.graphics.lineStyle(1, 0x999999, 0.5);
        for (var i = 0; i < this.rowNum; i++) {
            this.lineSprite.graphics.moveTo(0, this.bmp.height / 3 * i);
            this.lineSprite.graphics.lineTo(440, this.bmp.height / 3 * i);
            this.lineSprite.graphics.moveTo(this.bmp.width / 3 * i, 0);
            this.lineSprite.graphics.lineTo(this.bmp.width / 3 * i, 440);
        }
        this.addChild(this.lineSprite);
    };
    Puzzle.prototype.clearPieces = function () {
        for (var i = 0; i < this.piecesList.length; i++)
            this.gameStage.removeChild(this.piecesList[i]);
        this.piecesList = [];
    };
    return Puzzle;
})(egret.DisplayObjectContainer);
Puzzle.prototype.__class__ = "Puzzle";
