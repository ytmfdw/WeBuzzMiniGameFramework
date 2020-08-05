
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui.dialog_dir {
    export class DialogSettingUI extends Dialog {
		public imgBg:Laya.Image;
		public btnClose:Laya.Image;
		public layoutMusic:Laya.Image;
		public cbMusic:Laya.CheckBox;
		public layoutSound:Laya.Image;
		public cbSound:Laya.CheckBox;
		public layoutVirbrate:Laya.Image;
		public cbVirbrate:Laya.CheckBox;
		public versionLabel:Laya.Label;

        public static  uiView:any ={"type":"Dialog","props":{"width":900,"height":644},"child":[{"type":"Image","props":{"y":322,"x":450,"width":900,"var":"imgBg","skin":"subassets/comp/setting_bg_2.png","height":644,"anchorY":0.5,"anchorX":0.5,"sizeGrid":"20,20,20,20"},"child":[{"type":"Label","props":{"y":70,"x":450,"width":166,"valign":"middle","text":"设  置","skin":"subassets/skins/imgTextSheZhi.png","height":78,"fontSize":60,"color":"#000000","bold":true,"anchorY":0.5,"anchorX":0.5,"align":"center"}},{"type":"Image","props":{"y":59,"x":837,"width":100,"var":"btnClose","skin":"subassets/comp/imgClose.png","height":100,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":180,"x":446,"width":700,"var":"layoutMusic","skin":"subassets/comp/setting_button.png","height":130,"anchorY":0,"anchorX":0.5,"sizeGrid":"0,40,0,40"},"child":[{"type":"Label","props":{"y":60,"x":100,"width":130,"valign":"middle","text":"音  乐","skin":"subassets/skins/imgTextYinYue.png","height":57,"fontSize":50,"color":"#ffffff","anchorY":0.5,"anchorX":0.5,"align":"center"}},{"type":"CheckBox","props":{"x":510,"width":128,"var":"cbMusic","stateNum":2,"skin":"comp/imgCbMusic.png","height":128}}]},{"type":"Image","props":{"y":339,"x":446,"width":700,"var":"layoutSound","skin":"subassets/comp/setting_button.png","height":130,"anchorY":0,"anchorX":0.5,"sizeGrid":"0,40,0,40"},"child":[{"type":"Label","props":{"y":60,"x":100,"width":130,"valign":"middle","text":"音  效","skin":"subassets/skins/imgTextYinXiao.png","height":57,"fontSize":50,"color":"#ffffff","anchorY":0.5,"anchorX":0.5,"align":"center"}},{"type":"CheckBox","props":{"x":510,"width":128,"var":"cbSound","stateNum":2,"skin":"comp/imgCbSound.png","height":128}}]},{"type":"Image","props":{"y":498,"x":446,"width":700,"visible":false,"var":"layoutVirbrate","skin":"subassets/comp/setting_button.png","height":130,"anchorY":0,"anchorX":0.5,"sizeGrid":"0,40,0,40"},"child":[{"type":"Label","props":{"y":60,"x":100,"width":130,"valign":"middle","text":"震  动","skin":"subassets/skins/imgTextZhenDong.png","height":57,"fontSize":50,"color":"#ffffff","anchorY":0.5,"anchorX":0.5,"align":"center"}},{"type":"CheckBox","props":{"y":0,"x":510,"width":128,"var":"cbVirbrate","stateNum":2,"skin":"comp/imgCbVirbate.png","height":128}}]},{"type":"Label","props":{"y":91,"x":29,"width":200,"visible":false,"var":"versionLabel","valign":"middle","text":"版本：v0.0.1","height":40,"fontSize":25,"color":"#212121","align":"left"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.dialog_dir.DialogSettingUI.uiView);

        }

    }
}

module ui.item_dir {
    export class drawerItemUI extends View {
		public scaleAni:Laya.FrameAnimation;
		public drawerItemSprite:Laya.Sprite;
		public itemIcon:Laya.Image;
		public itemText:laya.display.Text;
		public hotDot:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"y":90,"x":70,"width":140,"pivotY":90,"pivotX":70,"height":180},"child":[{"type":"Sprite","props":{"y":100,"x":70,"width":140,"var":"drawerItemSprite","scaleY":1,"scaleX":1,"pivotY":90,"pivotX":70,"height":180},"compId":4,"child":[{"type":"Image","props":{"y":8,"x":8,"width":124,"var":"itemIcon","height":124,"anchorY":0,"anchorX":0}},{"type":"Text","props":{"y":140,"x":0,"width":140,"var":"itemText","valign":"middle","text":"app","height":40,"fontSize":28,"color":"#ffffff","bold":false,"align":"center"}},{"type":"Image","props":{"y":0,"x":0,"width":140,"skin":"comp/purple.png","height":140,"anchorY":0,"anchorX":0}},{"type":"Image","props":{"y":0,"x":120,"width":20,"var":"hotDot","skin":"comp/red_dot.png","height":20}}]}],"animations":[{"nodes":[{"target":4,"keyframes":{"x":[{"value":70,"tweenMethod":"linearNone","tween":true,"target":4,"key":"x","index":0}],"scaleY":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":4,"key":"scaleY","index":0},{"value":0.9,"tweenMethod":"linearNone","tween":true,"target":4,"key":"scaleY","index":7},{"value":1.1,"tweenMethod":"linearNone","tween":true,"target":4,"key":"scaleY","index":20},{"value":1.1,"tweenMethod":"linearNone","tween":true,"target":4,"key":"scaleY","index":23},{"value":1,"tweenMethod":"linearNone","tween":true,"target":4,"key":"scaleY","index":30}],"scaleX":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":4,"key":"scaleX","index":0},{"value":0.9,"tweenMethod":"linearNone","tween":true,"target":4,"key":"scaleX","index":7},{"value":1.1,"tweenMethod":"linearNone","tween":true,"target":4,"key":"scaleX","index":20},{"value":1.1,"tweenMethod":"linearNone","tween":true,"target":4,"key":"scaleX","index":23},{"value":1,"tweenMethod":"linearNone","tween":true,"target":4,"key":"scaleX","index":30}]}}],"name":"scaleAni","id":1,"frameRate":24,"action":0}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.item_dir.drawerItemUI.uiView);

        }

    }
}

module ui.item_dir {
    export class drawerItemBigUI extends View {
		public scaleAni:Laya.FrameAnimation;
		public drawerItemSprite:Laya.Sprite;
		public itemIcon:Laya.Image;
		public itemText:laya.display.Text;
		public hotDot:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"y":150,"x":120,"width":240,"pivotY":150,"pivotX":120,"height":300},"child":[{"type":"Sprite","props":{"y":170,"x":120,"width":240,"var":"drawerItemSprite","scaleY":1,"scaleX":1,"pivotY":150,"pivotX":120,"height":300},"compId":4,"child":[{"type":"Image","props":{"y":0,"x":0,"width":240,"skin":"comp/purple-.png","height":300,"anchorY":0,"anchorX":0}},{"type":"Image","props":{"y":10,"x":15,"width":210,"var":"itemIcon","height":210,"anchorY":0,"anchorX":0}},{"type":"Text","props":{"y":220,"x":0,"width":240,"var":"itemText","valign":"middle","height":60,"fontSize":40,"color":"#000","bold":false,"align":"center"}},{"type":"Image","props":{"y":-2,"x":210,"width":30,"var":"hotDot","skin":"comp/red_dot.png","height":30}}]}],"animations":[{"nodes":[{"target":4,"keyframes":{"x":[{"value":120,"tweenMethod":"linearNone","tween":true,"target":4,"key":"x","index":0}],"scaleY":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":4,"key":"scaleY","index":0},{"value":0.9,"tweenMethod":"linearNone","tween":true,"target":4,"key":"scaleY","index":7},{"value":1.1,"tweenMethod":"linearNone","tween":true,"target":4,"key":"scaleY","index":20},{"value":1.1,"tweenMethod":"linearNone","tween":true,"target":4,"key":"scaleY","index":23},{"value":1,"tweenMethod":"linearNone","tween":true,"target":4,"key":"scaleY","index":30}],"scaleX":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":4,"key":"scaleX","index":0},{"value":0.9,"tweenMethod":"linearNone","tween":true,"target":4,"key":"scaleX","index":7},{"value":1.1,"tweenMethod":"linearNone","tween":true,"target":4,"key":"scaleX","index":20},{"value":1.1,"tweenMethod":"linearNone","tween":true,"target":4,"key":"scaleX","index":23},{"value":1,"tweenMethod":"linearNone","tween":true,"target":4,"key":"scaleX","index":30}]}}],"name":"scaleAni","id":1,"frameRate":24,"action":0}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.item_dir.drawerItemBigUI.uiView);

        }

    }
}

