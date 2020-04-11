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
        // 这个属性引用了星星预制资源
        starPrefab: {
            default: null,
            type: cc.Prefab
        },
        // 星星产生后消失时间的随机范围
        maxStarDuration: 0,
        minStarDuration: 0,
        // 地面节点，用于确定星星生成的高度
        ground: {
            default: null,
            type: cc.Node
        },
        // player 节点，用于获取主角弹跳的高度，和控制主角行动开关
        player: {
            default: null,
            type: cc.Node
        },
        scoreDisplay: {
            default: null,
            type: cc.Label
        },
        startBtn:{
            default:null,
            type:cc.Node,
        },
        stopBtn:{
            default:null,
            type:cc.Node,
        },
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
         cc.log("Game onload")
        this.isStart = false
          // 初始化计时器
        this.timer = 0;
        this.starDuration = 0;

         // 初始化计分
        this.score = 0;

         // 获取地平面的 y 轴坐标
        this.groundY = this.ground.y + this.ground.height/2;
        cc.log("groudY=" ,this.groundY)

        // // 生成一个新的星星
        // this.spawnNewStar();

        //在 player上缓存game对象
        this.player.getComponent('Player').game = this;

        this.startBtn.getComponent("GameStart").game = this
        this.stopBtn.getComponent("GameStop").game = this
     },

    start () {
        cc.log("Game start")
    },

    update (dt) {
        if(this.isStart) {
            if (this.timer > this.starDuration) {
                this.gameOver();
                return;
            }
            this.timer += dt;
        }
        
    },

    gameStart:function() {
        cc.log("gameStart")
        this.spawnNewStar();
        this.player.getComponent('Player').gameStart();
        this.isStart = true;
    },

    gameOver: function () {
        this.isStart = false;
        this.player.getComponent('Player').gameOver(); //player gameOver 

        this.stopBtn.active = true;
        // this.stopBtn.getComponent('GameStop').execStop();
        // cc.director.loadScene('game');
    },

    gainScore: function () {
        this.score += 1;
        // 更新 scoreDisplay Label 的文字
        this.scoreDisplay.string = 'Score: ' + this.score;
        //cc.log("gainScore = ", this.score)
    },

    spawnNewStar: function() {
        // 使用给定的模板在场景中生成一个新节点
        var newStar = cc.instantiate(this.starPrefab);
        // 将新增的节点添加到 Canvas 节点下面
        newStar.pickRadius = 60
        this.node.addChild(newStar);
        // 为星星设置一个随机位置
        newStar.setPosition(this.getNewStarPosition());

        // 在星星组件上暂存 Game 对象的引用
        newStar.getComponent('Star').game = this;

        

        // 重置计时器，根据消失时间范围随机取一个值
        this.starDuration = this.minStarDuration + Math.random() * (this.maxStarDuration - this.minStarDuration);
        this.timer = 0;
    },

    getNewStarPosition: function () {
        var randX = 0;
        // 根据地平面位置和主角跳跃高度，随机得到一个星星的 y 坐标
        var randY = this.groundY + Math.random() * this.player.getComponent('Player').jumpHeight + 50;
        // 根据屏幕宽度，随机得到一个星星 x 坐标
        var maxX = this.node.width/2;
        randX = (Math.random() - 0.5) * 2 * maxX;
        // 返回星星坐标
        return cc.v2(randX, randY);
    },
});
