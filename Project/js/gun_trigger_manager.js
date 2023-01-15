WL.registerComponent('gun_trigger_manager', {
    trigger: {type: WL.Type.Object, default: null},
    particleShooter: {type: WL.Type.Object, default: null},
    peerComponent: {type: WL.Type.Object},

}, {
    init: function () {

    },
    start: function () {
        let peerManager = this.peerComponent.getComponent('peer-manager');

        this.trigger.getComponent('cursor-target').addDownFunction(function () {
            this.startShoot(true);
            // send message when you are interacting in XR 
            peerManager.sendPackageImmediately("emoji-start", {type: "heart"});
            console.log("sending emoji-start");

        });
        this.trigger.getComponent('cursor-target').addUpFunction(function () {

            this.startShoot(false);
            peerManager.sendPackage("emoji-stop", {type: "heart"});
            console.log("sending emoji-stop");

        });
    },

    
    startShoot:function(start){
        const particleShooterFunction = this.particleShooter.getComponent("emoji_particle_shooter")

        if(!start){
            particleShooterFunction.objects.forEach(object => {
                object.active = false;
            });
        }
        particleShooterFunction.active=start;
    }

});
