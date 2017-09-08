

var LayergameStart=cc.Layer.extend({
    ctor:function () {
        this._super();
        var size = cc.winSize;
        //
        // var helloLabel = new cc.LabelTTF("Hello World", "Arial", 38);
        // helloLabel.x = size.width / 2;
        // helloLabel.y = size.height / 2 + 200;
        // this.addChild(helloLabel, 5);
        this.addPreLoadMusic();
        this.addStartGamePicture();
    },
    addStartGamePicture:function () {


        var winSize = cc.winSize;

       // cc.spriteFrameCache.addSpriteFrame(res.shoot_background_plist);
       // cc.textureCache.addImage(res.shoot_background_png);
       //  cc.spriteFrameCache.addSpriteFrame(res.shoot_plist);
       //  cc.textureCache.addImage(res.shoot_png)
        //加载全局图片信息
        cc.spriteFrameCache.addSpriteFrames(
            res.shoot_background_plist,res.shoot_background_png);
        cc.spriteFrameCache.addSpriteFrames(
            res.shoot_plist,res.shoot_png);

        //加载当前gamestart页面所需要的图片,动画
        var background = cc.Sprite.create(cc.spriteFrameCache.
        getSpriteFrame("background.png"));
        background.setAnchorPoint(cc.p(0, 0));
        background.setPosition(cc.p(0, 0));
        this.addChild(background);

        var copyright =new  cc.Sprite(cc.spriteFrameCache.
        getSpriteFrame("shoot_copyright.png"));
        copyright.setAnchorPoint(cc.p(0.5, 0));
        copyright.setPosition(cc.p(winSize.width / 2, winSize.height / 2));
        this.addChild(copyright);
        //
        var loading =new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("game_loading1.png"))
        loading.setPosition(cc.p(winSize.width / 2, winSize.height / 2 - 40));
        this.addChild(loading);

        //添加飞机滑动的动画
        var animation=new cc.Animation();
        animation.setDelayPerUnit(0.2)
        var palnes=["game_loading1.png","game_loading2.png","game_loading3.png","game_loading4.png"];
       //animation.addSpriteFrame()
        for (var i=0;i<palnes.length;i++){
          animation.addSpriteFrame(cc.spriteFrameCache.
          getSpriteFrame(palnes[i]));
        }
        var animate= cc.animate(animation);//new
        //动画播放四次
        var repeat= cc.repeat(animate,4);//new
       //动画完成的回调函数
        var loadingDone=cc.callFunc(this.toMainGameCallback.bind(this));

        var sequence= cc.sequence(repeat,loadingDone);//new
        loading.runAction(sequence);
    },

    toMainGameCallback:function () {
        cc.log("toMainGameCallback----");
        var scene=new LayerGameMainScene();
        cc.director.runScene(scene);
    },
    addPreLoadMusic:function () {
    //     var audio= cc.AudioEngine;
    //
    //     cc.audioEngine.playMusic(res.game_music_wav);
     }

    
})

//创建场景
var LayergameStartScene=cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer=new LayergameStart();
        this.addChild(layer);
    }
})