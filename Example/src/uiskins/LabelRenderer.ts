/**
 * Created by lucius on 2015/2/28.
 */
module uiskins
{
    export class LabelRenderer extends egret.gui.ItemRenderer
    {
        public constructor()
        {
            super();
            this.touchChildren = true;
        }

        public dataChanged():void
        {
            this.labelDisplay.text = this.data.label;
        }
    }
}