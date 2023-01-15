WL.registerComponent('changeColor', {
    buttonMeshObject: {type: WL.Type.Object},
    hoverMaterial: {type: WL.Type.Material},
    peerComponent: {type: WL.Type.Object},

}, {
    start: function () {
        this.mesh = this.buttonMeshObject.getComponent('mesh');
        this.peerManager = this.peerComponent.getComponent('peer-manager');
        this.defaultMaterial = this.mesh.material;

        this.target = this.object.getComponent('cursor-target') || this.object.addComponent('cursor-target');
        this.target.addClickFunction(this.onClick.bind(this));

        this.peerManager.addNetworkDataRecievedCallback("change-color"+this.object.name, (d) => {
            console.log("change color received", d);
            this.setColor(d.color);
            //emoSpawner.spawn();
        });

        this.target.addDownFunction(this.onDown.bind(this));

        this.target.addHoverFunction(this.onHover.bind(this));
        this.target.addUnHoverFunction(this.onUnHover.bind(this));
        this.target.addUpFunction(this.onUp.bind(this));

        /*  this.soundClick = this.object.addComponent('howler-audio-source', {src: 'sfx/click.wav', spatial: true});
          this.soundUnClick = this.object.addComponent('howler-audio-source', {src: 'sfx/unclick.wav', spatial: true});
  */
    },

    setColor: function (color) {
        let mat = this.defaultMaterial.clone();
        mat.ambientColor = color;
        this.mesh.material = mat;

    },

    onClick: function (_, cursor) {
        const c = Math.random() * 1;
        const d = c * Math.random();
        let color = [c, d, c / d, 1];
        console.log("set color before ", color);
        this.setColor(color);


        console.log("set color ", color);
        this.peerManager.sendPackageImmediately("change-color"+this.object.name, {color: color});
        if (cursor.type == 'finger-cursor') {
            this.onDown(_, cursor);
        }
    },
    onDown: function (_, cursor) {
        //  this.soundClick.play();
        this.buttonMeshObject.translate([0.0, 0.0, 0.02]);
        this.hapticFeedback(cursor.object, 1.0, 20);
    },

    hapticFeedback: function (object, strength, duration) {
        const input = object.getComponent('input');
        if (input && input.xrInputSource) {
            const gamepad = input.xrInputSource.gamepad;
            if (gamepad && gamepad.hapticActuators) gamepad.hapticActuators[0].pulse(strength, duration);

        }
    },

    onUnHover: function (_, cursor) {
        if (this.mesh.material.diffuseColor == this.hoverMaterial.diffuseColor) {
            this.mesh.material = this.defaultMaterial;
        }
        if (cursor.type == 'finger-cursor') {
            this.onUp(_, cursor);
        }

        this.hapticFeedback(cursor.object, 0.3, 50);
    },

    onHover: function (_, cursor) {
        if (this.mesh.material.diffuseColor == this.hoverMaterial.diffuseColor) {
            this.hoverMaterial = this.mesh.material;
        }

        if (cursor.type == 'finger-cursor') {
            this.onDown(_, cursor);
        }

        this.hapticFeedback(cursor.object, 0.5, 50);
    },

    onUp: function (_, cursor) {
        //  this.soundUnClick.play();
        this.buttonMeshObject.translate([0.0, 0.0, -0.02]);
        this.hapticFeedback(cursor.object, 0.7, 20);

    }


});
