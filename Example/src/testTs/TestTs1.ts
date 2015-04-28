/**
 * Created by lucius on 2015/4/28.
 */
/**
 * 奇葩得要死，只要类型设置为any，居然可以查看对象的私有属性
 */
class TestTs1 extends egret.DisplayObjectContainer{

    private spoon:any;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
        this.spoon = new Curry();
    }

    private onAddToStage(event:egret.Event){
        this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
        console.log(this.spoon.a);
        console.log(this.spoon.b);
        console.log(this.spoon.c);
    }
}

class Curry {

    private a:string;
    public c:string;

    public constructor() {
        this.a = '一口';
        this['b'] = '两口';
        this.c = '三口'
    }

}