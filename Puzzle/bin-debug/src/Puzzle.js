/**
 * Created by lucius on 2015/2/3.
 */
var Puzzle = (function (_super) {
    __extends(Puzzle, _super);
    function Puzzle() {
        _super.call(this);
        this.rowNum = 3;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var __egretProto__ = Puzzle.prototype;
    __egretProto__.onAddToStage = function (event) {
        //注入自定义的素材解析器
        egret.Injector.mapClass("egret.gui.IAssetAdapter", AssetAdapter);
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        egret.gui.Theme.load("resource/theme.thm");
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/puzzle.json", "resource/");
    };
    __egretProto__.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.loadGroup("puzzle");
    };
    __egretProto__.onResourceLoadComplete = function (event) {
        if (event.groupName == "puzzle") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            this.createScene();
        }
    };
    __egretProto__.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " 中有加载失败的项目");
        //忽略加载失败的项目
        this.onResourceLoadComplete(event);
    };
    __egretProto__.createScene = function () {
        this.gameLayer = new egret.DisplayObjectContainer();
        this.addChild(this.gameLayer);
        var bitmap = new egret.Bitmap();
        bitmap.texture = RES.getRes("bgImage");
        this.gameLayer.addChild(bitmap);
        this.gameStage = new egret.Sprite();
        this.addChild(this.gameStage);
        this.totalNum = this.rowNum * this.rowNum;
        this.canvas = new egret.Rectangle(10, 10, 440, 440);
        this.piecesSpace = new egret.Rectangle(10, 450, 440, 200);
        this.sourceName = "map_json.m1";
        this.bmpData = RES.getRes(this.sourceName); //指定spriteSheet的某一个图片，记得对应的"type":"sheet",是sheet，不是json
        this.bmp = new egret.Bitmap();
        this.bmp.texture = this.bmpData;
        this.bmp.x = this.canvas.x;
        this.bmp.y = this.canvas.y;
        this.bmp.visible = true;
        this.gameStage.addChild(this.bmp);
        this.piecesList = [];
        this.startBtn = new egret.gui.Button();
        this.startBtn.y = 700;
        this.startBtn.x = this.stage.width / 2 - 80;
        this.startBtn.label = "Start";
        this.nextBtn = new egret.gui.Button();
        this.nextBtn.y = 700;
        this.nextBtn.x = this.stage.width / 2 - 80;
        this.nextBtn.label = "Next";
        this.nextBtn.visible = false;
        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.onStart, this);
        this.nextBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.onNext, this);
        this.addChild(this.startBtn);
        this.addChild(this.nextBtn);
    };
    __egretProto__.onStart = function (e) {
        console.log(this.rowNum);
        this.totalNum = this.rowNum * this.rowNum;
        this.pWidth = this.canvas.width / this.rowNum;
        this.pHeight = this.canvas.height / this.rowNum;
        this.bmp.visible = false;
        this.nextBtn.visible = false;
        this.startBtn.visible = false;
        this.initPieces();
        this.drawLines();
    };
    __egretProto__.onNext = function (e) {
        this.sourceName = "map_json.m2";
        this.bmpData = RES.getRes(this.sourceName);
        this.bmp.texture = this.bmpData;
        this.bmp.visible = true;
        this.startBtn.visible = true;
        this.nextBtn.visible = false;
        this.rowNum++;
        console.log(this.rowNum);
        this.clearPieces();
    };
    __egretProto__.initPieces = function () {
        this.clearPieces();
        for (var i = 0; i < this.rowNum; i++) {
            for (var j = 0; j < this.rowNum; j++) {
                var piece = new Pieces();
                piece.id = new egret.Point((j * this.pWidth + this.canvas.x), (i * this.pHeight + this.canvas.y));
                console.log(piece.id);
                piece.bmp = piece.getBitmap(this.pWidth * i, this.pHeight * j, this.pWidth, this.pHeight, this.sourceName);
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
    __egretProto__.startDrag = function (e) {
        this.target = (e.currentTarget);
        this.target.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.doDrag, this);
        this.target.addEventListener(egret.TouchEvent.TOUCH_END, this.stopDraging, this);
        this.target.dragale = true;
        this.startPoint = this.target.globalToLocal(e.stageX, e.stageY);
    };
    __egretProto__.doDrag = function (e) {
        if (this.target.dragale) {
            this.gameStage.setChildIndex(this.target, (this.gameStage.numChildren - 1));
            this.target.x = e.stageX - this.startPoint.x;
            this.target.y = e.stageY - this.startPoint.y;
        }
    };
    __egretProto__.stopDraging = function (e) {
        var target = (e.currentTarget);
        for (var i = 0; i < this.piecesList.length; i++) {
            if (Math.abs(target.x - this.piecesList[i].id.x) < (target.width / 3) && Math.abs(target.y - this.piecesList[i].id.y) < (target.height / 3)) {
                target.x = this.piecesList[i].id.x;
                target.y = this.piecesList[i].id.y;
            }
        }
        this.checkOver();
    };
    __egretProto__.drawLines = function () {
        if (this.lineSprite) {
            this.removeChild(this.lineSprite);
        }
        this.lineSprite = new egret.Sprite();
        this.lineSprite.graphics.lineStyle(1, 0x999999, 0.5);
        for (var i = 0; i <= this.rowNum; i++) {
            this.lineSprite.graphics.moveTo(this.canvas.x, (this.canvas.y + this.pHeight * i));
            this.lineSprite.graphics.lineTo((this.canvas.x + this.canvas.width), (this.canvas.y + this.pHeight * i));
            this.lineSprite.graphics.moveTo((this.canvas.x + this.pWidth * i), this.canvas.y);
            this.lineSprite.graphics.lineTo((this.canvas.x + this.pWidth * i), (this.canvas.y + this.canvas.height));
        }
        this.addChild(this.lineSprite);
    };
    __egretProto__.clearPieces = function () {
        for (var i = 0; i < this.piecesList.length; i++)
            this.gameStage.removeChild(this.piecesList[i]);
        this.piecesList = [];
    };
    __egretProto__.checkOver = function () {
        var count = 0;
        for (var i = 0; i < this.piecesList.length; i++) {
            if (this.piecesList[i].x.toFixed(1) == this.piecesList[i].id.y.toFixed(1) && this.piecesList[i].y.toFixed(1) == this.piecesList[i].id.x.toFixed(1)) {
                count++;
            }
        }
        if (count == this.totalNum) {
            console.log("Win");
            this.nextBtn.visible = true;
            for (var j = 0; j < this.piecesList.length; j++) {
                this.piecesList[j].dragale = false; //成功后锁定碎片，无法拖动
            }
        }
    };
    return Puzzle;
})(egret.DisplayObjectContainer);
Puzzle.prototype.__class__ = "Puzzle";
