import props from '../../../../../utils/props.js';

function applyLayerMask(layer) {
    if (!layer.mask || !layer.mask.canvas) {
        return layer.canvas;
    }

    const layerCanvas = layer.canvas;
    const mask = layer.mask;

    // Result
    const result = document.createElement("canvas");
    result.width = layerCanvas.width;
    result.height = layerCanvas.height;

    const resultCtx = result.getContext("2d");
    resultCtx.drawImage(layerCanvas, 0, 0);

    // Full-size mask
    const fullMask = document.createElement("canvas");
    fullMask.width = layerCanvas.width;
    fullMask.height = layerCanvas.height;

    const maskCtx = fullMask.getContext("2d");

    // Fill outside mask
    const value = mask.defaultColor;
    maskCtx.fillStyle = `rgb(${value}, ${value}, ${value})`;
    maskCtx.fillRect(0, 0, fullMask.width, fullMask.height);

    // Draw PSD mask
    const x = mask.positionRelativeToLayer
    ? mask.left
    : mask.left - layer.left;

    const y = mask.positionRelativeToLayer
        ? mask.top
        : mask.top - layer.top;

    maskCtx.drawImage(mask.canvas, x, y);

    // Convert grayscale -> alpha
    const imageData = maskCtx.getImageData(
        0,
        0,
        fullMask.width,
        fullMask.height
    );

    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        const gray = data[i]; // R == G == B

        data[i] = 255;
        data[i + 1] = 255;
        data[i + 2] = 255;
        data[i + 3] = gray;
    }

    maskCtx.putImageData(imageData, 0, 0);

    // Apply mask
    resultCtx.globalCompositeOperation = "destination-in";
    resultCtx.drawImage(fullMask, 0, 0);
    resultCtx.globalCompositeOperation = "source-over";

    return result;
}

async function Index(nodeObj){
	const node = props.nodes[nodeObj.id];
	const layerCanvas = node.canvas;
	const maskCanvas = node.mask?.canvas;
	if(!layerCanvas || !maskCanvas) return;
    const layerMaskCanvas = applyLayerMask(node);
    const blobObj = await KIA.utils.dom.canvasToBlob(layerMaskCanvas, node.name);
    nodeObj.attributes.src = blobObj;
}

export default Index;