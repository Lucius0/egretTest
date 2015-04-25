/**
 * Created by L on 2015-04-25.
 */
var hitCheck;
(function (hitCheck) {
    var QuadTree = (function () {
        function QuadTree(level, bounds, parent, index) {
            if (parent === void 0) { parent = null; }
            if (index === void 0) { index = -1; }
            /** 每个节点能容纳的最多对象 超过 则分割4个节点,我们并不是事先就分好格子， 而是在插入对象的时候才进行划分*/
            this.MAX_OBJECTS = 10;
            /** 四叉树的最大层数 超过 不再划分,从根节点开始 最多6 层*/
            this.MAX_LEVELS = 5;
            /** 上下左右象限*/
            this.topQuadrant = false;
            this.bottomQuadrant = false;
            this.leftQuadrant = false;
            this.rightQuadrant = false;
            this.level = level;
            this.bounds = bounds;
            this.parent = parent;
            this.index = index;
            this.xMidPoint = bounds.x + bounds.width / 2; //这里事先计算
            this.yMidPoint = bounds.y + bounds.height / 2;
            this.objects = [];
            this.nodes = new Array(4);
        }
        var __egretProto__ = QuadTree.prototype;
        __egretProto__.setQuadrant = function () {
            if (parent) {
                if (this.index == 0) {
                    this.topQuadrant = true;
                    this.rightQuadrant = true;
                }
                else if (this.index == 1) {
                    this.topQuadrant = true;
                    this.leftQuadrant = true;
                }
                else if (this.index == 2) {
                    this.bottomQuadrant = true;
                    this.leftQuadrant = true;
                }
                else if (this.index == 3) {
                    this.bottomQuadrant = true;
                    this.rightQuadrant = true;
                }
            }
        };
        __egretProto__.clear = function () {
            this.objects = [];
            var len = this.nodes.length;
            for (var i = 0; i < len; i++) {
                if (this.nodes[i] != null) {
                    this.nodes[i].clear();
                    this.nodes[i] = null;
                }
            }
        };
        /**
         * 4象限如此划分 逆时针
         * 1 0
         * 2 3
         */
        __egretProto__.split = function () {
            var subWidth = this.bounds.width / 2;
            var subHeight = this.bounds.height / 2;
            var x = this.bounds.x;
            var y = this.bounds.y;
            this.nodes[0] = new QuadTree(this.level + 1, new hitCheck.Rect(x + subWidth, y, subWidth, subHeight), this, 0);
            this.nodes[1] = new QuadTree(this.level + 1, new hitCheck.Rect(x, y, subWidth, subHeight), this, 1);
            this.nodes[2] = new QuadTree(this.level + 1, new hitCheck.Rect(x, y + subHeight, subWidth, subHeight), this, 2);
            this.nodes[3] = new QuadTree(this.level + 1, new hitCheck.Rect(x + subWidth, y + subHeight, subWidth, subHeight), this, 3);
        };
        /**
         * 这个方法 是返回你所要碰撞检测的矩形 在哪块区域(当前节点)。
         * 比如当前区域是Rectange(0, 0, 600, 600) 待检测矩形是Rectangel(0, 0, 30, 30)
         * 那么他就在左上象限 index = 1 如果是Rectange(400, 400, 30, 30) 那么他就在右下象限 index = 3
         * 请注意， 当对象刚好在 区域的中心线上的时候， 也会返回-1。
         * @param rect
         * @returns {number}
         */
        __egretProto__.getIndex = function (rect) {
            //请不要尝试用rect.bottom代替rect.y +  rect.height 经测试 rect.bottom更慢
            rect.topQuadrant = rect.y < this.yMidPoint && rect.y + rect.height < this.yMidPoint;
            rect.bottomQuadrant = rect.y > this.yMidPoint;
            rect.leftQuadrant = this.xMidPoint && rect.x + rect.width < this.xMidPoint;
            rect.rightQuadrant = rect.x > this.xMidPoint;
            rect.centerQuadrant = !rect.topQuadrant && !rect.bottomQuadrant && !rect.rightQuadrant && !rect.leftQuadrant;
            var index = -1;
            if (rect.leftQuadrant) {
                if (rect.topQuadrant) {
                    index = 1;
                }
                else if (rect.bottomQuadrant)
                    index = 2;
            }
            else if (rect.rightQuadrant) {
                if (rect.topQuadrant) {
                    index = 0;
                }
                else if (rect.bottomQuadrant)
                    index = 3;
            }
            return index; //等于-1 是矩形刚好 移动到 中心线的边上 不在四块子区域内部
        };
        /**
         * 每次插入一个对象 我们都先看看当前节点有没有子节点 如果有 我们就插入子节点。
         * 一直检测到他没有子节点为止 我们点就把对象插入到这个节.
         * 如果这个节点的对象数量 > 10个 并且当前节点的层数 < MAX_LEVELS 我们就把节点继续划分4个子节点。
         * 然后把当前对象循环 删除 并插入子节点。如果对象在中心线上，getIndex会返回-1，
         * 所以这些对象会被插入到父节点上面。
         * @param rect
         */
        __egretProto__.insert = function (rect) {
            if (this.nodes[0] != null) {
                var index = this.getIndex(rect);
                if (index != -1) {
                    this.nodes[index].insert(rect);
                    return;
                }
            }
            this.objects.push(rect);
            rect.parent = this;
            if (this.objects.length > this.MAX_OBJECTS && this.level < this.MAX_LEVELS) {
                if (this.nodes[0] == null)
                    this.split();
                var i = 0;
                while (i < this.objects.length) {
                    index = this.getIndex(this.objects[i]);
                    if (index != -1) {
                        this.nodes[index].insert(this.objects.splice(i, 1)[0]);
                    }
                    else {
                        i++;
                    }
                }
            }
        };
        /**
         * 输入一个你要检测的对象，返回你需要检测的对象列表
         * 就是从根节点开始 一直递归找到对象所在的节点 然后把节点里的对象全push进去
         * 再把它的父节点的对象push进去 一直到根节点为止。
         * @param returnObjects
         * @param rect
         */
        __egretProto__.retrive = function (returnObjects, rect) {
            //			var max:int = 2;//最多只用获取几层
            //			if(rect.parent.parent)
            //			{
            //				var pLeftQuad:Boolean = rect.parent.leftQuadrant;
            //				var pTopQuad:Boolean = rect.parent.topQuadrant;
            //				var ppLeftQuad:Boolean = rect.parent.parent.leftQuadrant;
            //				var ppTopQuad:Boolean = rect.parent.parent.topQuadrant;
            //				if(!(pLeftQuad == ppLeftQuad && pTopQuad == ppTopQuad))
            //				{
            //					max = 3;
            //				}
            //			}
            var q = rect.parent;
            while (q) {
                returnObjects.push(q.objects);
                q = q.parent;
            }
        };
        /**
         * 首先 getIndex会返回节点的位置 0,1,2,3 用二进制则是 00 01 10 11
         * 从根节点开始 其次 根节点的子节点 一直到 rect所处的节点 也就是getIndex返回-1的时候
         * 每次返回的结果都<<2 加上上次保存的 那么就可以得到它所在的节点
         * 比如 10, 00 , 11 保存后则是 100011 如果上次的节点位置 和此次计算不同 则说明需要重新插入节点
         *
         */
        __egretProto__.calIndex = function (rect) {
            var index = this.getIndex(rect);
            if (index != -1 && this.nodes[0] != null) {
                rect.level++;
                rect.nowIndex = (rect.nowIndex << 2) + index;
                this.nodes[index].calIndex(rect);
                return;
            }
            if (rect.nowIndex != rect.lastIndex) {
                this.modifyIndex(rect);
            }
            rect.lastIndex = rect.nowIndex;
        };
        __egretProto__.modifyIndex = function (rect) {
            var index = rect.parent.objects.indexOf(rect);
            if (index != -1) {
                rect.parent.objects.splice(index, 1);
                this.insert(rect);
            }
        };
        __egretProto__.newInsert = function (rect) {
            if (this.nodes[0] != null) {
                var index = rect.nowIndex >> (rect.level - 1) * 2 & 3;
                rect.level--;
                if (rect.level > -1) {
                    this.nodes[index].newInsert(rect);
                    return;
                }
            }
            this.objects.push(rect);
            rect.parent = this;
            if (this.objects.length > this.MAX_OBJECTS && this.level < this.MAX_LEVELS) {
                if (this.nodes[0] == null)
                    this.split();
                var i = 0;
                while (i < this.objects.length) {
                    index = this.getIndex(this.objects[i]);
                    if (index != -1) {
                        this.nodes[index].insert(this.objects.splice(i, 1)[0]);
                    }
                    else
                        i++;
                }
            }
        };
        return QuadTree;
    })();
    hitCheck.QuadTree = QuadTree;
    QuadTree.prototype.__class__ = "hitCheck.QuadTree";
})(hitCheck || (hitCheck = {}));
