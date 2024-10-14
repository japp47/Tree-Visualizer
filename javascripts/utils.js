export const config = {
    radius: 20,
    nodeWidth: 50,
    nodeHeight: 90,
    fontSize: 10,
    themes: {
        light: {
            nodeFillColor: 'lightsalmon',
            nodeBorderColor: 'brown',
            fontColor: 'brown',
            canvasBackgroundColor: '#fbf8e8'
        },
        dark: {
            nodeFillColor: 'lightblue',
            nodeBorderColor: 'darkblue',
            fontColor: 'darkblue',
            canvasBackgroundColor: '#13002b'
        }
    },
    currentTheme: 'light'
};

export function getReqdHeightWidth(root) {
    const heightTree = root.getHeight();
    const widthTree = Math.pow(2, heightTree);

    const canvasHeight = heightTree*config.nodeHeight;
    const canvasWidth = widthTree*config.nodeWidth;
    return{
        canvasHeight,
        canvasWidth
    }
}

export function drawNode(value, canvasElement, x, y) {
    const ctx = canvasElement.getContext('2d');

    const { nodeFillColor, nodeBorderColor, fontColor } = config.themes[config.currentTheme];

    // Draw the node (circle)
    ctx.beginPath();
    ctx.arc(x, y, config.radius, 0, 2 * Math.PI);
    ctx.fillStyle = nodeFillColor;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x, y, config.radius, 0, 2 * Math.PI);
    ctx.strokeStyle = nodeBorderColor; 
    ctx.stroke();

    // Draw the text inside the node
    ctx.font = `${config.fontSize}pt serif`;
    ctx.fillStyle = fontColor; // Use font color from the current theme
    ctx.textAlign = 'center';
    ctx.fillText(value, x, y + config.fontSize / 2);
}

export function connectEdges(canvasElement, xCoord, yCoord) {
    const {xStart, xEnd} = xCoord;
    const {yStart, yEnd} = yCoord;

    const xHalf = (xStart+xEnd)/2;
    const yHalf = (yStart + yEnd)/2;

    const start = {x: xStart, y: yStart}
    //beizure curve
    const cPoint1 = {x: xHalf, y: yHalf};
    const cPoint2 = {x: xEnd, y: yHalf};
    const end = {x: xEnd, y: yEnd}

    const { nodeFillColor, nodeBorderColor } = config.themes[config.currentTheme];
    const ctx = canvasElement.getContext('2d');
    ctx.beginPath();
    ctx.strokeStyle = config.currentTheme === 'light' ? nodeBorderColor : nodeFillColor;
    ctx.moveTo(start.x, start.y);
    ctx.bezierCurveTo(cPoint1.x, cPoint1.y, cPoint2.x, cPoint2.y, end.x, end.y);
    ctx.stroke();

}