WL.registerComponent('setEmoji', {
    param: {type: WL.Type.Float, default: 1.0},
},{
    init: function() {
        console.log('init() with param', this.param);
        var currentEmoji = 'devil'
    },
    start: function() {
        console.log('start() with param', this.param);
    },
    update: function(dt) {

    },
});
