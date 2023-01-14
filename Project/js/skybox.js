WL.registerComponent('skybox', {
      skyMat: {type: WL.Type.Material}
}, {
    init: function() {
       // console.log('init() with param', this.param);
    },
    start: function() {

       // console.log('start() with param', this.param);
        this.target = this.object.getComponent('cursor-target') || this.object.addComponent('cursor-target');
        this.target.addClickFunction(this.onClick.bind(this));
    },
    update: function(dt) {
       // console.log('update() with delta time', dt);
 
    },
    onClick: function(){

        const c = Math.random()*1;
        const d = Math.random()*c;
        const e = Math.random()*d;
        this.skyMat.colorStop3=[0,0,0,1];
        this.skyMat.colorStop2=[e,d,c,1];
        this.skyMat.colorStop1=[e,d,c,1];
        this.skyMat.colorStop0=[1,1,1,1];
    }
});
