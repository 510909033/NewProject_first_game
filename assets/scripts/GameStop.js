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
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on(cc.Node.EventType.MOUSE_UP, this.onMouseUp, this);
    },

    start () {

    },

    // update (dt) {},
    execStop:function() {
        //显示stop图标
        this.node.active = true;
        //角色归为
    },

    onMouseUp: function(event) {
        let mouseType = event.getButton();
        if (mouseType === cc.Event.EventMouse.BUTTON_LEFT) {
            // 鼠标左键释放
            // let mousePoint = event.getLocation();
            // let localPoint = this.node.convertToNodeSpace(mousePoint);
            cc.log("鼠标左键释放");                      
            this.game.getComponent('Game').gameStart(); 
            this.node.active = !this.node.active     
        } else if (mouseType === cc.Event.EventMouse.BUTTON_MIDDLE) {
            // 鼠标中键释放
           
        } else if (mouseType === cc.Event.EventMouse.BUTTON_RIGHT) {
            // 鼠标右键释放
            cc.log("鼠标右键释放")
          
        }
    },


});