module ui.item_dir {
    export class drawerItemBig2UI extends View {
		public scaleAni:Laya.FrameAnimation;
		public drawerItemSprite:Laya.Sprite;
		public itemIcon:Laya.Image;
		public itemText:laya.display.Text;
		public hotDot:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"y":150,"x":120,"width":240,"pivotY":150,"pivotX":120,"height":300},"child":[{"type":"Sprite","props":{"y":170,"x":120,"width":240,"var":"drawerItemSprite","scaleY":1,"scaleX":1,"pivotY":150,"pivotX":120,"height":300},"compId":4,"child":[{"type":"Image","props":{"y":12,"x":12,"width":216,"var":"itemIcon","height":216,"anchorY":0,"anchorX":0}},{"type":"Text","props":{"y":244,"x":0,"width":240,"var":"itemText","valign":"middle","text":"拯救小姐姐","height":40,"fontSize":36,"color":"#000000","bold":false,"align":"center"}},{"type":"Image","props":{"y":0,"x":0,"width":240,"skin":"comp/purple.png","height":240,"anchorY":0,"anchorX":0}},{"type":"Image","props":{"y":-8,"x":200,"width":40,"visible":false,"var":"hotDot","skin":"comp/red_dot.png","height":40}}]}],"animations":[{"nodes":[{"target":4,"keyframes":{"y":[{"value":170,"tweenMethod":"linearNone","tween":true,"target":4,"key":"y","index":0},{"value":170,"tweenMethod":"linearNone","tween":true,"target":4,"key":"y","index":7}],"x":[{"value":120,"tweenMethod":"linearNone","tween":true,"target":4,"key":"x","index":0},{"value":120,"tweenMethod":"linearNone","tween":true,"target":4,"key":"x","index":7},{"value":120,"tweenMethod":"linearNone","tween":true,"target":4,"key":"x","index":20},{"value":120,"tweenMethod":"linearNone","tween":true,"target":4,"key":"x","index":23}],"scaleY":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":4,"key":"scaleY","index":0},{"value":0.9,"tweenMethod":"linearNone","tween":true,"target":4,"key":"scaleY","index":7},{"value":1.1,"tweenMethod":"linearNone","tween":true,"target":4,"key":"scaleY","index":20},{"value":1.1,"tweenMethod":"linearNone","tween":true,"target":4,"key":"scaleY","index":23},{"value":1,"tweenMethod":"linearNone","tween":true,"target":4,"key":"scaleY","index":30}],"scaleX":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":4,"key":"scaleX","index":0},{"value":0.9,"tweenMethod":"linearNone","tween":true,"target":4,"key":"scaleX","index":7},{"value":1.1,"tweenMethod":"linearNone","tween":true,"target":4,"key":"scaleX","index":20},{"value":1.1,"tweenMethod":"linearNone","tween":true,"target":4,"key":"scaleX","index":23},{"value":1,"tweenMethod":"linearNone","tween":true,"target":4,"key":"scaleX","index":30}]}}],"name":"scaleAni","id":1,"frameRate":24,"action":0}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.item_dir.drawerItemBig2UI.uiView);

        }

    }
}

