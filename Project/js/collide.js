WL.registerComponent('collide', {
  spawner: {type: WL.Type.Object, default: null},
}, {
    init: function() {
      this.collider = this.object.getComponent('collision');
      this.objects = [];
      this.check = false;
      this.timeStart=0.0;
      this.time = 0.0;
      
    },
    start: function() {
      this.spawner.active = false;
    },
    update: function(dt) {
      //Sphere Movement
      this.object.translate([0, 0, -2*dt]);
      this.time+=dt;
      //Collision Detection & Destruction
      const collidingComps = this.collider.queryOverlaps();
      if(collidingComps.length == 0) {
        this.check = false;
      }
      for(let i = 0; i < collidingComps.length; ++i) {
        if(!this.check) {
          const collidingMesh = collidingComps[i].object.getComponent('mesh');
          this.spawner.translate([this.object.getTranslationWorld([])]);
          collidingMesh.active=false;
          this.object.getComponent('mesh').active=false;
          this.check = true;
          this.spawner.active = true;
          this.timeStart=this.time;
        }
      }
      if(this.timeStart>0.0){
        if(this.time-this.timeStart>1){
          this.spawner.getComponent("mesh-particles").active=false;
        }
        
      }
    },
});
