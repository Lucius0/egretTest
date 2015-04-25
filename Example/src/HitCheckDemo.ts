/**
 * Created by L on 2015-04-25.
 */
class HitCheckDemo extends egret.DisplayObjectContainer
{
    private w:number;
    private h:number;
    private quad:hitCheck.QuadTree;
    private sprList:Array<egret.Shape>;
    private allObjects:Array<hitCheck.Rect>;
    private sprCnt:number = 100;
    private speedList:Array<egret.Point>;

    //----- 测试按钮 ----//
    private txt:egret.TextField;
    private addBtn:egret.gui.Button;
    private minusBtn:egret.gui.Button;
    //-----end 测试按钮 ----//
    private stageW:number;
    private stageH:number;

    public constructor()
    {
        super();

        this.stageW = egret.MainContext.instance.stage.stageWidth;
        this.stageH = egret.MainContext.instance.stage.stageHeight;
        this.w = this.stageW;
        this.h = this.stageH;

        egret.Profiler.getInstance().run();
        var sp:egret.Shape= new egret.Shape();
        sp.graphics.beginFill(0xEEDFCC);
        sp.graphics.drawRect(0, 0, this.stageW, this.stageH);
        sp.graphics.endFill();
        this.addChild(sp);

        this.init();
        this.addTestBtns();
    }

    private addTestBtns():void
    {
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
    }

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

    private init():void
    {
        this.sprList = new Array<egret.Shape>();
        this.allObjects = new Array<hitCheck.Rect>();
        this.speedList = new Array<egret.Point>();
        this.quad = new hitCheck.QuadTree(0, new hitCheck.Rect(0, 0, this.w, this.h))
        this.quad.clear();
        for(var i:number = 0; i < this.sprCnt; i++)
        {
            var s:egret.Shape = new egret.Shape();
            s.graphics.beginFill(0xFF0000);
            var speedX:number = this.mul * (Math.floor(Math.random()*3) + 1);
            var speedY:number = this.mul * (Math.floor(Math.random()*3) + 1);

            this.speedList.push(new egret.Point(speedX, speedY));
            var rect:hitCheck.Rect = new hitCheck.Rect(0, 0, 5 + Math.floor(Math.random()*20), 5 + Math.floor(Math.random()*20));
            rect.index = i;
            s.graphics.drawRect(rect.x, rect.y, rect.width, rect.height);
            s.graphics.endFill();
            this.sprList.push(s);
            s.x = Math.floor(Math.random() * (this.w-50));
            s.y = Math.floor(Math.random() * (this.h-50));
            this.allObjects.push(rect);
            this.allObjects[i].x = s.x;
            this.allObjects[i].y = s.y;
            this.addChild(s);
            this.quad.insert(this.allObjects[i]);
        }
        for( i = 0; i<this.sprCnt; i++)
        {
            this.allObjects[i].level = 0;
            this.quad.calIndex(this.allObjects[i]);
        }
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    }

    private onEnterFrame(e:egret.Event):void
    {
        var object:hitCheck.Rect;
        for(var i:number = 0; i<this.sprCnt; i++)
        {
            object = this.allObjects[i];
            this.sprList[i].x += this.speedList[i].x;
            this.sprList[i].y += this.speedList[i].y;
            object.x = this.sprList[i].x;
            object.y = this.sprList[i].y;
            if(object.x < 0 || object.x + object.width > this.w)
            {
                this.speedList[i].x = -this.speedList[i].x;
            }
            if(object.y < 0 || object.y + object.height > this.h)
            {
                this.speedList[i].y = - this.speedList[i].y;
            }
            object.hitted = false;
        //}
        //for( i = 0; i<this.sprCnt; i++)
        //{
        //    object = this.allObjects[i];
            if(!object.hitted)
            {
                var returnObjects:Array<any> = [];
                object.nowIndex = 0;
                object.level = 0;
                this.quad.calIndex(object);
                this.quad.retrive(returnObjects, object);
                var len:number = returnObjects.length;
                this.sprList[i].alpha = 0.3;
                for(var j:number = 0; j<len; j++)
                {
                    var arr:Array<any> = returnObjects[j];
                    var arrLen:number = arr.length;
                    for(var m:number = 0; m<arrLen; m++)
                    {
                        var rObject:hitCheck.Rect = returnObjects[j][m];
                        //虽然这里的条件表示有点别扭 但是也想不到更好的表示方法
    						//	if( (j == 0 ) ||
    						//		(j == 1 && (object.parent.leftQuadrant == rObject.leftQuadrant && object.parent.topQuadrant == rObject.topQuadrant) || rObject.centerQuadrant) ||
    						//		(j == 2 && (object.parent.parent.leftQuadrant == rObject.leftQuadrant && object.parent.parent.topQuadrant == rObject.topQuadrant) || rObject.centerQuadrant) )
                        {
                            if(object == rObject)//由于returnObject会连检测对象一起返回 所以必须判断是否是相同对象
                                continue;
                            if(object.intersects(rObject))
                            {
                                this.sprList[i].alpha = 1;
                                this.allObjects[rObject.index].hitted = true;
                                this.sprList[rObject.index].alpha = 1;
                                break;
                            }
                        }
                    }
                    if(m < arrLen)
                    {
                        break;
                    }
                }
            }
        }
    }

    /** 返回 -1 1*/
    private get mul():number
    {
        var x:number = Math.floor(Math.random() * 2);
        if(!x)
            return -1;
        return x;
    }
}