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
var LoadingBarUI = (function (_super) {
    __extends(LoadingBarUI, _super);
    function LoadingBarUI() {
        _super.call(this);
    }
    LoadingBarUI.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //var tf:egret.TextField = new egret.TextField();
        this.pBar = new egret.gui.ProgressBar();
        this.pBar.hostComponentKey = "HProgressBar";
        this.pBar.y = 20;
        this.pBar.width = 200;
        this.pBar.height = 40;
        this.pBar.value = 0; //取值范围是0-100
        this.addElement(this.pBar);
        //用timer来模拟一下加载进度吧
        var timer = new egret.Timer(100, 100);
        timer.addEventListener(egret.TimerEvent.TIMER, this.timerHandler, this);
        timer.start();
    };
    LoadingBarUI.prototype.timerHandler = function (evt) {
        this.pBar.value += 1;
    };
    return LoadingBarUI;
})(egret.gui.Group);
LoadingBarUI.prototype.__class__ = "LoadingBarUI";
