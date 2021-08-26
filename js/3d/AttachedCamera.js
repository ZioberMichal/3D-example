class AttachedCamera {
    constructor(scene, canvas) {
        this.canvas = canvas;
        this.scene = scene;
        this.camera = this.createNewCamera();
    }

    createNewCamera() {
        var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, new BABYLON.Vector3(0, 0, 0), this.scene);
        camera.setPosition(new BABYLON.Vector3(20, 200, 400));
        camera.attachControl(this.canvas, true);
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