class Example extends egret.DisplayObjectContainer
{
    constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        //注入自定义的素材解析器
        egret.Injector.mapClass("egret.gui.IAssetAdapter", AssetAdapter);
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        egret.gui.Theme.load("resource/theme.thm");
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/resource.json", "resource/");
    }
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     */
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.loadGroup("rollMc");
    }
    /**
     * preload资源组加载完成
     */
    private onResourceLoadComplete(event: RES.ResourceEvent): void {
        if (event.groupName == "rollMc") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            this.createScene();
        }
    }

    private guiLayer:egret.gui.UIStage;

    private createScene():void
    {
        this.guiLayer = new egret.gui.UIStage();
        this.addChild(this.guiLayer);

        //this.createLabel();
        //
        //this.createButton();
        //
        //this.createToggleButton();
        //
        //this.createCheckBox();
        //
        //this.createRadioButton();
        //
        //this.createSlider();
        //
        //this.createProgressBar();
        //
        //this.createAlert();
        //
        //this.createPanel();
        //
        //this.createDataGroup();
        //
        //this.createList();
        //
        //this.createTitleWindow();
        //
        //this.createViewStack();
        //
        //this.createTabWithViewStack();
        //
        //this.createTabWithArrayCollection();
        //
        //this.createRollMc();
        //
        this.createLightLine();
    }

    private createLabel():void
    {
        var label:egret.gui.Label = new egret.gui.Label();
        label.text = "测试文本";
        label.fontFamily = "Tahoma";
        label.size = 35;
        label.textColor = 0xFFFFFF;
        label.bold = true;
        label.italic = true;
        label.textAlign = "center";
        this.guiLayer.addElement(label);
    }

    private createButton():void
    {
        var btn:egret.gui.Button = new egret.gui.Button();
        btn.label = "测试按钮";
        btn.y = 100;
        this.guiLayer.addElement(btn);
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTapHandle, this);
    }

    private touchTapHandle(e:egret.TouchEvent):void
    {
        console.log("touch tap");
    }

    private toggleBtns:egret.gui.ToggleButton[];
    private createToggleButton():void
    {
        this.toggleBtns = [];
        for(var i:number = 0; i < 4; i++)
        {
            var btn:egret.gui.ToggleButton = new egret.gui.ToggleButton();
            btn.label = i + 1 + "";
            btn.y = 200;
            btn.width = 80;
            btn.x = 20 + i * 80;
            btn.addEventListener(egret.Event.CHANGE, this.toggleBtnChange, this);
            this.toggleBtns.push(btn);
            this.guiLayer.addElement(btn);
        }
    }

    private toggleBtnChange(e:egret.Event):void
    {
        for(var i:number = 0; i < this.toggleBtns.length; i++)
        {
            var btn:egret.gui.ToggleButton = this.toggleBtns[i];
            btn.selected = (btn == e.target);
        }
    }

    private createCheckBox():void
    {
        var cbx1:egret.gui.CheckBox = new egret.gui.CheckBox();
        cbx1.addEventListener(egret.Event.CHANGE, this.checkBoxChangeHandld, this);
        cbx1.label = "checkBox1";
        cbx1.y = 300;
        this.guiLayer.addElement(cbx1);

        var cbx2:egret.gui.CheckBox = new egret.gui.CheckBox();
        cbx2.addEventListener(egret.Event.CHANGE, this.checkBoxChangeHandld, this);
        cbx2.label = "checkBox2";
        cbx2.y = 300;
        cbx2.x = cbx1.width + 120;
        this.guiLayer.addElement(cbx2);
    }

    private checkBoxChangeHandld(e:egret.Event):void
    {
        console.log(e.target.selected);
    }

    private createRadioButton():void
    {
        var radioGroup:egret.gui.RadioButtonGroup = new egret.gui.RadioButtonGroup();
        radioGroup.addEventListener(egret.Event.CHANGE, this.radioButtonChangeHandle, this);

        var rdb1:egret.gui.RadioButton = new egret.gui.RadioButton();
        rdb1.label = "radion1";
        rdb1.value = 1;
        rdb1.y = 400;
        rdb1.group = radioGroup;
        this.guiLayer.addElement(rdb1);

        var rdb2:egret.gui.RadioButton = new egret.gui.RadioButton();
        rdb2.label = "radion2";
        rdb2.value = 2;
        rdb2.y = 400;
        rdb2.x = rdb1.width + 120;
        rdb2.selected = true;
        rdb2.group = radioGroup;
        this.guiLayer.addElement(rdb2);
    }

    private radioButtonChangeHandle(e:egret.Event):void
    {
        var radioGroup:egret.gui.RadioButtonGroup = e.target;
        console.log(radioGroup.selectedValue);
    }

    private createSlider():void
    {
        var hSlider:egret.gui.HSlider = new egret.gui.HSlider();
        hSlider.width = 200;
        hSlider.y = 500;
        hSlider.minimum = 0;
        hSlider.maximum = 100;
        hSlider.value = 10;
        hSlider.addEventListener(egret.Event.CHANGE, this.slideChangeHandle, this);
        this.guiLayer.addElement(hSlider);
    }

    private slideChangeHandle(e:egret.Event):void
    {
        console.log(e.target.value);
    }

    private pBar:egret.gui.ProgressBar;
    private createProgressBar():void
    {
        this.pBar = new egret.gui.ProgressBar();
        //this.pBar.hostComponentKey = "HProgressBar";
        this.pBar.y = 600;
        this.pBar.width = 300;
        this.pBar.height = 40;
        this.pBar.minimum = 0;
        this.pBar.maximum = 100;
        this.pBar.value = 0;
        this.pBar.labelFunction = this.barLabelFunction;
        this.guiLayer.addElement(this.pBar);
        var timer:egret.Timer = new egret.Timer(100, 100);
        timer.addEventListener(egret.TimerEvent.TIMER, this.progressBarChange, this);
        timer.start();
    }

    private barLabelFunction(value:number,maximum:number):string
    {
        return "加载中... "+Math.ceil(value/maximum*100)+"%";
    }

    private progressBarChange(e:egret.TimerEvent):void {
        this.pBar.value += 1;
    }

    private createAlert():void
    {
        var btn:egret.gui.Button = new egret.gui.Button();
        btn.label = "测试弹框";
        btn.y = 700;
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTapCreateAlertHandler, this);
        this.guiLayer.addElement(btn);
    }

    private touchTapCreateAlertHandler(e:egret.TouchEvent):void
    {
        //var alert:egret.gui.Alert = new egret.gui.Alert();
        //alert.contentText = "a";
        //alert.title = "title";
        egret.gui.Alert.show("啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊", "Title", this.confirmHandle, "OK", "CANCEL");
    }

    private confirmHandle(e:egret.gui.CloseEvent):void
    {
        if(e.detail == egret.gui.Alert.FIRST_BUTTON)
        {
            console.log("用户点击了OK");
        }
        else
        {
            console.log("用户点击了CANCEL");
        }
    }

    private createPanel():void
    {
        var panel:uidemo.PanelDemo = new uidemo.PanelDemo();
        this.guiLayer.addElement(panel);
    }

    private createDataGroup():void
    {
        var sourceArr:any[] = [];
        for(var i:number = 1; i < 5; i++)
        {
            sourceArr.push({label:"item" + i});
        }

        var myCollection:egret.gui.ArrayCollection = new egret.gui.ArrayCollection(sourceArr);

        var dataGroup:egret.gui.DataGroup = new egret.gui.DataGroup();
        dataGroup.itemRenderer = new egret.gui.ClassFactory(uiskins.LabelRenderer);
        dataGroup.dataProvider = myCollection;
        dataGroup.percentHeight = 100;
        dataGroup.percentWidth = 100;
        this.guiLayer.addElement(dataGroup);
    }

    private createList():void
    {
        var sourceArr:any[] = [];
        for(var i:number = 1; i < 50; i++)
        {
            sourceArr.push({name:"item" + i});
        }

        var myCollection:egret.gui.ArrayCollection = new egret.gui.ArrayCollection(sourceArr);
        var dataList:egret.gui.List = new egret.gui.List();
        dataList.itemRendererSkinName = "skins.simple.ToggleRendererSkin";
        dataList.itemRenderer = new egret.gui.ClassFactory(uiskins.ToggleRenderer);
        dataList.dataProvider = myCollection;
        dataList.percentHeight = 100;
        dataList.percentWidth = 100;
        //dataList.labelField = "name";
        dataList.selectedIndex = 0;
        dataList.addEventListener(egret.gui.ListEvent.ITEM_CLICK, this.listClickhandler, this);
        this.guiLayer.addElement(dataList);
    }

    private listClickhandler(e:egret.gui.ListEvent):void
    {
        console.log(e.item.name+" clicked");
    }

    private createTitleWindow():void
    {
        var tw:uiskins.TitleWindowDemo = new uiskins.TitleWindowDemo();
        this.guiLayer.addElement(tw);
    }

    private createViewStack():void
    {
        var vs:uiskins.ViewStackDemo = new uiskins.ViewStackDemo();
        this.guiLayer.addElement(vs);
    }

    private createTabWithViewStack():void
    {
        var viewStack:egret.gui.ViewStack = new egret.gui.ViewStack();
        for(var i:number = 0; i < 3; i++)
        {
            var group:egret.gui.Group = new egret.gui.Group();
            group.name = "Group_" + i;
            var btn:egret.gui.Button = new egret.gui.Button();
            btn.label = "Button_" + i;
            group.addElement(btn);
            viewStack.addElement(group);
        }

        viewStack.selectedIndex = 0;
        var tabBar:egret.gui.TabBar = new egret.gui.TabBar();
        tabBar.dataProvider = viewStack;

        this.guiLayer.addElement(viewStack);
        this.guiLayer.addElement(tabBar);
    }

    private createTabWithArrayCollection():void
    {
        var tabBar:egret.gui.TabBar = new egret.gui.TabBar();
        tabBar.dataProvider = new egret.gui.ArrayCollection(["tab 1", "tab 2", "tab 3"]);
        tabBar.addEventListener(egret.gui.ListEvent.ITEM_CLICK, this.onBarItemClick, this);

        this.guiLayer.addElement(tabBar);
    }

    private onBarItemClick(event:egret.gui.ListEvent):void
    {
        console.log(event.itemIndex);
    }

    private mc:egret.MovieClip;
    private createRollMc():void
    {
        var data = RES.getRes("rollMc_json");
        var texture = RES.getRes("rollMc_png");
        var mcDataFactory = new egret.MovieClipDataFactory(data, texture);
        this.mc = new egret.MovieClip(mcDataFactory.generateMovieClipData());

        this.mc.gotoAndStop(1);
        this.addChild(this.mc);
        this.mc.touchEnabled = true;
        this.preHeight = this.stage.stageHeight;
        this.curFrame = 1;
        this.mc.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.mc.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    }

    private touchBeginY:number;
    private touchEndY:number;
    private curFrame:number;
    private preHeight:number;

    private onTouchBegin(e:egret.TouchEvent):void
    {
        this.touchBeginY = e.stageY;
    }

    private onTouchEnd(e:egret.TouchEvent):void
    {
        this.touchEndY = e.stageY;

        if(this.touchEndY - this.touchBeginY < 0)
        {
            this.curFrame--;
            if(this.curFrame <= 0)
            {
                this.curFrame = this.mc.totalFrames;
            }
            this.preHeight = -this.stage.stageHeight;
        }
        else
        {
            this.curFrame++;
            if(this.curFrame > this.mc.totalFrames)
            {
                this.curFrame = 1;
            }
            this.preHeight = this.stage.stageHeight;
        }

        egret.Tween.removeTweens(this);

        var tw:egret.Tween = egret.Tween.get(this.mc);
        this.mc.touchEnabled = false;
        tw.to({y:this.preHeight}, 1000);
        tw.call(this.onCall, this);
    }

    private onCall():void
    {
        this.mc.y = -this.preHeight;
        this.mc.gotoAndStop(this.curFrame);
        var tw:egret.Tween = egret.Tween.get(this.mc);
        tw.to({y:0}, 1000);
        this.mc.touchEnabled = true;
    }

    private createLightLine():void
    {
        var light:Light = new Light();
        this.addChild(light);
    }
}