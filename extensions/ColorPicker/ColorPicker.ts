class ColorPicker {
    public EXTENSION_NAME: string = "com.paintjs.ColorPicker";
    paint: Paint.Global;

    constructor(paint: Paint.Global) {
        this.paint = paint;
    }

    init() {
        this.paint.registerTool(this);
        this.paint.barManager.addToolbarToolItem(__dirname + "/icon.png", "Color Picker", this);
    }

    activated(id: string) {
        this.paint.currentPaper.setCursorFromURL("cursors/picker.cur");
    }

    deactivated() {
        this.paint.currentPaper.restoreCursor();
    }

    onPaperClick(pt: Paint.Point) {
        var layers = this.paint.currentPaper.layers;

        if (layers.length <= 0)
            return;

        for (var i = layers.length - 1; i >= 0; i--) {
            var result = this.tryFindColor(layers[i], pt);

            if (result !== null) {
                this.paint.primaryColor = result;
                return;
            }
        }

        this.paint.primaryColor = window.Paint.Color.White;
    }

    private tryFindColor(layer: Paint.PaperLayer, pt: Paint.Point): Paint.Color {
        var col = layer.getCanvasMatrix().colorMatrix.getValue(pt.X, pt.Y);

        if (!col.equals(window.Paint.Color.White))
            return col;

        return null;
    }
}

exports.Extensions = new Array();
exports.Extensions.push(ColorPicker);