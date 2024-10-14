import {BinaryTreeNode} from './BinaryTreeNode.js';
import { config, drawNode, getReqdHeightWidth, connectEdges, treeConstructor } from './utils.js';

const canvas = document.querySelector('canvas');
const toggleButton = document.getElementById('theme-toggle');
const toggleIcon = document.getElementById('toggle-icon');

toggleButton.addEventListener('click', () => {
    config.currentTheme = config.currentTheme === 'light' ? 'dark' : 'light';
    
    if (config.currentTheme === 'dark') {
        toggleIcon.src = './light-mode.png';
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');  
    } else {
        toggleIcon.src = './dark mode.png'; 
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
    }

    if (prevValue) {
        init(prevValue); // Only redraw if there was previously a value
    } else {
        clearCanvas(); // Clear the canvas if no value is provided yet
    }
});

function drawBinaryTree(root, canvasElement) {
    const maxWidth = window.innerWidth;
    const maxHeight = window.innerHeight;

    // Set canvas dimensions to window size
    canvasElement.width = maxWidth;
    canvasElement.height = maxHeight;

    // Clear and reset the canvas with the correct background color
    const ctx = canvasElement.getContext('2d');
    const { canvasBackgroundColor } = config.themes[config.currentTheme];
    ctx.fillStyle = canvasBackgroundColor;
    ctx.fillRect(0, 0, maxWidth, maxHeight);

    const { canvasHeight, canvasWidth } = getReqdHeightWidth(root);

    const windowWidthCenter = maxWidth / 2;
    const reqdWidthCenter = canvasWidth / 2;

    const xStart = windowWidthCenter - reqdWidthCenter;
    const xEnd = windowWidthCenter + reqdWidthCenter;

    const horizontalConfig = { xStart, xEnd };

    recursiveDrawNode(root, canvasElement, 0.5, horizontalConfig); // Start drawing nodes
}

// Recursive function to draw each node and its connections
function recursiveDrawNode(root, canvasElement, currLevel, horizontalConfig) {
    const { xStart, xEnd } = horizontalConfig;

    const xPos = (xStart + xEnd) / 2;
    const yPos = currLevel * config.nodeHeight;

    drawNode(root.value, canvasElement, xPos, yPos); // Draw the node

    if (root.left !== null) {
        const leftNodeHorizontalConfig = { xStart, xEnd: xPos };
        recursiveDrawNode(root.left, canvasElement, currLevel + 1, leftNodeHorizontalConfig);
        connectEdges(canvasElement, 
            {
                xStart: xPos,
                xEnd: (xStart + xPos) / 2
            },
            {
                yStart: yPos + config.radius,
                yEnd: ((1 + currLevel) * config.nodeHeight) - config.radius
            }
        );
    }
    if (root.right !== null) {
        const rightNodeHorizontalConfig = { xStart: xPos, xEnd };
        recursiveDrawNode(root.right, canvasElement, currLevel + 1, rightNodeHorizontalConfig);
        connectEdges(canvasElement, 
            {
                xStart: xPos,
                xEnd: (xPos + xEnd) / 2
            },
            {
                yStart: yPos + config.radius,
                yEnd: ((1 + currLevel) * config.nodeHeight) - config.radius
            }
        )
    }
}


let prevValue = ''
function init(value) {
    prevValue = value;
    clearCanvas()
    const root = treeConstructor(value);
    drawBinaryTree(root, canvas)
}

function clearCanvas() {
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function resizeCanvas() {
    const maxWidth = window.innerWidth;
    const maxHeight = window.innerHeight;
    canvas.width = maxWidth;
    canvas.height = maxHeight;
}

const applyBtn = document.querySelector('.applyBtn');
const clearBtn = document.querySelector('.clearBtn');
const textarea = document.querySelector('textarea')

applyBtn.addEventListener('click', () => {
    if(textarea.value==='') return;
    init(textarea.value);
});
clearBtn.addEventListener('click', () => {
    textarea.value = '';
    clearCanvas()
})

document.addEventListener('DOMContentLoaded', () => {
    resizeCanvas();  // Adjust the canvas to fit the window size
    clearCanvas();   // Clear the canvas at the beginning

    // Optionally, set the background color immediately
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = config.themes[config.currentTheme].canvasBackgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
});
window.addEventListener('resize', () => {
    resizeCanvas();
    if (prevValue) {
        init(prevValue);  // Redraw the tree if a value was set
    }
})