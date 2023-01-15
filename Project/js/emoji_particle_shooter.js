/**
Very simple mesh particles system

Demostrates spawning of new objects with components
and a simple pooling pattern.

Use it and customize it for your own game.
*/
WL.registerComponent('emoji_particle_shooter', {
    /* Mesh for spawned particles */
    devil: {type: WL.Type.Mesh, default: null},
    /* Material for spawned particles */
    devilmat: {type: WL.Type.Material, default: null},
    /* Mesh for spawned particles */
    love: {type: WL.Type.Mesh, default: null},
    /* Material for spawned particles */
    lovemat: {type: WL.Type.Material, default: null},
    /* Mesh for spawned particles */
    think: {type: WL.Type.Mesh, default: null},
    /* Material for spawned particles */
    thinkmat: {type: WL.Type.Material, default: null},
    /* Delay between particle spawns. If below time of a frame, will spawn multiple particles in update. */
    delay: {type: WL.Type.Float, default: 0.04},
    /* Maximum number of particles, once limit is reached, particles are recycled first-in-first-out. */
    maxParticles: {type: WL.Type.Int, default: 10},
    /* Initial speed of emitted particles. */
    initialSpeed: {type: WL.Type.Float, default: 30},
    /* Size of a particle */
    particleScale: {type: WL.Type.Float, default: 0.1},
    //Parent Object
    gun:{type:WL.Type.Object, default: null},

    changeEmojiButton:{type:WL.Type.Object, default: null},
}, {
    init: function() {
        this.time = 0.0;
        this.count = 0;
    },
    start: function() {
        this.objects = [];
        this.velocities = [];

        this.objects = WL.scene.addObjects(this.maxParticles, null, this.maxParticles);

        

        for(let i = 0; i < this.maxParticles; ++i) {
            this.velocities.push([0, 0, 0]);
            let obj = this.objects[i];
            obj.name = "particle" + this.count.toString();
            let mesh = obj.addComponent('mesh');

            mesh.mesh = this.devil;
            mesh.material = this.devilmat;
            /* Most efficient way to hide the mesh */
            obj.scale([0, 0, 0]);
        }

        //this.changeEmojiButton.addClickFunction(function(){if(this.changeEmojiButton.currentEmoji=='devil'){console.log('woohoo')}else{console.log('nope')}});
    },
    update: function(dt) {
        this.time += dt;
        if(this.time > this.delay) {
            /* Time to spawn particles */
            const spawnCount = Math.floor(this.time / this.delay)
            for(let i = 0; i < spawnCount; ++i) this.spawn();
            this.time -= this.delay*spawnCount;
        }

        this.object.translate([dt*4, 0, 0]);
        this.object.rotateAxisAngleDeg([0, 1, 0], dt*90);

        /* Target for retrieving particles world locations */
        let origin = [0, 0, 0];
        let distance = [0, 0, 0];
        for(let i = 0; i < Math.min(this.count, this.objects.length); ++i) {
            /* Get translation first, as object.translate() will mark
             * the object as dirty, which will cause it to recalculate
             * obj.transformWorld on access. We want to avoid this and
             * have it be recalculated in batch at the end of frame
             * instead */
            glMatrix.quat2.getTranslation(origin, this.objects[i].transformWorld);

            /* Apply gravity */
            const vel = this.velocities[i];
            vel[1] -= 9.81*dt;

            /* Check if particle would collide */
            if((origin[1] + vel[1]*dt) <= this.particleScale && vel[1] <= 0) {
                /* Pseudo friction */
                const frict = 1/(1 - vel[1]);
                vel[0] = frict*vel[0];
                vel[2] = frict*vel[2];

                /* Reflect */
                vel[1] = -0.6*vel[1];
                if(vel[1] < 0.6) vel[1] = 0;
            }
        }

        for(let i = 0; i < Math.min(this.count, this.objects.length); ++i) {
            /* Apply velocity */
            glMatrix.vec3.scale(distance, this.velocities[i], dt);
            this.objects[i].translate(distance);
        }
    },

    /** Spawn a particle */
    spawn: function() {
        let index = this.count % this.maxParticles;
        let gun = this.gun;
        let obj = this.objects[index];
        obj.resetTransform();
        obj.scale([this.particleScale, this.particleScale, this.particleScale]);

        /* Activate component, otherwise it will not show up! */
        obj.getComponent('mesh').active = true;

        const origin = this.gun.getTranslationWorld([])
        
        obj.translate(origin);
        console.log("spawning, translate to origin "+origin );

        this.velocities[index][0] = 0;
        this.velocities[index][1] = 0;
        this.velocities[index][2] = .1;

        glMatrix.vec3.normalize(this.velocities[index], this.velocities[index]);
        glMatrix.vec3.scale(this.velocities[index], this.velocities[index], this.initialSpeed);

        this.count += 1;
    }
});