module ui.item_dir {
    export class NavLoginItemUI extends View {
		public scaleAni:Laya.FrameAnimation;
		public rootLayout:Laya.Sprite;
		public gameIconImage:Laya.Image;
		public borderImg:Laya.Image;
		public gameNameLabel:laya.display.Text;
		public hotImage:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":300,"height":350},"child":[{"type":"Sprite","props":{"y":175,"x":135,"width":300,"var":"rootLayout","scaleY":1,"scaleX":1,"rotation":0,"pivotY":175,"pivotX":135,"height":350},"compId":9,"child":[{"type":"Image","props":{"y":150,"x":150,"width":275,"var":"gameIconImage","height":275,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":0,"x":0,"width":300,"var":"borderImg","skin":"comp/purple.png","height":300}},{"type":"Text","props":{"y":300,"x":0,"width":300,"var":"gameNameLabel","valign":"middle","text":"最强连一连","overflow":"hidden","height":50,"fontSize":36,"font":"SimHei","color":"#000","align":"center"}},{"type":"Image","props":{"y":20,"x":270,"width":40,"var":"hotImage","skin":"comp/red_dot.png","height":40,"anchorY":0.5,"anchorX":0.5}}]}],"animations":[{"nodes":[{"target":9,"keyframes":{"scaleY":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":9,"key":"scaleY","index":0},{"value":0.8,"tweenMethod":"linearNone","tween":true,"target":9,"key":"scaleY","index":20},{"value":1,"tweenMethod":"linearNone","tween":true,"target":9,"key":"scaleY","index":40},{"value":0.8,"tweenMethod":"linearNone","tween":true,"target":9,"key":"scaleY","index":60},{"value":1,"tweenMethod":"linearNone","tween":true,"target":9,"key":"scaleY","index":80}],"scaleX":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":9,"key":"scaleX","index":0},{"value":0.8,"tweenMethod":"linearNone","tween":true,"target":9,"key":"scaleX","index":20},{"value":1,"tweenMethod":"linearNone","tween":true,"target":9,"key":"scaleX","index":40},{"value":0.8,"tweenMethod":"linearNone","tween":true,"target":9,"key":"scaleX","index":60},{"value":1,"tweenMethod":"linearNone","tween":true,"target":9,"key":"scaleX","index":80}],"rotation":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":9,"key":"rotation","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":9,"key":"rotation","index":20},{"value":0,"tweenMethod":"linearNone","tween":true,"target":9,"key":"rotation","index":40},{"value":0,"tweenMethod":"linearNone","tween":true,"target":9,"key":"rotation","index":60},{"value":0,"tweenMethod":"linearNone","tween":true,"target":9,"key":"rotation","index":80}]}}],"name":"scaleAni","id":1,"frameRate":20,"action":0}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.item_dir.NavLoginItemUI.uiView);

        }

    }
}

