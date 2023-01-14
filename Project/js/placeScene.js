WL.registerComponent('playScene', {
    message: {type: WL.Type.String, default: "It was clicked!"},
    buttonMeshObject: {type: WL.Type.Object},
}, {
    start: function(dt) {
        /* Get a reference to the "cursor-target" component */
        const target = this.object.getComponent('cursor-target');
        this.buttonMeshObject.active = false;

        target.addClickFunction(this.onClick.bind(this));
    },

    onClick: function() {
        /* Print the message that was configured in the editor) */
        this.buttonMeshObject.children
        console.log(this.message);
    }
});