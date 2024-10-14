export class BinaryTreeNode {
    value = null;
    left = null;
    right = null;
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
    setLeft(node) {
        this.left = node;
    }

    setRight(node) {
        this.right = node;
    }

    getHeight() {
        const leftHt = this.left?.getHeight();
        const rightHt = this.right?.getHeight();
        return Math.max(leftHt || 0, rightHt || 0) +1;
    }

}