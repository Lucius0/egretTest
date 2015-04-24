/**
 * Created by L on 2015-04-22.
 */
module hitCheck
{
    export class HitCheck
    {
        private d:utils.Dictionary;
        private rootTN:TreeNode;
        private hitV:Array<HitNode>

        public constructor(x:number, y:number, w:number, h:number)
        {
            this.d = new utils.Dictionary();
            this.resize(x, y, w, h);
        }

        public resize(x:number, y:number, w:number, h:number):void
        {
            this.rootTN = new TreeNode(x, y, w, h, 2, 0, this);
        }

        public clear():void
        {
            this.rootTN.clear();
        }

        public checkHit():Array<HitNode>
        {
            if(null == this.hitV)
            {
                this.hitV = new Array<HitNode>();
            }
            else
            {
                this.hitV.splice(0, this.hitV.length);
            }
            this.rootTN.checkHit();
            return this.hitV;
        }

        public addHit(node1:HitNode, node2:HitNode):void
        {
            if(0 > this.hitV.indexOf(node1)){
                this.hitV.push(node1);
            }
            if(0 > this.hitV.indexOf(node2)){
                this.hitV.push(node2);
            }
        }

        public check(x:number, y:number, w:number, h:number, o:Object, isClearOnly:boolean = false):HitNode
        {
            var node:HitNode = this.d.getByKey(o);
            if(null == node)
            {
                node = new HitNode(o);
                this.d.remove(o);
                this.d.add(o, node);
            }
            node.x = x;
            node.y = y;
            node.x2 = x + w;
            node.y2 = y + h;
            node.clear(isClearOnly);
            this.rootTN.check(node.x,node.y,node.x2,node.y2,node);
            return node;
        }
    }
}