module ui.item_dir {
    export class NavNextItemUI extends View {
		public gameIconImage:Laya.Image;
		public hotImage:Laya.Image;
		public maskView:Laya.Sprite;
		public gameNameLabel:laya.display.Text;

        public static  uiView:any ={"type":"View","props":{"width":400,"height":500},"child":[{"type":"Image","props":{"y":200,"width":400,"var":"gameIconImage","height":400,"centerX":0,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":30,"x":370,"width":50,"var":"hotImage","skin":"comp/red_dot.png","height":50,"anchorY":0.5,"anchorX":0.5}},{"type":"Sprite","props":{"y":400,"x":0,"width":400,"var":"maskView","height":100},"child":[{"type":"Rect","props":{"y":0,"x":0,"width":400,"lineWidth":1,"height":100,"fillColor":"#aa45c3"}}]},{"type":"Text","props":{"y":400,"x":0,"width":400,"var":"gameNameLabel","valign":"middle","overflow":"hidden","height":100,"fontSize":66,"font":"SimHei","color":"#fff","align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.item_dir.NavNextItemUI.uiView);

        }

    }
}

module ui.item_dir {
    export class NavPopItemUI extends View {
		public itemIcon:Laya.Image;
		public hotDot:Laya.Image;
		public maskView:Laya.Sprite;
		public itemText:laya.display.Text;

        public static  uiView:any ={"type":"View","props":{"width":400,"height":500},"child":[{"type":"Image","props":{"y":200,"width":400,"var":"itemIcon","height":400,"centerX":0,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":30,"x":370,"width":50,"var":"hotDot","skin":"comp/red_dot.png","height":50,"anchorY":0.5,"anchorX":0.5}},{"type":"Sprite","props":{"y":400,"x":0,"width":400,"var":"maskView","height":100},"child":[{"type":"Rect","props":{"y":0,"x":0,"width":400,"lineWidth":1,"height":100,"fillColor":"#8F8FF7"}}]},{"type":"Text","props":{"y":400,"x":0,"width":400,"var":"itemText","valign":"middle","text":"水管大师","overflow":"hidden","height":100,"fontSize":50,"font":"SimHei","color":"#fff","align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.item_dir.NavPopItemUI.uiView);

        }

    }
}

module ui.item_dir {
    export class NavPopItem1UI extends View {
		public itemIcon:Laya.Image;
		public hotDot:Laya.Image;
		public maskView:Laya.Sprite;
		public itemText:laya.display.Text;

        public static  uiView:any ={"type":"View","props":{"width":320,"height":400},"child":[{"type":"Image","props":{"y":160,"width":320,"var":"itemIcon","height":320,"centerX":0,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":15,"x":305,"width":30,"var":"hotDot","skin":"comp/red_dot.png","height":30,"anchorY":0.5,"anchorX":0.5}},{"type":"Sprite","props":{"y":320,"x":0,"width":320,"var":"maskView","height":80},"child":[{"type":"Rect","props":{"y":0,"x":0,"width":320,"lineWidth":1,"height":80,"fillColor":"#8F8FF7"}}]},{"type":"Text","props":{"y":320,"x":0,"width":320,"var":"itemText","valign":"middle","text":"水管大师","overflow":"hidden","height":80,"fontSize":42,"font":"SimHei","color":"#fff","align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.item_dir.NavPopItem1UI.uiView);

        }

    }
}

module ui.item_dir {
    export class NavTopItemUI extends View {
		public itemIcon:Laya.Image;
		public hotDot:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":270,"height":270},"child":[{"type":"Image","props":{"width":260,"var":"itemIcon","height":260,"centerY":0,"centerX":0,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":20,"x":250,"width":30,"var":"hotDot","skin":"comp/red_dot.png","height":30,"anchorY":0.5,"anchorX":0.5}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.item_dir.NavTopItemUI.uiView);

        }

    }
}

module ui.page_dir {
    export class GameInfoUI extends View {
		public bgImg:Laya.Image;
		public layoutLabel:Laya.Sprite;
		public labelLevel:laya.display.Text;
		public topNavView:Laya.Sprite;
		public topMask:Laya.Sprite;
		public topList:Laya.List;
		public layout:Laya.Sprite;
		public btnTipLayout:Laya.Sprite;
		public btnTip:ImageRunTime;
		public btnRefresh:ImageRunTime;
		public btnSettings:ImageRunTime;
		public bottomApp:Laya.Sprite;
		public bottomAppBg:Laya.Image;
		public bottomAppList:View;

        public static  uiView:any ={"type":"View","props":{"width":1080,"height":2000},"child":[{"type":"Image","props":{"y":0,"x":0,"width":1080,"var":"bgImg","skin":"comp/bg.png","height":2000}},{"type":"Sprite","props":{"y":10,"x":0,"width":1080,"var":"layoutLabel","height":100},"child":[{"type":"Text","props":{"y":0,"x":540,"width":300,"var":"labelLevel","valign":"middle","text":"第 30 关","pivotX":150,"height":100,"fontSize":60,"font":"Arial","color":"#ffffff","bold":true,"align":"center"}}]},{"type":"Sprite","props":{"y":130,"x":0,"width":1080,"var":"topNavView","height":270},"child":[{"type":"Sprite","props":{"y":0,"x":0,"width":1080,"var":"topMask","height":270,"alpha":1},"child":[{"type":"Rect","props":{"y":0,"x":0,"width":1080,"lineWidth":1,"height":270,"fillColor":"#0f0101"}}]},{"type":"List","props":{"y":0,"x":0,"width":1080,"var":"topList","spaceY":0,"spaceX":0,"repeatY":1,"repeatX":4,"height":270}}]},{"type":"Sprite","props":{"y":400,"x":140,"width":800,"var":"layout","height":1200}},{"type":"Sprite","props":{"y":1630,"x":0,"width":1080,"var":"btnTipLayout","height":100},"child":[{"type":"Image","props":{"y":50,"x":830,"width":200,"var":"btnTip","skin":"subassets/comp/imgBtnPop.png","runtime":"ImageRunTime","height":100,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":50,"x":240,"width":200,"var":"btnRefresh","skin":"subassets/comp/restart.png","runtime":"ImageRunTime","height":100,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":50,"x":540,"width":100,"var":"btnSettings","skin":"subassets/comp/setting.png","runtime":"ImageRunTime","height":100,"anchorY":0.5,"anchorX":0.5}}]},{"type":"Sprite","props":{"y":1771,"x":0,"width":1080,"var":"bottomApp","height":220},"child":[{"type":"Image","props":{"width":1080,"visible":false,"var":"bottomAppBg","skin":"comp/imgBgAlpha.png","height":220}},{"type":"View","props":{"y":10,"x":0,"width":1080,"var":"bottomAppList","height":210}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);
			View.regComponent("ImageRunTime",ImageRunTime);

            super.createChildren();
            this.createView(ui.page_dir.GameInfoUI.uiView);

        }

    }
}

module ui.page_dir {
    export class LoadPageUI extends View {
		public bgImg:Laya.Image;
		public progressLayout:Laya.Sprite;
		public loadText:Laya.Label;
		public readmeLayout:Laya.Sprite;
		public msgLabel:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":1080,"height":2000},"child":[{"type":"Image","props":{"y":0,"x":0,"width":1080,"var":"bgImg","skin":"comp/bg.png","height":2500}},{"type":"Label","props":{"y":400,"x":0,"width":1080,"text":"游戏名称","height":150,"fontSize":140,"color":"#e8532e","bold":true,"align":"center"}},{"type":"Sprite","props":{"y":900,"x":190,"width":700,"var":"progressLayout","height":200},"child":[{"type":"Label","props":{"y":100,"width":647,"var":"loadText","valign":"middle","text":"加载中...","height":50,"fontSize":45,"color":"#9a9a9a","align":"center"}}]},{"type":"Sprite","props":{"y":1250,"x":40,"width":1000,"var":"readmeLayout","height":400},"child":[{"type":"Label","props":{"width":1000,"text":"健康游戏忠告","height":80,"fontSize":40,"color":"#343434","bold":true,"align":"center"}},{"type":"Label","props":{"y":80,"x":0,"width":1000,"var":"msgLabel","text":"忠告内容","leading":28,"height":237,"fontSize":28,"color":"#1c1c1c","bold":false,"align":"center"}},{"type":"Label","props":{"y":326,"x":0,"width":1000,"text":"Powered by LayaAir Engine","height":49,"fontSize":38,"color":"#666666","bold":false,"align":"center"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.page_dir.LoadPageUI.uiView);

        }

    }
}

module ui.page_dir {
    export class PassPageUI extends View {
		public bgImg:Laya.Image;
		public contentLayout:Laya.Sprite;
		public levelLabel:Laya.Label;
		public btnNext:ImageRunTime;
		public topApp:Laya.Sprite;
		public topAppList:View;
		public bottomApp:Laya.Sprite;
		public bottomAppBg:Laya.Image;
		public bottomAppList:View;
		public bottomAppTitle:laya.display.Text;

        public static  uiView:any ={"type":"View","props":{"width":1080,"height":1920},"child":[{"type":"Image","props":{"y":0,"x":0,"width":1080,"var":"bgImg","skin":"comp/passbg.png","height":1920}},{"type":"Sprite","props":{"y":47,"x":100,"width":880,"var":"contentLayout","height":1400},"child":[{"type":"Label","props":{"y":90,"x":0,"width":880,"var":"levelLabel","valign":"middle","text":"第1关","leading":10,"height":136,"fontSize":60,"font":"SimHei","color":"#1e1e1e","bold":true,"align":"center"}},{"type":"Image","props":{"y":1284,"x":440,"width":477,"var":"btnNext","skin":"comp/imgTextNext.png","runtime":"ImageRunTime","height":153,"anchorY":0.5,"anchorX":0.5}},{"type":"Sprite","props":{"y":380,"x":-100,"width":1080,"visible":false,"var":"topApp","height":772},"child":[{"type":"Image","props":{"y":9,"x":540,"width":580,"skin":"comp/passPopupBg.png","height":130,"anchorY":0.5,"anchorX":0.5,"sizeGrid":"30,30,30,30"},"child":[{"type":"Text","props":{"y":5,"x":-250,"width":1080,"visible":true,"valign":"middle","text":"百万玩家正在玩","height":103,"fontSize":70,"font":"SimHei","color":"#000000","bold":true,"align":"center"}}]},{"type":"Image","props":{"y":52,"x":10,"width":1057,"skin":"comp/passPopupBg.png","height":722,"sizeGrid":"30,30,30,30"}},{"type":"View","props":{"y":80,"x":0,"width":1080,"var":"topAppList","height":640}}]}]},{"type":"Sprite","props":{"y":1400,"x":0,"width":1080,"visible":false,"var":"bottomApp","height":400},"child":[{"type":"Rect","props":{"y":0,"x":0,"width":1080,"lineWidth":1,"height":200}},{"type":"Image","props":{"y":0,"x":0,"width":1080,"var":"bottomAppBg","skin":"comp/imgBgAlpha.png","height":400,"alpha":0.5}},{"type":"View","props":{"y":10,"x":0,"width":1080,"var":"bottomAppList","height":380}},{"type":"Text","props":{"y":0,"x":0,"width":120,"visible":false,"var":"bottomAppTitle","valign":"top","height":20,"fontSize":18,"font":"Microsoft YaHei","color":"#ffffff","align":"center"}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ImageRunTime",ImageRunTime);
			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.page_dir.PassPageUI.uiView);

        }

    }
}

module ui.view {
    export class ProgressViewUI extends View {
		public progressBg:Laya.Image;
		public progressBar:Laya.Image;
		public progressMask:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":700,"height":58},"child":[{"type":"Panel","props":{"y":29,"x":350,"width":700,"height":58,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":29,"x":350,"width":700,"var":"progressBg","value":0,"skin":"comp/imgProgressBarBg.png","height":58,"anchorY":0.5,"anchorX":0.5,"sizeGrid":"0,50,0,50"}},{"type":"Image","props":{"y":29,"x":350,"width":700,"var":"progressBar","skin":"comp/imgProgressBar.png","height":58,"anchorY":0.5,"anchorX":0.5,"sizeGrid":"0,50,0,50"},"child":[{"type":"Image","props":{"y":29,"x":-350,"width":700,"var":"progressMask","skin":"comp/imgProgressBar.png","renderType":"mask","height":58,"anchorY":0.5,"anchorX":0.5,"sizeGrid":"0,50,0,50"}}]}]},{"type":"Image","props":{"width":700,"skin":"comp/loginProgressGlass.png","sizeGrid":"0,50,0,50"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.view.ProgressViewUI.uiView);

        }

    }
}
