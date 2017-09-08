
//子弹
var LayerBullet=cc.Layer.extend({
    _bulletArray:[],
    _bulletBatchNode:null,

  ctor:function () {
      this._super();
      this._bulletBatchNode=new cc.SpriteBatchNode(res.shoot_png);
      this.addChild(this._bulletBatchNode);
      this.startShoot();
      this._className="LayerBullet"
  },
    startShoot:function () {
      this.schedule(this.addBulletCallback.bind(this),0.2);
    },
    addBulletCallback:function (dt) {
        //在另外一个层里，获得飞机的单例
        var hero=Plane.getInstance();
        var birthPlace=cc.pAdd(hero.getPosition(),
            cc.p(0,hero.getContentSize().height/2.0+2))
        var bulle=new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("bullet1.png"));
        bulle.setPosition(birthPlace);
        this._bulletBatchNode.addChild(bulle);
        this._bulletArray.push(bulle);

        var ditance = cc.winSize.height - hero.getPositionY() -
            hero.getContentSize().height / 2;
        var velocity = 800 / 1;
        var movedt = ditance / velocity;

        var to =cc.moveTo(movedt, cc.p(birthPlace.x, cc.winSize.height +
            bulle.getContentSize().height))
        var  actionDone =cc.callFunc(this.bulletMoveFinished.bind(this))

        var  sequence = cc.sequence(to, actionDone)
            //CCSequence::create(to, actionDone, NULL);

        bulle.runAction(sequence);

    },
    bulletMoveFinished:function (node) {
        var  bullet =node ;
        this._bulletBatchNode.removeChild(bullet, true);
        this._bulletArray.pop(bullet);
    },
    stopShoot:function () {
        this.unschedule(this.addBulletCallback.bind(this))
    },
    removeBullet:function (bullet) {
        this._bulletBatchNode.removeChild(bullet);
        this._bulletArray.pop(bullet)
    }

})