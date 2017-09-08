


var Enemy=cc.Node.extend({
    _sprite:null,
    _life:0,
    ctor:function () {
        this._super();
    },
    bindEnemySprite:function (sp,life) {
     this._sprite=sp;
     this._life=life;
     this.addChild(sp);
    },
    getSprite:function () {
       return this._sprite;
    },
    getLife:function () {
        return this._life;
    },
    loseLife:function () {
        this._life--;
    },
    getWorldBoundingBox:function () {
        var rect=this._sprite.getBoundingBox();
        var pos=this._sprite.convertToWorldSpace(cc.p(rect.x,rect.y));
        var enenyRect=cc.rect(pos.x,pos.y,rect.width,rect.height);
        return enenyRect;
    }
});