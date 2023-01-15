WL.registerComponent('emojiReceiver', {
    peerComponent: {type: WL.Type.Object},
    emojiSpawner: {type:WL.Type.Object},
}, {
    init: function() {
        console.log('init() with param', this.param);
    },
    start: function() {
        let peerManager=  this.peerComponent.getComponent('peer-manager');
        let emoSpawner=  this.emojiSpawner.getComponent('emoji_particle_shooter');
        
        // send message when you are interacting in XR 
        //peerManager.sendPackage("emoji","heart");
        
        peerManager.addNetworkDataRecievedCallback("emoji-start",(d)=>{
            console.log("emoji start received",d);
            //emoSpawner.spawn();
        });
        peerManager.addNetworkDataRecievedCallback("emoji-stop",(d)=>{
            console.log("emoji stop received",d);
            //emoSpawner.spawn();
        });

        console.log('start() with param', this.param);
    },
    update: function(dt) {
    },
});
