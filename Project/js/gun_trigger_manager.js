WL.registerComponent('gun_trigger_manager', {
    trigger: {type: WL.Type.Object, default: null},
    particleShooter: {type: WL.Type.Object, default: null},
    peerComponent: {type: WL.Type.Object},

}, {
    init: function() {

    },
    start: function() {
        const particleShooterFunction = this.particleShooter.getComponent("emoji_particle_shooter")
        let peerManager=  this.peerComponent.getComponent('peer-manager');

        console.log(particleShooterFunction.active)
        this.trigger.getComponent('cursor-target').addDownFunction(function(){
            particleShooterFunction.active = true;
            // send message when you are interacting in XR 
            peerManager.sendPackage("emoji","heart");

        });
        this.trigger.getComponent('cursor-target').addUpFunction(function(){particleShooterFunction.objects.forEach(object => {
            object.active = false;
        }); particleShooterFunction.active = false});
    },
    
});
