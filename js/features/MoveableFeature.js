class MoveableFeature {
    constructor(scene, camera, ground) {
      this.scene = scene;
      this.camera = camera;
      this.ground = ground;
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
        this.camera.detach();
      }
    }
  
    pointerUp() {
      if (this.startingPoint) {
        this.camera.attach();
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