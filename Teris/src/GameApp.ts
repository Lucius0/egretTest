/**
 * Created by L on 2015-04-18.
 */
class GameApp extends egret.DisplayObjectContainer
{
    /**
     * 加载进度界面
     * loading process interface
     */
    private loadingView: LoadingUI;

    public constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event)
    {
        //注入自定义的素材解析器
        egret.Injector.mapClass("egret.gui.IAssetAdapter", AssetAdapter);
        //设置加载进度界面
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/teris.json", "resource/");
    }

    private onConfigComplete(event:RES.ResourceEvent):void
    {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("teris");
    }

    private onResourceProgress(event: RES.ResourceEvent): void
    {
        if (event.groupName == "teris")
        {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    private onResourceLoadComplete(event:RES.ResourceEvent):void
    {
        if (event.groupName == "teris")
        {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.createScene();
        }
    }

    private backLayer:egret.Sprite;
    private graphicsMap:egret.Sprite;
    private nextLayer:egret.Sprite;

    private map:Array<any>;
    private nodeList:Array<any>;
    private bitmapdataList:Array<any>; // 方块数组
    // 得分相关
    private point:number = 0;
    private pointText:egret.TextField;
    // 方块类
    private box:Box;
    // 当前方块的位置
    private pointBox:any = {x:0, y:0};
    // 当前方块，预览方块
    private nowBox:Array<any>;
    private nextBox:Array<any>;
    // 消除层数相关
    private del:number = 0;
    private delText:egret.TextField;
    // 方块下落速度相关
    private speed:number = 15;
    private speedMax:number = 15;
    private speedIndex:number = 0
    private speedText:egret.TextField;
    // 方块的起始位置
    private static START_X1 = 15
    private static START_Y1 = 20;
    private static START_X2 = 228;
    private static START_Y2 = 65;
    //控制相关
    private myKey = {
        keyControl:"",
        step:1,
        stepindex:0,
        isTouchDown:false,
        touchX:0,
        touchY:0,
        touchMove:false
    };
    private imgData:Array<string> = [
        "teris_json.backImage",
        "teris_json.r1",
        "teris_json.r2",
        "teris_json.r3",
        "teris_json.r4"
    ];

    private createScene():void
    {
        this.box = new Box();
        this.map = [
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0]
        ];

        this.backLayer = new egret.Sprite();
        this.backLayer.graphics.beginFill(0x000000);
        this.backLayer.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
        this.backLayer.graphics.endFill();
        this.addChild(this.backLayer);

        this.gameInit();
    }

    private gameInit():void
    {
        var title:egret.TextField = new egret.TextField();
        title.textColor = 0xffffff;
        title.size = 30;
        title.text = "俄罗斯方块";
        title.x = (this.stage.stageWidth - title.width) / 2;
        title.y = 100;
        this.backLayer.addChild(title);

        this.backLayer.graphics.lineStyle(3, 0xffffff)
        this.backLayer.graphics.beginFill(0x000000);
        this.backLayer.graphics.drawRect((this.stage.stageWidth - 80) / 2, 240, 80, 35);
        this.backLayer.graphics.endFill();
        var textClick:egret.TextField = new egret.TextField();
        textClick.size = 18;
        textClick.textColor = 0xffffff;
        textClick.text = "Start";
        textClick.x = (this.stage.stageWidth - textClick.width) / 2;
        textClick.y = 245;
        this.backLayer.addChild(textClick);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gameToStart, this);
    }

    private gameToStart(e:egret.TouchEvent):void
    {
        this.backLayer.graphics.clear();
        this.removeAllChild(this.backLayer);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.gameToStart, this);
        var bmp:egret.Bitmap = new egret.Bitmap();
        bmp.texture = RES.getRes(this.imgData[0]);
        this.backLayer.addChild(bmp);

        this.pointText = new egret.TextField();
        this.pointText.x = 240;
        this.pointText.y = 200;
        this.pointText.size = 20;
        this.backLayer.addChild(this.pointText);

        this.delText = new egret.TextField();
        this.delText.x = 240;
        this.delText.y = 290;
        this.delText.size = 20;
        this.backLayer.addChild(this.delText);

        this.speedText = new egret.TextField();
        this.speedText.x = 240;
        this.speedText.y = 385;
        this.speedText.size = 20;
        this.backLayer.addChild(this.speedText);
        this.showText();

        this.graphicsMap = new egret.Sprite();
        this.backLayer.addChild(this.graphicsMap);
        this.nextLayer = new egret.Sprite();
        this.backLayer.addChild(this.nextLayer);

        this.bitmapdataList = [
            RES.getRes(this.imgData[1]),
            RES.getRes(this.imgData[2]),
            RES.getRes(this.imgData[3]),
            RES.getRes(this.imgData[4]),
        ];

        this.nodeList = [];
        var i,j, nArr, bitmap;
        for(i = 0; i < this.map.length; i++)
        {
            nArr = [];
            for(j = 0; j < this.map[0].length; j++)
            {
                bitmap = new egret.Bitmap();
                bitmap.texture = this.bitmapdataList[0];
                bitmap.x = bitmap.width * j + GameApp.START_X1;
                bitmap.y = bitmap.height * i + GameApp.START_Y1;
                this.graphicsMap.addChild(bitmap);
                nArr[j] = {index : -1, value : 0, bitmap : bitmap};
            }
            this.nodeList[i] = nArr;
        }

        this.getNewBox();

        this.plusBox();

        this.stage.addEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchDown, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.touchUp, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
    }

    private onFrame(e:egret.Event):void
    {
        this.minusBox();
        if(this.myKey.keyControl != "" && this.myKey.stepindex-- < 0)
        {
            this.myKey.stepindex = this.myKey.step;
            switch(this.myKey.keyControl)
            {
                case "left":
                    if(this.checkPlus(-1,0))
                    {
                        this.pointBox.x -= 1;
                        this.myKey.keyControl = "";
                        this.myKey.touchMove = true;
                        this.myKey.touchX = 0;
                    }
                    break;
                case "right":
                    if(this.checkPlus(1,0))
                    {
                        this.pointBox.x += 1;
                        this.myKey.keyControl = "";
                        this.myKey.touchMove = true;
                        this.myKey.touchX = 0;
                    }
                    break;
                case "down":
                    if(this.checkPlus(0,1))
                    {
                        this.pointBox.y += 1;
                        this.myKey.keyControl = "";
                        this.myKey.touchMove = true;
                        this.myKey.touchY = 0;
                    }
                    break;
                case "up":
                    this.changeBox();
                    this.myKey.keyControl = "";
                    this.myKey.stepindex = 0;
                    break;
            }
        }
        if(this.speedIndex++ > this.speed)
        {
            this.speedIndex = 0;
            if (this.checkPlus(0,1))
            {
                this.pointBox.y++;
            }
            else
            {
                this.plusBox();
                if(this.pointBox.y < 0)
                {
                    this.gameOver();
                    return;
                }
                this.removeBox();
                this.getNewBox();
            }
        }
        this.plusBox();
        this.drawMap();
    }

    private touchDown(e:egret.TouchEvent):void
    {
        this.myKey.isTouchDown = true;
        this.myKey.touchX = Math.floor(e.stageX / 20);
        this.myKey.touchY = Math.floor(e.stageY / 20);
        this.myKey.touchMove = false;
        this.myKey.keyControl = "";
    }

    private touchUp(e:egret.TouchEvent):void
    {
        this.myKey.isTouchDown = false;
        if(!this.myKey.touchMove)
        {
            this.myKey.keyControl = "up";
        }
    }

    private touchMove(e:egret.TouchEvent):void
    {
        if(!this.myKey.isTouchDown)
        {
            return;
        }

        var mx = Math.floor(e.stageX / 20);
        if(this.myKey.touchX == 0)
        {
            this.myKey.touchX = mx;
            this.myKey.touchY = Math.floor(e.stageY / 20);
        }

        if(mx > this.myKey.touchX)
        {
            this.myKey.keyControl = "right";
        }
        else if(mx < this.myKey.touchX)
        {
            this.myKey.keyControl = "left";
        }

        if(Math.floor(e.stageY / 20) > this.myKey.touchY)
        {
            this.myKey.keyControl = "down";
        }
    }

    private drawMap():void
    {
        for(var i = 0; i < this.map.length; i++)
        {
            for(var j =0; j < this.map[0].length; j++)
            {
                if(this.nodeList[i][j]["index"] >= 0)
                {
                    this.nodeList[i][j]["bitmap"].texture = this.bitmapdataList[this.nodeList[i][j]["index"]];
                }
                else
                {
                    this.nodeList[i][j]["bitmap"].texture = null;
                }
            }
        }
    }

    private changeBox():void
    {
        var saveBox = this.nowBox;
        this.nowBox = [
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0]
        ];

        for(var i = 0; i < saveBox.length; i++)
        {
            for(var j = 0; j < saveBox[0].length; j++)
            {
                this.nowBox[i][j] = saveBox[3 - j][i];
            }
        }

        if(!this.checkPlus(0,0))
        {
            this.nowBox = saveBox;
        }
    }

    private plusBox():void
    {
        var i,j;
        for(i = 0; i < this.nowBox.length; i++)
        {
            for(j = 0; j< this.nowBox[i].length;j++)
            {
                if(i + this.pointBox.y < 0 || i + this.pointBox.y >= this.map.length || j + this.pointBox.x < 0 || j + this.pointBox.x >= this.map[0].length)
                {
                    continue;
                }
                this.map[i + this.pointBox.y][j + this.pointBox.x] = this.nowBox[i][j] + this.map[i + this.pointBox.y][j + this.pointBox.x];
                this.nodeList[i + this.pointBox.y][j + this.pointBox.x]["index"] = this.map[i + this.pointBox.y][j + this.pointBox.x] - 1;
            }
        }
    }

    private minusBox():void
    {
        var i,j;
        for(i = 0; i < this.nowBox.length; i++)
        {
            for(j = 0; j < this.nowBox[i].length; j++)
            {
                if(i + this.pointBox.y < 0 || i + this.pointBox.y >= this.map.length || j + this.pointBox.x < 0 || j + this.pointBox.x >= this.map[0].length)
                {
                    continue;
                }
                this.map[i + this.pointBox.y][j + this.pointBox.x] = this.map[i + this.pointBox.y][j + this.pointBox.x] - this.nowBox[i][j];
                this.nodeList[i + this.pointBox.y][j + this.pointBox.x]["index"] = this.map[i + this.pointBox.y][j + this.pointBox.x] - 1;
            }
        }
    }

    //消除指定层的方块
    private moveLine(line:number)
    {
        var i, j;
        for(i = line; i > 1; i--)
        {
            for(j = 0; j < this.map[0].length; j++)
            {
                this.map[i][j] = this.map[i-1][j];
                this.nodeList[i][j].index = this.nodeList[i-1][j].index;
            }
        }
        for(j=0; j < this.map[0].length; j++)
        {
            this.map[0][j] = 0;
            this.nodeList[0][j].index = -1;
        }
    }

    private removeBox():void
    {
        var i,j,count = 0;
        for(i = this.pointBox.y; i < (this.pointBox.y + 4); i++)
        {
            if(i < 0 || i >= this.map.length)
            {
                continue;
            }
            for(j = 0; j < this.map[0].length; j++)
            {
                if(this.map[i][j]==0)
                {
                    break;
                }
                if(j == this.map[0].length - 1)
                {
                    this.moveLine(i);
                    count++;
                }
            }
        }
        if(count == 0)
        {
            return;
        }
        this.del += count;
        if(count == 1)
        {
            this.point += 1;
        }
        else if(count == 2)
        {
            this.point += 3;
        }
        else if(count == 3)
        {
            this.point += 6;
        }
        else if(count == 4)
        {
            this.point += 10;
        }
        if(this.speed > 1 && this.del / 100 >= (this.speedMax - this.speed + 1))
        {
            this.speed--;
        }
        this.showText();
    }

    private checkPlus(nx:number, ny:number):Boolean
    {
        var i,j;
        if(this.pointBox.y < 0)
        {
            //防止方块下落之前，就已向左或向右移到屏幕之外
            if(this.pointBox.x + nx < 0 || this.pointBox.x + nx > this.map[0].length - 4)
            {
                return false;
            }
        }
        for(i = 0; i < this.nowBox.length; i++)
        {
            for(j = 0; j < this.nowBox[i].length; j++)
            {
                if(i + this.pointBox.y + ny < 0)
                {
                    continue;
                }
                else if(i + this.pointBox.y + ny >= this.map.length || j + this.pointBox.x + nx < 0 || j + this.pointBox.x + nx >= this.map[0].length)
                {
                    if(this.nowBox[i][j] == 0)
                    {
                        continue;
                    }
                    else
                    {
                        return false;
                    }
                }
                if(this.nowBox[i][j] > 0 && this.map[i + this.pointBox.y + ny][j + this.pointBox.x + nx] > 0)
                {
                    return false;
                }
            }
        }
        return true;
    }

    private getNewBox():void
    {
        if (this.nextBox == null){
            this.nextBox = this.box.getBox();
        }
        this.nowBox = this.nextBox;
        this.pointBox.x = 3;
        this.pointBox.y = -4;
        this.nextBox = this.box.getBox();

        this.removeAllChild(this.nextLayer);
        var i,j,bitmap;
        for(i = 0;i < this.nextBox.length; i++)
        {
            for(j = 0;j < this.nextBox[0].length; j++)
            {
                if(this.nextBox[i][j] == 0)
                {
                    continue;
                }
                bitmap = new egret.Bitmap();
                bitmap.texture = this.bitmapdataList[this.nextBox[i][j] - 1];
                bitmap.x = bitmap.width * j + GameApp.START_X2;
                bitmap.y = bitmap.height * i + GameApp.START_Y2;
                this.nextLayer.addChild(bitmap);
            }
        }
    }

    private showText():void
    {
        this.pointText.text = this.point + "";
        this.delText.text = this.del + "";
        this.speedText.text = this.speedMax - this.speed + 1 + "";
    }

    private gameOver():void
    {
        this.removeAllChild(this.backLayer);
        var txt:egret.TextField = new egret.TextField();
        txt.textColor = 0xff0000;
        txt.size = 40;
        txt.text = "游戏结束";
        txt.x = (this.stage.stageWidth - txt.width) / 2;
        txt.y = (this.stage.stageHeight - txt.height) / 2;
        this.backLayer.addChild(txt);

        this.stage.removeEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchDown, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchUp, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
    }

    private removeAllChild(dis:egret.DisplayObjectContainer):void
    {
        var child:egret.DisplayObjectContainer = null;
        while(dis.numChildren > 0)
        {
            child = <egret.DisplayObjectContainer>dis.removeChildAt(0);
            if((!(child == null)))
            {
                child = null;
            }
        }
    }
}