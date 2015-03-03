var SocketDemo = (function () {
    function SocketDemo() {
        this.createGameScene();
    }
    SocketDemo.prototype.createGameScene = function () {
        this.webSocket = new egret.WebSocket();
        this.webSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
        this.webSocket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
        this.webSocket.connect("echo.websocket.org", 80);
    };
    SocketDemo.prototype.onSocketOpen = function () {
        var cmd = "Hello Egret";
        console.log("连接..." + cmd);
        this.webSocket.writeUTF(cmd);
    };
    SocketDemo.prototype.onReceiveMessage = function (e) {
        var msg = this.webSocket.readUTF();
        console.log(msg);
    };
    return SocketDemo;
})();
SocketDemo.prototype.__class__ = "SocketDemo";
