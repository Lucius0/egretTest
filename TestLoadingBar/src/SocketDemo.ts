class SocketDemo
{
    private webSocket:egret.WebSocket;

    public constructor()
    {
        this.createGameScene();
    }

    private createGameScene():void
    {
        this.webSocket = new egret.WebSocket();

        this.webSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
        this.webSocket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);

        this.webSocket.connect("echo.websocket.org", 80);

    }

    private onSocketOpen():void
    {
        var cmd:string = "Hello Egret";
        console.log("连接..." + cmd);
        this.webSocket.writeUTF(cmd);
    }

    private onReceiveMessage(e:egret.Event):void
    {
        var msg:string = this.webSocket.readUTF();
        console.log(msg);

    }
}