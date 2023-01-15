WL.registerComponent('emojiMsg', {
    message: {type: WL.Type.String},
    peerComponent: {type: WL.Type.Object},
    emojiSpawner: {type:WL.Type.Object},
}, {
    init: function() {
        console.log('init() with param', this.param);
    },
    start: function() {
        let peerManager=  this.peerComponent.getComponent('peer-manager');
        let emoSpawner=  this.peerComponent.emojiSpawner('emoji_particle_shooter');
        peerManager.sendPackage("emoji","heart");
        



        peerManager.addNetworkDataRecievedCallback("emoji",()=>{
            console.log("data received");
            
        })
        console.log('start() with param', this.param);
    },
    update: function(dt) {
        console.log('update() with delta time', dt);
    },
});
