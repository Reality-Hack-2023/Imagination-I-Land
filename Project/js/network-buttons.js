WL.registerComponent('network-buttons', {
    peerManagerObject: {type: WL.Type.Object},
    cursor: {type: WL.Type.Object},
    hostButton: {type: WL.Type.Object},
    joinButton: {type: WL.Type.Object},
}, {
    start: function () {
        this.pm = this.peerManagerObject.getComponent('peer-manager');
        this.pm.host();
        console.log("trying to host");

        this.pm.peer.on('error', (e) => {
            console.error(e);
            setTimeout(()=>{
                this.pm.join();
                console.log("trying to connect as guest");

                this.pm.peer.on('error', (e) => {
                    console.error(e);
                    setTimeout(()=> {
                        this.pm.host();
                        console.log("trying to host again");
                    },100);
                });
                
            },100);
            
            
        });

    }
    
});
