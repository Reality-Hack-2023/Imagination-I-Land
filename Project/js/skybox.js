WL.registerComponent('skybox', {
    skyMat: {type: WL.Type.Material},
    light1: {type: WL.Type.Object},
    light2: {type: WL.Type.Object},
    peerComponent: {type: WL.Type.Object}


}, {
    init: function () {
        // console.log('init() with param', this.param);
    },
    start: function () {
        this.lightComponent = this.light1.getComponent('light');
        this.lightComponent2 = this.light2.getComponent('light');
        this.peerManager = this.peerComponent.getComponent('peer-manager');

        // console.log('start() with param', this.param);
        this.target = this.object.getComponent('cursor-target') || this.object.addComponent('cursor-target');
        this.target.addClickFunction(this.onClick.bind(this));


        this.peerManager.addNetworkDataRecievedCallback("change-light-sky" + this.object.name, (d)=>{
            this.sendColor(d.color[0],d.color[1],d.color[2]); 
            console.log("set color");
        });


    },
    update: function (dt) {
        // console.log('update() with delta time', dt);

    },

    sendColor(e,d,c){

        this.skyMat.colorStop3 = [0, 0, 0, 1];
        this.skyMat.colorStop2 = [e, d, c, 1];
        this.skyMat.colorStop1 = [e, d, c, 1];
        this.skyMat.colorStop0 = [1, 1, 1, 1];

        this.lightComponent.color.set([e, d, c]);
        this.lightComponent2.color.set([d, e, c]);
    },
    onClick: function () {

        const c = Math.random() * 1;
        const d = Math.random() * c;
        const e = Math.random() * d;
        
        this.sendColor(e,d,c);
   
        this.peerManager.sendPackageImmediately("change-light-sky" + this.object.name, {type:"sky", color: [e, d, c] });



    }
});
