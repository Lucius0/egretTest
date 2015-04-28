/**
 * Created by lucius on 2015/4/28.
 */
/**
 * 访问和修改对象的私有属性保护属性
 */
class TestTs3 extends egret.DisplayObjectContainer{

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event){
        this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
        egret.Profiler.getInstance().run();

        var a:Haha = new Haha();
        a.haha();
        //a.xixi();//编译失败...
        a['xixi']();
        a['lala']=function(){
            console.log('这酸爽,简直不敢信!')
        };
        //a.lala();/...
        a['lala']();
    }
}

class Haha {
    public constructor() {}
    public haha(){
        console.log('publichaha');
    }
    private xixi(){
        console.log('privatexixi');
    }
}