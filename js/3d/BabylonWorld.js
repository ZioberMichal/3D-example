class BabylonWorld {
    constructor(canvas) {
        this.canvas = canvas;
    }

    createDefaultEngine() {
        const config = {
            preserveDrawingBuffer: true,
            stencil: true,
            disableWebGL2Support: false
        };
        this.engine = new BABYLON.Engine(this.canvas, true, config);

        return this.engine;
    }

    createScene() {
        this.scene = new BABYLON.Scene(this.engine);
        this.camera = new AttachedCamera(this.scene, this.canvas);

        this.light = this.createLight();
        this.ground = this.createGround();

        this.deleteFeature = new DeleteFeature(this.scene, this.ground);
        this.moveableFeature = new MoveableFeature(this.scene, this.camera, this.ground);
        this.shapeFactory = new ShapeFactory(this.scene);

        return this.scene;
    }

    createLight() {
        return new BABYLON.PointLight("light", new BABYLON.Vector3(50, 200, 0), this.scene);
    }

    createGround() {
        const groundMaterial = new BABYLON.StandardMaterial("ground", this.scene);
        groundMaterial.specularColor = BABYLON.Color3.Black();

        const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 1000, height: 1000 }, this.scene, false);
        ground.material = groundMaterial;
        return ground;
    }

    render() {
        this.sceneToRender = this.scene;
        this.engine.runRenderLoop(() => {
            if (this.sceneToRender && this.sceneToRender.activeCamera) {
                this.sceneToRender.render();
            }
        });
    }

    resize() {
        this.engine.resize();
    }
}