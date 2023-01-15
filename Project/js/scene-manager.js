WL.registerComponent('SceneOnSwitchComponent', {
    scenefile: {type: WL.Type.String, default: "Scene-Switch.bin"},
    
}, {
    start: function(dt) {
        this.object.getComponent("cursor-target").addClickFunction(() => {
            WL.scene.load(this.scenefile);
            console.log("Switching Scenes...");
        })
        
        
    },
});
