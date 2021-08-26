class MoveableFeature {
    constructor(scene, camera, ground, canvas) {
      this.scene = scene;
      this.camera = camera;
      this.ground = ground;
      this.canvas = canvas;
      this.startingPoint = null;
      this.currentMesh = null;
    }
  
    getGroundPosition() {
      const shape = this.scene.pick(this.scene.pointerX, this.scene.pointerY, mesh => mesh == this.ground);
      if (shape.hit) {
        return shape.pickedPoint;
      }
  
      return null;
    }
  
    pointerDown(mesh) {
      this.currentMesh = mesh;
      this.startingPoint = this.getGroundPosition();
      if (this.startingPoint) {
        setTimeout(() => this.camera.detachControl(this.canvas), 0);
      }
    }
  
    pointerUp() {
      if (this.startingPoint) {
        this.camera.attachControl(this.canvas, true);
        this.startingPoint = null;
      }
    }
  
    pointerMove() {
      if (!this.startingPoint) {
        return;
      }
      var current = this.getGroundPosition();
      if (!current) {
        return;
      }
  
      var diff = current.subtract(this.startingPoint);
      this.currentMesh.position.addInPlace(diff);
  
      this.startingPoint = current;
    }
  }