class UI {
    constructor(canvasName) {
        window.canvas = document.getElementById(canvasName);
        window.babylon = new BabylonWorld(canvas);
    }

    run() {
        this.init();
        this.addEventListeners();
    }

    init() {
        window.initFunction = async function () {
            var asyncEngineCreation = async function () {
                try {
                    return babylon.createDefaultEngine();
                } catch (e) {
                    console.log("the available createEngine function failed. Creating the default engine instead");
                    return babylon.createDefaultEngine();
                }
            }

            const engine = await asyncEngineCreation();
            if (!engine) throw 'engine should not be null.';
            babylon.createScene();
        };
        initFunction().then(() => {
            babylon.render();
            babylon.addMouseListener();
            window.shapeFactory = new ShapeFactory(babylon.scene);
        });
    }

    addEventListeners() {
        // Resize
        window.addEventListener("resize", () => babylon.resize());
        // Add UI features
        document.getElementById("addBox").onclick = () => {
            const size = { 
                height: this.getValueAsInt("size.Y"),
                width: this.getValueAsInt("size.X"),
                depth: this.getValueAsInt("size.Z") 
            };
            const position = {
                x: this.getValueAsInt("location.X"),
                y: this.getValueAsInt("location.Y"), 
                z: this.getValueAsInt("location.Z")
            };
            const color = this.htmlColorToRGB(document.getElementById("colorpicker").value);
            shapeFactory.createBox(size, position, color);
        };
    }

    getValueAsInt(input) {
        return parseInt(document.getElementById(input).value);
    }

    htmlColorToRGB(htmlColor) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(htmlColor);
        if (result) {
            var convertToColorPart = value => parseInt(value, 16) / 255.0;
            return {
                r: convertToColorPart(result[1]),
                g: convertToColorPart(result[2]),
                b: convertToColorPart(result[3])
            }
        }
        return { r: 0.0, g: 0.0, b: 0.0 };
    };
}