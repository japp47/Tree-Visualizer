import {BinaryTreeNode} from './BinaryTreeNode.js'
import { config, drawNode, getReqdHeightWidth, connectEdges } from './utils.js';

const canvas = document.querySelector('canvas')
const toggleButton = document.getElementById('theme-toggle');
const toggleIcon = document.getElementById('toggle-icon');

toggleButton.addEventListener('click', () => {
    config.currentTheme = config.currentTheme === 'light' ? 'dark' : 'light';
    
    if (config.currentTheme === 'dark') {
        toggleIcon.src = '../assets/light-mode.png';  
    } else {
        toggleIcon.src = '../assets/dark mode.png'; 
    }

    drawBinaryTree(root, canvas);
});

function drawBinaryTree(root, canvasElement) {
    const maxWidth = window.innerWidth
    const maxHeight = window.innerHeight

    canvasElement.width = maxWidth;
    canvasElement.height = maxHeight;

    const ctx = canvasElement.getContext('2d');
    const { canvasBackgroundColor } = config.themes[config.currentTheme];
    ctx.fillStyle = canvasBackgroundColor;
    ctx.fillRect(0, 0, maxWidth, maxHeight);

    const { canvasHeight, canvasWidth } = getReqdHeightWidth(root);

    const windowWidthCenter = maxWidth/2;
    const reqdWidthCenter = canvasWidth/2;

    const xStart = windowWidthCenter-reqdWidthCenter;
    const xEnd = windowWidthCenter+reqdWidthCenter;

    const horizontalConfig = {xStart, xEnd};

    recursiveDrawNode(root, canvasElement, 0.5, horizontalConfig);
};
//1. Find Root node coordinates
//2. Draw node circle
//3. Recusrively draw children left and rtight
//4, Connect edges of node with left and right node
function recursiveDrawNode(root, canvasElement, currLevel, horizontalConfig) {
    const {xStart, xEnd} = horizontalConfig;

    const xPos = (xStart+xEnd)/2;
    const yPos = currLevel*config.nodeHeight;

    drawNode(root.value, canvasElement, xPos, yPos);

    if(root.left!==null) {
        const leftNodeHorizontalConfig =  {xStart, xEnd: xPos};
        recursiveDrawNode(root.left, canvasElement, currLevel+1, leftNodeHorizontalConfig);
        connectEdges(canvasElement, 
            {
                xStart: xPos,
                xEnd: (xStart+xPos)/2
            },
            {
                yStart: yPos+config.radius,
                yEnd: ((1+currLevel)*config.nodeHeight)-config.radius
            }
        )
    }
    if(root.right!==null) {
        const rightNodeHorizontalConfig =  {xStart: xPos, xEnd};
        recursiveDrawNode(root.right, canvasElement, currLevel+1, rightNodeHorizontalConfig);
        connectEdges(canvasElement, 
            {
                xStart: xPos,
                xEnd: (xPos+xEnd)/2
            },
            {
                yStart: yPos+config.radius,
                yEnd: ((1+currLevel)*config.nodeHeight)-config.radius
            }
        )
    }
}

const root = new BinaryTreeNode(1);

const node2 = new BinaryTreeNode(2);
root.setLeft(node2)
const node3 = new BinaryTreeNode(3);
root.setRight(node3)
const node4 = new BinaryTreeNode(4);
node3.setRight(node4)

drawBinaryTree(root, canvas);