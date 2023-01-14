WL.registerComponent('mute', {
    mute: {type: WL.Type.BOOL},
    peerComponent: {type: WL.Type.peerComponent},

}, {
  
    start: function () {
        this.target = this.object.getComponent('cursor-target') || this.object.addComponent('cursor-target');
        this.target.addClickFunction(this.onClick.bind(this));

    },
    onClick() {
        this.peerComponent.toggleMute();
        console.log("mute upon on click on UI");
    }
});
