WL.registerComponent('playbook-toggle', {
    grey: {type: WL.Type.Material},
}, {
    init() {
        this.toggled = false;
    },
    start() {
        this.target = this.object.getComponent('cursor-target') || this.object.addComponent('cursor-target');
        this.collision = this.object.getComponent('collision') || this.object.addComponent('collision');
        this.collision.extents = [ 0.07, 0.04, 0.02 ];
        this.collision.collider = WL.Collider.AxisAlignedBox;
        this.collision.group = 0xF;
        this.collision.active = true;
        this.target.addClickFunction(this.onClick.bind(this));
        console.log(this.collision);

        const children = this.object.children;
        for(const c of children) {
            if(c.name == 'knob') this.knob = c;
        }
    },

    onClick() {
        // mute and unmute 
        
        this.toggled = !this.toggled;
        const moveAmount = 0.030;
        if(this.toggled) {
            //mute the audio 
            // grey the background 
            this.knob.translate([-moveAmount, 0, 0]);
        } else {
            // unmute the audio 
            // ungrey the background 
            this.knob.translate([moveAmount, 0, 0]);
        }
    }
});
