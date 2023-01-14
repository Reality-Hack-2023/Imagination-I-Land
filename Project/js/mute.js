WL.registerComponent("muteVoice", {
    peerComponent: {type: WL.Type.Object},
    muteUI: {type: WL.Type.Object},
    mutedColor: {type: WL.Type.Material},
}, {
    init: function () {
        //  this.input = this.Object.getComponent('input');

    },
    start: function () {
        WL.onXRSessionStart.push(this.setupVREvents.bind(this));
        this.mesh = this.muteUI.getComponent('mesh');
        this.defaultMaterial = this.mesh.material;
    },
    update: function () {

    },
    setupVREvents: function (s) {
        /* If in VR, one-time bind the listener */
        this.session = s;
        s.addEventListener('end', function (e) {
            /* Reset cache once the session ends to rebind select etc, in case
             * it starts again */
            this.gamepad = null;
            this.session = null;
        }.bind(this));  
        
        if (s.inputSources && s.inputSources.length) {
            for (var i = 0; i < s.inputSources.length; i++) {
                let inputSource = s.inputSources[i];

                if (inputSource.handedness == "right") {
                    this.gamepadRight = inputSource.gamepad;
                } else {
                    this.gamepadLeft = inputSource.gamepad;
                }
            }
        }
/*

     

        s.addEventListener('inputsourceschange', function (e) {
            console.log("input source changed");
            if (e.added && e.added.length) {
                for (var i = 0; i < e.added.length; i++) {
                    let inputSource = e.added[i];
                    if (inputSource.handedness == "right") {
                        this.gamepadRight = inputSource.gamepad;
                    } else {
                        this.gamepadLeft = inputSource.gamepad;
                    }
                }
            }
        }.bind(this));
*/

        s.addEventListener('squeeze', function (e) {
            let peerManager = this.peerComponent.getComponent('peer-manager');
            peerManager.toggleMute();
            console.log("toggle mute on squeeze");
            let mat = this.defaultMaterial.clone();
            if (peerManager.getMute()) {
                this.mesh.material = this.mutedColor;

            } else {
                this.mesh.material = mat;

            }

        }.bind(this));

    }
});
