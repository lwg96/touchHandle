cc.Class({
    extends: cc.Component,

    properties: {
        touchBackground: cc.Node,
        touchIcon: cc.Node,

        player: cc.Node,

        maxSpeed: 5,
    },

    onLoad() {
        this.touchIcon.on(cc.Node.EventType.TOUCH_START, this.touchStart, this);
        this.touchIcon.on(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
        this.touchIcon.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
        this.touchIcon.on(cc.Node.EventType.TOUCH_CANCEL, this.touchCancel, this);


        this.touchRadio = this.touchBackground.width / 2;
    },
    touchStart(event) {

    },

    touchMove(event) {
        let touch = event.touch;
        let pos = touch.getLocation();
        let localPos = this.touchBackground.convertToNodeSpaceAR(pos);

        let ySpeed, xSpeed;
        let dis = localPos.sub(cc.v2(0, 0)).mag();
        if (dis > this.touchRadio) {
            let ciclePointY = localPos.y * this.touchRadio / dis;
            let ciclePointX = Math.sqrt(Math.pow(this.touchRadio, 2) - Math.pow(ciclePointY, 2));
            if (localPos.x < 0) {
                ciclePointX = -ciclePointX;
            }
            localPos = cc.v2(ciclePointX, ciclePointY)
            this.touchIcon.setPosition(localPos);

            dis = this.touchRadio;
            speed = this.maxSpeed * dis / this.touchRadio;
            ySpeed = this.maxSpeed * localPos.y / dis;
            xSpeed = this.maxSpeed * localPos.x / dis;
        } else {
            this.touchIcon.setPosition(localPos);
            speed = this.maxSpeed * dis / this.touchRadio;
            ySpeed = speed * (localPos.y / dis);
            xSpeed = speed * (localPos.x / dis);
        }


        this.moving = true;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;

    },

    touchEnd(event) {
        this.moving = false;
        this.touchIcon.setPosition(cc.v2(0, 0));
    },

    touchCancel(event) {
        this.moving = false;
        this.touchIcon.setPosition(cc.v2(0, 0));
    },

    update() {
        if (this.moving) {
            let pos = this.player.getPosition().addSelf(cc.v2(this.xSpeed, this.ySpeed));
            this.player.setPosition(pos)
        }
    }


});
