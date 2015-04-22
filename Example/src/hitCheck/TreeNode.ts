/**
 * Created by L on 2015-04-22.
 */
module hitCheck
{
    export class TreeNode
    {
        private _q1:TreeNode;
        private _q2:TreeNode;
        private _q3:TreeNode;
        private _q4:TreeNode;
        private _parent:TreeNode;

        private _data:Array<TreeNode>;
        private deep:number;
        private depth:number;
        private static num:number;

        private _key:number;
        private _x:number;
        private _y:number;
        private _w:number;
        private _h:number;

        private zhc:hitCheck.HitCheck;

        private check1x:number;
        private check1y:number;

        public constructor(x:Number,y:Number,w:Number,h:Number,deep:number,depth:number,zhc:hitCheck.HitCheck,parent:TreeNode = null)
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

        private resize(w:number, h:number):void
        {
            this.w = w;
            this.h = h;
            this.createChildren(this.deep);
        }

        private createChildren(deep:number):void
        {
            this.deep = deep;
            if(deep == 0)
            {
                return;
            }

            const hw:number = this.w >> 1;
            const hh:number = this.h >> 1;

            this.q1 = new hitCheck.TreeNode(this.x + hw, this.y, hw, hh, deep - 1, this.depth + 1, this.zhc, this);
            this.q2 = new hitCheck.TreeNode(this.x + hw, this.y + hh, hw, hh, deep - 1, this.depth + 1, this.zhc, this);
            this.q3 = new hitCheck.TreeNode(this.x, this.y + hh, hw, hh, deep - 1, this.depth + 1, this.zhc, this);
            this.q4 = new hitCheck.TreeNode(this.x, this.y, hw, hh, deep - 1, this.depth + 1, this.zhc, this);
            this.check1x = this.q4.x + this.q4.w;
            this.check1y = this.q4.y + this.q4.h;
        }

        public set key(key:number):void
        {
            this._key = key;
        }

        public get key():number
        {
            return this._key;
        }

        public set h(h:number):void
        {
            this._h = h;
        }

        public get h():number
        {
            return this._h;
        }

        public set w(w:number):void
        {
            this._w = w;
        }

        public get w():number
        {
            return this._w;
        }

        public set y(y:number):void
        {
            this._y = y;
        }

        public get y():number
        {
            return this._y;
        }

        public set x(x:number):void
        {
            this._x = x;
        }

        public get x():number
        {
            return this._x;
        }

        public set data(data:Array<TreeNode>):void
        {
            this._data = data;
        }

        public get data():Array<TreeNode>
        {
            return this._data;
        }

        public set parent(parent:TreeNode):void
        {
            this._parent = parent;
        }

        public get parent():TreeNode
        {
            return this._parent;
        }

        public set q1(q1:TreeNode):void
        {
            this._q1 = q1;
        }

        public set q2(q2:TreeNode):void
        {
            this._q2 = q2;
        }

        public set q3(q3:TreeNode):void
        {
            this._q3 = q3;
        }

        public set q4(q4:TreeNode):void
        {
            this._q4 = q4;
        }

        public get q1():TreeNode
        {
            return this._q1;
        }

        public get q2():TreeNode
        {
            return this._q2;
        }

        public get q3():TreeNode
        {
            return this._q3;
        }

        public get q4():TreeNode
        {
            return this._q4;
        }
    }
}