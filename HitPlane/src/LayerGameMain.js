
var BACKGROUND={
    BACK1:0,
    BACK2:1
};
var  LayerGameMain=cc.Layer.extend({
    bigBoomCount:0,
    _bulletLayer:null,
    _enemyLayer:null,
    ctor:function () {
     this._super();
     this.scheduleUpdate();
     this.addBackGround();
     this.addHero();
     this.addBulletLayer();
      this.addEnemyLayer()
     //添加触摸事件
        if( 'touches' in cc.sys.capabilities ) {
            cc.eventManager.addListener({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches: true,
                onTouchBegan: this.onTouchBegan.bind(this),
                onTouchMoved: this.onTouchMoved.bind(this),
            }, this);
        } else {
            cc.log("不支持触摸事件");
        }
    },
    onTouchBegan:function (ptouch,pEvent) {
        var palneRect=Plane.getInstance().getBoundingBox();
        palneRect.x-=30;
        palneRect.y-=40;
        palneRect.width+=60;
        palneRect.height+=80;

        if(cc.rectContainsPoint(palneRect,ptouch.getLocation())){
            return true;
        }else {
            return false;
        }


    },
    onTouchMoved:function (pTouch,pEvent) {
      var hero=Plane.getInstance();
        var position=cc.pAdd( hero.getPosition(),pTouch.getDelta());
      if(position.x<hero.getBoundingBox().width/2.0||
          position.x>cc.winSize.width-hero.getBoundingBox().width/2.0
      ||position.y<hero.getBoundingBox().height / 2
      ||position.y > cc.winSize.height - hero.getBoundingBox().height / 2){
          return;
      }else {
          hero.setPosition(position);
      }
    },
    addBackGround:function () {
        var bg1=new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("background.png"));
        bg1.setTag(BACKGROUND.BACK1);
        bg1.setAnchorPoint(cc.p(0, 0));
        bg1.setPosition(cc.p(0, 0));
        this.addChild(bg1);

        var bg2 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("background.png"));
        bg2.setTag(BACKGROUND.BACK2);
        bg2.setAnchorPoint(cc.p(0, 0));
        bg2.setPosition(cc.p(0, bg2.getContentSize().height - 2));
        this.addChild(bg2);
        this.schedule(this.movingBackGround.bind(this),0.01);

    },
    movingBackGround:function (dt) {
        var bg1 = this.getChildByTag(BACKGROUND.BACK1);
        var bg2 = this.getChildByTag(BACKGROUND.BACK2);

        bg1.setPositionY(bg1.getPositionY() - 2);
        bg2.setPositionY(bg1.getPositionY() + bg2.getContentSize().height - 2);

        if (bg2.getPositionY() < 0)
        {
            bg1.setPositionY(0);
        }
    },
    addBulletLayer:function () {
     var layer=new LayerBullet();
     this._bulletLayer=layer;
     this.addChild(layer);
    },
    update:function(dt){
       // cc.log("update--");
        //bullet vs enemysmall
        // var bt = null;
        // var et = null;
        var bulletsToDel =[];
       // cc.log("update---");

        for(var i=0;i<this._bulletLayer._bulletArray.length;i++){
            var bullet=this._bulletLayer._bulletArray[i];
            var smallEnemyToDel=[];
            for (var j=0;j<this._enemyLayer.smallArray.length;j++){
                 var smallEnemy= this._enemyLayer.smallArray[j];


                 if(cc.rectIntersectsRect(bullet.getBoundingBox(),smallEnemy.getWorldBoundingBox())){
                     // cc.log("getLife " +smallEnemy.getLife());
                     // cc.log("bullet.getBoundingBox() x: ",bullet.getBoundingBox().x+
                     // " y : "+bullet.getBoundingBox().y+" width : "
                     //     +bullet.getBoundingBox().width
                     // +" height : "+bullet.getBoundingBox().height);
                     //
                     // cc.log("smallEnemy.getWorldBoundingBox() x: ",smallEnemy.getWorldBoundingBox().x+
                     //     " y : "+smallEnemy.getWorldBoundingBox().y+" width : "
                     //     +smallEnemy.getWorldBoundingBox().width
                     //     +" height : "+smallEnemy.getWorldBoundingBox().height);
                      if(smallEnemy.getLife()==1)
                     {
                         smallEnemy.loseLife();
                         smallEnemyToDel.push(smallEnemy);
                         bulletsToDel.push(bullet)
                         //score += SMALL_SCORE;
                       //  _ctrlLayer->updataScore(score);
                     }
                 }
            }


            for (var m=0;m<smallEnemyToDel.length;m++){
              var smallEnemy=smallEnemyToDel[m];

              this._enemyLayer.smallEnemyBlowUp(smallEnemy);
            }
             smallEnemyToDel.splice(0,smallEnemyToDel.length);
        }

        for (var i=0;i<bulletsToDel.length;i++){
        this._bulletLayer.removeBullet(bulletsToDel[i])
        }


    },
    addHero:function () {
        var hero=Plane.getInstance();
        hero.setPosition(cc.p(cc.winSize.width / 2, hero.getContentSize().height / 2));
        this.addChild(hero);
    },
    addEnemyLayer:function () {
        //添加敌机
        var layer=new LayerEnemy();
        this._enemyLayer=layer;
        this.addChild(layer);
    }

})


//初始化积分
LayerGameMain.score=0;

var LayerGameMainScene=cc.Scene.extend({

    onEnter:function () {
        this._super();
        var layer=new LayerGameMain();
        this.addChild(layer)
    }
})