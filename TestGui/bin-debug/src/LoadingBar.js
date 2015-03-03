/**
 * Copyright (c) 2014,Egret-Labs.org
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Egret-Labs.org nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY EGRET-LABS.ORG AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var LoadingBar = (function (_super) {
    __extends(LoadingBar, _super);
    /**
     * 加载进度界面
     */
    function LoadingBar() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    LoadingBar.prototype.onAddToStage = function (event) {
        //注入自定义的素材解析器
        egret.Injector.mapClass("egret.gui.IAssetAdapter", AssetAdapter);
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        egret.gui.Theme.load("resource/theme.thm");
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/resource.json", "resource/");
    };
    LoadingBar.prototype.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        //this.pBar  = new egret.gui.ProgressBar();
        //this.addChild(this.pBar);
        //this.pBar.width = 200;
        //this.pBar.height = 40;
        //this.pBar.value = 0;
        RES.loadGroup("preload");
    };
    /**
     * preload资源组加载完成
     */
    LoadingBar.prototype.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.showView();
        }
    };
    /**
     * preload资源组加载进度
     */
    LoadingBar.prototype.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
        }
    };
    LoadingBar.prototype.showView = function () {
        var tx = new egret.TextField;
        tx.width = 400;
        tx.x = 10;
        tx.y = 10;
        tx.textColor = 0;
        tx.size = 20;
        tx.fontFamily = "微软雅黑";
        tx.textAlign = egret.HorizontalAlign.CENTER;
        tx.textFlow = [
            { text: "妈妈再也不用担心我在", style: { "size": "12" } },
            { text: "Egret", style: { "textColor": 0x336699, "size": "60", "strokeColor": 0x6699cc, "stroke": "2" } },
            { text: "里说一句话不能包含各种", style: { "fontFamily": "楷体" } },
            { text: "五", style: { "textColor": 0xff0000 } },
            { text: "彩", style: { "textColor": 0x00ff00 } },
            { text: "缤", style: { "textColor": 0xf000f0 } },
            { text: "纷", style: { "textColor": 0x00ffff } },
            { text: "、", style: {} },
            { text: "大", style: { "size": "36" } },
            { text: "小", style: { "size": "6" } },
            { text: "不", style: { "size": "16" } },
            { text: "一", style: { "size": "24" } },
            { text: "、", style: {} },
            { text: "格", style: { "italic": "true", "textColor": 0x00ff00 } },
            { text: "式", style: { "size": "16", "textColor": 0xf000f0 } },
            { text: "各", style: { "italic": "true", "textColor": 0xf06f00 } },
            { text: "样", style: { "fontFamily": "楷体" } },
            { text: "", style: {} },
            { text: "的文字了！", style: {} }
        ];
        tx.strokeColor = 0x0000ff;
        tx.stroke = 2;
        super.addChild.call(this, tx);
    };
    return LoadingBar;
})(egret.DisplayObjectContainer);
