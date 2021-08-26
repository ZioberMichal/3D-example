class DeleteFeature {
    constructor(scene, ground) {
        this.scene = scene;
        this.ground = ground;
        this.registerMouseListener();
    }

    registerMouseListener() {
        this.scene.onPointerObservable.add((pointerInfo) => {
            switch (pointerInfo.type) {
                case BABYLON.PointerEventTypes.POINTERDOWN:
                    this.pointerDown(pointerInfo);
                    break;
            }
        });
    }

    pointerDown(pointerInfo) {
        var isMeshFound = info => info.hit && info.pickedMesh != this.ground;
        var isCtrlPressed = event => event.ctrlKey;
        if (isMeshFound(pointerInfo.pickInfo) && isCtrlPressed(pointerInfo.event)) {
            pointerInfo.pickInfo.pickedMesh.dispose();
        }
    }
}