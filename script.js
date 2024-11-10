class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(arr) {
        this.root = this.sortArray(arr);
    }

    buildTree(arr, start, end) {
        if (start > end) return null;

        // Find the middle element
        let mid = start + Math.floor((end - start) / 2);

        // Create root node
        let root = new Node(arr[mid]);

        // Create left subtree
        root.left = this.buildTree(arr, start, mid - 1);

        // Create right subtree
        root.right = this.buildTree(arr, mid + 1, end);

        return root;
    }

    sortArray(arr) {
        arr = [...new Set(arr)]; // remove duplicates
        arr = arr.sort((a, b) => a - b); // sort array
        return this.buildTree(arr, 0, arr.length - 1);
    }

    prettyPrint(node, prefix = "", isLeft = true) { // tree visualisation
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }

    insert(root, value) {

        if (root === null) {
            return new Node(value);
        }

        // duplicates not allowed
        if (root.value === value) {
            return root;
        }

        if (value < root.value) {
            root.left = this.insert(root.left, value);
        } else if (value > root.value) {
            root.right = this.insert(root.right, value);
        }

        return root;
    }

    deleteItem(root, x) {

        if (root === null) {
            return root;
        }

        // if value to be searched is in a subtree
        if (root.value > x) {
            root.left = this.deleteItem(root.left, x);
        } else if (root.value < x) {
            root.right = this.deleteItem(root.right, x);
        } else { // if root matches with the given value

            // cases when root has 0 children or only right child
            if (root.left === null) {
                return root.right;
            }

            // when root has only left child
            if (root.right === null)
                return root.left;

            // when both children are present
            let succ = this.getSuccessor(root);
            root.value = succ.value;
            root.right = this.deleteItem(root.right, succ.value);
        }
        return root;
    }

    getSuccessor(curr) {
        curr = curr.right;
        while (curr !== null && curr.left !== null) {
            curr = curr.left;
        }
        return curr;
    }
}

let testArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const tree = new Tree(testArr);
console.log(tree);
tree.root = tree.deleteItem(tree.root, 4); // Inserting 2 into the tree
tree.root = tree.insert(tree.root, 2); // Inserting 2 into the tree
tree.prettyPrint(tree.root);  // Calling the method to print the tree