WL.registerComponent('spawn-cup', {
    cupMesh: {type: WL.Type.Mesh, default: null},
    cupMaterial:{type:WL.Type.Material, default:null},
    cupSpawnButton:{type: WL.Type.Object, default:null},
}, {
    init: function() {
        
    },
    start: function() {
        const cup = WL.scene.addObject(this.object);

        cup.addComponent('mesh', {
            mesh: this.cupMesh,
            material: this.cupMaterial,
          });
          
          cup.addComponent("physx",{
            shape:WL.Shape.Box,
            extents:[.1,.1,.1],
            kinematic:false,
            gravity: true,
            simulate:true,
          });

          cup.getComponent('mesh').active = true;

          this.cupSpawnButton.getComponent('cursor-target').addClickFunction(function(){if(cup.getComponent('mesh').active==true){
            cup.getComponent('mesh').active = false;
          } else{
            cup.getComponent("mesh").active = true;
          }})

          cup.rotateAxisAngleDegObject([1,0,0], -90) 
    },
    update: function(dt) {
        
    },
});
