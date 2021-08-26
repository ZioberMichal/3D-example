/**
 * Base class to handle 3D camera attached to HTML canvas.
*/
class AttachedCamera {
    constructor(scene, canvas) {
        this.scene = scene;
        this.canvas = canvas;
        this.position = new BABYLON.Vector3(20, 200, 400);
        this.camera = this.createNewCamera();
        this.attach();
    }

    createNewCamera() {
        var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, new BABYLON.Vector3(0, 0, 0), this.scene);
        camera.setPosition(this.position);
        camera.upperBetaLimit = (Math.PI / 2) * 0.99;
        
        return camera;
    }

    detach() {
        setTimeout(() => this.camera.detachControl(this.canvas), 0);
    }

    attach() {
        this.camera.attachControl(this.canvas, true);
    }
}