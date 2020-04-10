// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        startBtn:{
            default:null,
            type:cc.Button,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._bindMouseEvent();
    },

    start () {

    },

    // update (dt) {},

    onDestroy () {
        // 取消键盘输入监听
       
        
    },




    _bindMouseEvent() {
        
        this.node.on(cc.Node.EventType.MOUSE_UP, this.onMouseUp, this);
        
    },
    onMouseUp: function(event) {
        let mouseType = event.getButton();
        if (mouseType === cc.Event.EventMouse.BUTTON_LEFT) {
            // 鼠标左键释放
            // let mousePoint = event.getLocation();
            // let localPoint = this.node.convertToNodeSpace(mousePoint);
            cc.log("鼠标左键释放");
            cc.director.loadScene('game');
        } else if (mouseType === cc.Event.EventMouse.BUTTON_MIDDLE) {
            // 鼠标中键释放
           
        } else if (mouseType === cc.Event.EventMouse.BUTTON_RIGHT) {
            // 鼠标右键释放
            cc.log("鼠标右键释放")
          
        }
    },
    
    
});
