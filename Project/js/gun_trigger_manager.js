WL.registerComponent('gun_trigger_manager', {
    trigger: {type: WL.Type.Object, default: null},
    particleShooter: {type: WL.Type.Object, default: null},
}, {
    init: function() {

    },
    start: function() {
        const particleShooterFunction = this.particleShooter.getComponent("emoji_particle_shooter")
        
        console.log(particleShooterFunction.active)
        this.trigger.getComponent('cursor-target').addDownFunction(function(){particleShooterFunction.active = true;});
        this.trigger.getComponent('cursor-target').addUpFunction(function(){particleShooterFunction.objects.forEach(object => {
            object.active = false;
        }); particleShooterFunction.active = false});
    },
    
});
