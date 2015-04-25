/**
 * Created by L on 2015-04-25.
 */
var HitCheckDemo = (function (_super) {
    __extends(HitCheckDemo, _super);
    function HitCheckDemo() {
        _super.call(this);
        this.sprCnt = 100;
        this.stageW = egret.MainContext.instance.stage.stageWidth;
        this.stageH = egret.MainContext.instance.stage.stageHeight;
        this.w = this.stageW;
        this.h = this.stageH;
        egret.Profiler.getInstance().run();
        var sp = new egret.Shape();
        sp.graphics.beginFill(0xEEDFCC);
        sp.graphics.drawRect(0, 0, this.stageW, this.stageH);
        sp.graphics.endFill();
        this.addChild(sp);
        this.init();
        this.addTestBtns();
    }
    var __egretProto__ = HitCheckDemo.prototype;
    __egretProto__.addTestBtns = function () {
        this.txt = new egret.TextField();
        this.addChild(this.txt);
        this.txt.x = 350;
        this.txt.text = "当前对象数量：" + this.sprCnt;
        this.txt.textAlign = "right";
        this.txt.size = 14;
        this.txt.textColor = 0x000000;
        //var guiLayer:egret.gui.UIStage = new egret.gui.UIStage();
        //
        //this.addBtn = new egret.gui.Button();
        //this.addBtn.x = 10;
        //this.addBtn.y = this.stageH - this.addBtn.height - 80;
        //this.addBtn.label = "增加对象数量";
        //guiLayer.addElement(this.addBtn);
        //this.addBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.addSprCnt, this);
        //
        //this.minusBtn = new egret.gui.Button();
        //this.minusBtn.x = this.addBtn.x + 310;
        //this.minusBtn.y = this.stageH - this.minusBtn.height - 80;
        //this.minusBtn.label = "减少对象数量";
        //guiLayer.addElement(this.minusBtn);
        //this.minusBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.minusSprCnt, this);
        //
        //this.addChild(guiLayer);
    };
    //private addSprCnt(e:egret.TouchEvent):void
    //{
    //    this.sprCnt += 100;
    //    this.clear();
    //    this.init();
    //    this.addTestBtns();
    //}
    //private minusSprCnt(e:egret.TouchEvent):void
    //{
    //    if (this.sprCnt >= 100)
    //    {
    //        this.sprCnt -= 100;
    //        this.clear();
    //        this.init();
    //        this.addTestBtns();
    //    }
    //}
    //private clear():void
    //{
    //    this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    //
    //    var len:number = this.sprList.length;
    //    for(var i:number = 0; i<len; i++)
    //    {
    //        var parent:egret.Sprite = <egret.Sprite>this.sprList[i].parent;
    //        if(parent)
    //        {
    //            parent.removeChild(this.sprList[i]);
    //        }
    //    }
    //    this.sprList = null;
    //    this.allObjects = null;
    //    this.speedList = null;
    //    this.quad.clear();
    //    this.quad = null;
    //    this.removeChild(this.txt);
    //    this.removeChild(this.addBtn);
    //    this.removeChild(this.minusBtn);
    //    this.txt = null;
    //    this.addBtn = null;
    //    this.minusBtn = null;
    //}
    __egretProto__.init = function () {
        this.sprList = new Array();
        this.allObjects = new Array();
        this.speedList = new Array();
        this.quad = new hitCheck.QuadTree(0, new hitCheck.Rect(0, 0, this.w, this.h));
        this.quad.clear();
        for (var i = 0; i < this.sprCnt; i++) {
            var s = new egret.Shape();
            s.graphics.beginFill(0xFF0000);
            var speedX = this.mul * (Math.floor(Math.random() * 3) + 1);
            var speedY = this.mul * (Math.floor(Math.random() * 3) + 1);
            this.speedList.push(new egret.Point(speedX, speedY));
            var rect = new hitCheck.Rect(0, 0, 5 + Math.floor(Math.random() * 20), 5 + Math.floor(Math.random() * 20));
            rect.index = i;
            s.graphics.drawRect(rect.x, rect.y, rect.width, rect.height);
            s.graphics.endFill();
            this.sprList.push(s);
            s.x = Math.floor(Math.random() * (this.w - 50));
            s.y = Math.floor(Math.random() * (this.h - 50));
            this.allObjects.push(rect);
            this.allObjects[i].x = s.x;
            this.allObjects[i].y = s.y;
            this.addChild(s);
            this.quad.insert(this.allObjects[i]);
        }
        for (i = 0; i < this.sprCnt; i++) {
            this.allObjects[i].level = 0;
            this.quad.calIndex(this.allObjects[i]);
        }
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    };
    __egretProto__.onEnterFrame = function (e) {
        var object;
        for (var i = 0; i < this.sprCnt; i++) {
            object = this.allObjects[i];
            this.sprList[i].x += this.speedList[i].x;
            this.sprList[i].y += this.speedList[i].y;
            object.x = this.sprList[i].x;
            object.y = this.sprList[i].y;
            if (object.x < 0 || object.x + object.width > this.w) {
                this.speedList[i].x = -this.speedList[i].x;
            }
            if (object.y < 0 || object.y + object.height > this.h) {
                this.speedList[i].y = -this.speedList[i].y;
            }
            object.hitted = false;
            //}
            //for( i = 0; i<this.sprCnt; i++)
            //{
            //    object = this.allObjects[i];
            if (!object.hitted) {
                var returnObjects = [];
                object.nowIndex = 0;
                object.level = 0;
                this.quad.calIndex(object);
                this.quad.retrive(returnObjects, object);
                var len = returnObjects.length;
                this.sprList[i].alpha = 0.3;
                for (var j = 0; j < len; j++) {
                    var arr = returnObjects[j];
                    var arrLen = arr.length;
                    for (var m = 0; m < arrLen; m++) {
                        var rObject = returnObjects[j][m];
                        {
                            if (object == rObject)
                                continue;
                            if (object.intersects(rObject)) {
                                this.sprList[i].alpha = 1;
                                this.allObjects[rObject.index].hitted = true;
                                this.sprList[rObject.index].alpha = 1;
                                break;
                            }
                        }
                    }
                    if (m < arrLen) {
                        break;
                    }
                }
            }
        }
    };
    Object.defineProperty(__egretProto__, "mul", {
        /** 返回 -1 1*/
        get: function () {
            var x = Math.floor(Math.random() * 2);
            if (!x)
                return -1;
            return x;
        },
        enumerable: true,
        configurable: true
    });
    return HitCheckDemo;
})(egret.DisplayObjectContainer);
HitCheckDemo.prototype.__class__ = "HitCheckDemo";
