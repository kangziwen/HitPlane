

var LayerEnemy=cc.Layer.extend({
    smallArray:[],

  ctor:function () {
      this._super();
      this._className="LayerEnemy"
      //动画特效
    var samallAnimation=new cc.Animation();

    samallAnimation.setDelayPerUnit(0.1);

    for (var i=0;i<4;i++){
        var nameBuf="enemy1_down"+(i+1)+".png";
        samallAnimation.addSpriteFrame(cc.spriteFrameCache.getSpriteFrame(nameBuf) );
    }
      cc.animationCache.addAnimation(samallAnimation,"SmallBlowUp");
      this.schedule(this.addSmallEnemy.bind(this),0.5);

  },
    addSmallEnemy:function () {
       var smallPlane=new Enemy();
       var sp=new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("enemy1.png"))
       smallPlane.bindEnemySprite(sp,LayerEnemy.SMALL_MAXLIFE);
       this.addChild(smallPlane);
       this.smallArray.push(smallPlane);
       var x=cc.random0To1()*(cc.winSize.width-smallPlane.getWorldBoundingBox().width)
           +smallPlane.getWorldBoundingBox().width/2.0;
       var y=cc.winSize.height + smallPlane.getWorldBoundingBox().height / 2;

        var smallBirth = cc.p(x, y);
        smallPlane.setPosition(smallBirth);
 // cc.log("smallPlane x : "+smallPlane.getPosition().x +" y : "+smallPlane.getPosition().y)
        var to=cc.moveTo(3,cc.p(smallBirth.x,
            smallBirth.y - cc.winSize.height -
            smallPlane.getWorldBoundingBox().height))
        var calldone=cc.callFunc(this.smallEnemyMovefinished.bind(this))
        var seq=cc.sequence(to,calldone);
        smallPlane.runAction(seq);
    },
    smallEnemyMovefinished:function (node) {
       node.removeFromParent();
       this.smallArray.pop(node);
    },
    smallEnemyBlowUp:function (smallEnemy) {

        var smallAnimation = cc.animationCache.getAnimation("SmallBlowUp");
        var smallAnimate=cc.animate(smallAnimation);
        cc.log("smallAnimate : "+smallAnimate)
        var actionDone = cc.callFunc(this.removeSmallEnemy.bind(this),this,smallEnemy);//
        var sequence =cc.sequence(smallAnimate ,actionDone)//

        smallEnemy.getSprite().runAction(sequence);
    },
    removeSmallEnemy:function (target,data) {//
       var smallEnemy =data;
       cc.log("target "+target._className+" data : "+data._className)

        if (smallEnemy)
        {
            this.smallArray.pop(smallEnemy);
            smallEnemy.removeFromParent();
        }
    },
    removeAllSmallEnemy:function () {

        for (var et in this.smallArray){
            var enemy=this.smallArray[et];
            if(enemy.getLife()>=1){
                this.smallEnemyBlowUp(enemy);
            }
        }
    },
    removeAllEnemy:function () {
       this.removeAllSmallEnemy();
    }
});
LayerEnemy.SMALL_MAXLIFE=1;
LayerEnemy.MID_MAXLIFE=3;
LayerEnemy.BIG_MAXLIFE=5;
