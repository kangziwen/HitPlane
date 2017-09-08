

var Plane=cc.Sprite.extend({
     ctor:function () {
         this._super();
         // 用帧动画的帧来创建精灵
         this.initWithSpriteFrame(
            cc.spriteFrameCache.getSpriteFrame("hero1.png"));

         //一秒中闪三次
         var blink = cc.blink(1,3);

         //闪三次以后，开始执行动画
         var callFunc = cc.callFunc(this.animatePlane.bind(this));
         var sequence = cc.sequence(blink, callFunc);  //
         //CCsequence 不能打包ccrepeatforever的动作
         this.runAction(sequence);

         //暴炸动画缓存
    var animation = new cc.Animation();
    animation.setDelayPerUnit(0.2);
    animation.addSpriteFrame(cc.spriteFrameCache.getSpriteFrame("hero_blowup_n1.png"))
    animation.addSpriteFrame(cc.spriteFrameCache.getSpriteFrame("hero_blowup_n2.png"))
    animation.addSpriteFrame(cc.spriteFrameCache.getSpriteFrame("hero_blowup_n3.png"))
    cc.animationCache.addAnimation(animation,"PlaneBlowUp")


     },
    animatePlane:function () {
       var animation = new cc.Animation();
       animation.setDelayPerUnit(0.2);
       animation.addSpriteFrame(cc.spriteFrameCache.getSpriteFrame("hero1.png"));
        animation.addSpriteFrame(cc.spriteFrameCache.getSpriteFrame("hero2.png"));

        var animate=cc.animate(animation);
       this.runAction(cc.repeatForever(animate) );
    },
    removePlane:function () {
        this.removeFromParent();
    },
    blowUp:function () {

         var animate=cc.animate(cc.animationCache.getAnimation("PlaneBlowUp"))
         var actionDone=cc.callFunc(this.removePlane.bind(this))
    }
    

});
Plane._plane=null;
Plane.getInstance=function () {
    if (!Plane._splane)
    {
        Plane._splane = new Plane();
        // if (Plane._splane!=undefined&&Plane._splane!=null){
        //
        // }
    }
    return  Plane._splane;
 }



