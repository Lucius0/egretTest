/**
 * Created by L on 2015-04-25.
 */
module hitCheck
{
    export class Rect extends egret.Rectangle
    {
        /** 这是记录移动前处于四叉树哪个节点*/
        public lastIndex:number;
        /** 记录移动后处于四叉树哪个节点*/
        public nowIndex:number;
        /** 他的父节点 记录父节点是为了在删除对象的时候方便操作 不用从根节点遍历*/
        public parent:QuadTree;
        /** 它代表的shape在数组里的index*/
        public index:number;
        /** 如果已经碰撞了 就不用再检测了*/
        public hitted:boolean;

        public level:number;

        /** 上下左右象限 另外还有个什么都不是 刚好处于中心点*/
        public topQuadrant:	boolean = false;
        public bottomQuadrant:boolean = false;
        public leftQuadrant	:boolean = false;
        public rightQuadrant:boolean = false;
        public centerQuadrant:boolean = false;

        public constructor(x:number, y:number, width:number, height:number)
        {
            super(x, y, width, height);
            this.lastIndex = 0;
            this.nowIndex = 0;
        }
    }
}