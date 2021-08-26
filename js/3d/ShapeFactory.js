class ShapeFactory {
    constructor(scene) {
        this.scene = scene;
    }

    createBox(size, position, color) {
        const material = this.createMaterial(color);

        const box = BABYLON.MeshBuilder.CreateBox("box", size);
        box.position = new BABYLON.Vector3(position.x, position.y, position.z);
        box.material = material;

        return box;
    }

    createMaterial(color) {
        const material = new BABYLON.StandardMaterial("ground", this.scene);
        material.diffuseColor = new BABYLON.Color3(0.4, 0.4, 0.4);
        material.specularColor = new BABYLON.Color3(0.4, 0.4, 0.4);
        material.emissiveColor = new BABYLON.Color3(color.r, color.g, color.b);

        return material;
    }
}