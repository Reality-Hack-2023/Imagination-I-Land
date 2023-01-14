WL.registerComponent('mute', {
    mute: {type: WL.Type.BOOL, default: true},
}, {
    init: function() {
      

    },
    start: function() {
        console.log('start() with param', this.param);
    },
    update: function(dt) {
        console.log('update() with delta time', dt);
    },
});
