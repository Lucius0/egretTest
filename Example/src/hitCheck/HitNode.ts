/**
 * Created by lucius on 2015/4/24.
 */
module hitCheck
{
    export class HitNode
    {
        public x:number;
        public y:number;
        public x2:number;
        public y2:number;
        public tns:Array<TreeNode>;
        private hited:Array<HitNode>;
        public o:Object;
        private static num:number = 0;
        public key:number;

        public constructor(o:Object)
        {
            this.o = o;
            this.key = HitNode.num;
            HitNode.num++;
            this.tns = new Array<TreeNode>();
            this.hited = new Array<HitNode>();
        }

        public addHited(zhn:HitNode):void
        {
            if(0 > this.hited.indexOf(zhn))
            {
                this.hited.push(zhn);
            }
        }

        public clear(isClearOnly:boolean):void
        {
            if(!isClearOnly)
            {
                for(var i:number = this.tns.length-1;i>=0;i--)
                {
                    this.tns[i].remove(this);
                }
            }
            this.tns.splice(0, this.tns.length);
            this.hited.splice(0, this.hited.length);
        }

        public check():void
        {
            for(var i:number = this.tns.length-1;i>=0;i--)
            {
                this.tns[i].checkNode(this);
            }
        }
    }
}