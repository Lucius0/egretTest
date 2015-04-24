/**
 * Created by L on 2015-04-22.
 */
module hitCheck
{
    export class TreeNode
    {
        public q1:TreeNode;
        public q2:TreeNode;
        public q3:TreeNode;
        public q4:TreeNode;
        private parent:TreeNode;

        public data:Array<HitNode>;
        private deep:number;
        private depth:number;
        private static num:number;

        private key:number;
        private x:number;
        private y:number;
        private w:number;
        private h:number;

        private zhc:HitCheck;

        public constructor(x:number, y:number, w:number, h:number, deep:number, depth:number, zhc:HitCheck, parent:TreeNode = null)
        {
            this.key = TreeNode.num;
            this.zhc = zhc;
            TreeNode.num++;
            this.data = [];
            this.parent = parent;
            this.deep = deep;
            this.depth = depth;
            this.x = x;
            this.y = y;
            this.resize(w, h);
        }

        public clear():void
        {
            if(0 != this.deep)
            {
                this.q1.clear();
                this.q2.clear();
                this.q3.clear();
                this.q4.clear();
            }
            else
            {
                this.data.splice(0, this.data.length);
            }
        }

        public checkHit():void
        {
            if(0 != this.deep)
            {
                this.q1.checkHit();
                this.q2.checkHit();
                this.q3.checkHit();
                this.q4.checkHit();
            }
            else
            {
                this.checkNode();
            }
        }
        private resize(w:number, h:number):void
        {
            this.w = w;
            this.h = h;
            this.createChildren(this.deep);
        }

        private createChildren(deep:number):void
        {
            this.deep = deep;
            if (deep == 0)
            {
                return;
            }

            var hw:number = this.w >> 1;
            var hh:number = this.w >> 1;

            this.q1 = new TreeNode(this.x + hw, this.y, hw, hh, deep - 1,this.depth + 1,this.zhc, this);
            this.q2 = new TreeNode(this.x + hw, this.y + hh, hw, hh,deep - 1, this.depth + 1, this.zhc ,this);
            this.q3 = new TreeNode(this.x, this.y + hh, hw, hh,deep - 1, this.depth + 1,this.zhc, this);
            this.q4 = new TreeNode(this.x, this.y, hw, hh, deep - 1,this.depth + 1,this.zhc, this);
            this.check1x = this.q4.x + this.q4.w;
            this.check1y = this.q4.y + this.q4.h;
        }

        private check1x:number;
        private check1y:number;

        public check(x:number, y:number, x2:number, y2:number, zn:HitNode):void
        {
            if(0 != this.deep)
            {
                if(x > this.check1x)
                {
                    if(y > this.check1y)
                    {
                        this.q2.check(x, y, x2, y2, zn);
                    }
                    else if(y2 > this.check1y)
                    {
                        this.q1.check(x, y, x2, y2, zn);
                        this.q2.check(x, y, x2, y2, zn);
                    }
                    else
                    {
                        this.q1.check(x, y, x2, y2, zn);
                    }
                }
                else if(x2 <= this.check1x)
                {
                    if(y > this.check1y)
                    {
                        this.q3.check(x, y, x2, y2, zn);
                    }
                    else if(y2 > this.check1y)
                    {
                        this.q3.check(x, y, x2, y2, zn);
                        this.q4.check(x, y, x2, y2, zn);
                    }
                    else
                    {
                        this.q4.check(x,y,x2,y2,zn);
                    }
                }
                else
                {
                    this.q1.check(x,y,x2,y2,zn);
                    this.q4.check(x,y,x2,y2,zn);
                    if(y2 > this.check1y)
                    {
                        this.q2.check(x, y, x2, y2, zn);
                        this.q3.check(x, y, x2, y2, zn);
                    }
                }
            }
            else
            {
                this.data.push(zn);
                zn.tns.push(this);
            }
        }
        
        public checkNode(zhn:HitNode = null):void
        {
            var node1:HitNode, node2:HitNode,j:number,isHit:boolean;
            for(var i:number = this.data.length - 1; i > 0 ; i--)
            {
                for(j = i - 1; j >= 0; j--)
                {
                    node1 = this.data[i];
                    node2 = this.data[j];
                    isHit = false;

                    if(node1.x < node2.x)
                    {
                        if(node1.x2 > node2.x)
                        {
                            if(node1.y < node2.y)
                            {
                                if(node1.y2 > node2.y)
                                {
                                    isHit = true;
                                }
                            }
                            else if(node2.y2 > node1.y)
                            {
                                isHit = true;
                            }
                        }
                    }
                    else if(node2.x2>node1.x)
                    {
                        if(node1.y<node2.y)
                        {
                            if(node1.y2 > node2.y)
                            {
                                isHit = true;
                            }
                        }
                        else if(node2.y2 > node1.y)
                        {
                            isHit = true;
                        }
                    }
                    if(isHit)
                    {
                        if(null == zhn)
                        {
                            this.zhc.addHit(node1,node2);
                        }
                    }
                }
            }
        }

        public remove(zn:HitNode):void
        {
            var num:number = this.data.indexOf(zn);
            if(0 <= num)
            {
                this.data.splice(num,1);
            }
        }
    }
}