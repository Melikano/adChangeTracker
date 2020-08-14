//@flow

import type { node, bst } from "./Types";
import Node from "./Node";

type comparisonFunction<T> = {|
  +gt: (T, T) => boolean,
  +eq: (T, T) => boolean,
|};

export function BST<T>({ gt, eq }: comparisonFunction<T>): bst<T> {
  this.root = null;

  this.insert = (key: T, data?: Object) => {
    const newNode = new Node(null, null, key, data, 0);
    !this.root ? (this.root = newNode) : insertNode(this.root, newNode);
  };

  const insertNode = (recRoot: node<T>, newNode: node<T>) => {
    if (gt(newNode.key, recRoot.key)) {
      if (!recRoot.rightChild) {
        recRoot.rightChild = newNode;
      } else {
        insertNode(recRoot.rightChild, newNode);
      }
    } else {
      if (!recRoot.leftChild) {
        recRoot.leftChild = newNode;
      } else {
        insertNode(recRoot.leftChild, newNode);
      }
    }

    recRoot.computeHeight();

    const [leftH, rightH] = computeBalance(recRoot);
    if (Math.abs(leftH - rightH) > 2) recRoot = AVLify(recRoot, leftH, rightH);
  };

  const computeBalance = (root: node<T>) => {
    const leftHeight = (root.leftChild || { height: -1 }).height;
    const rightHeight = (root.rightChild || { height: -1 }).height;
    return [leftHeight, rightHeight];
  };

  const AVLify = (root: node<T>, leftHeight: number, rightHeight: number) => {
    if (leftHeight > rightHeight) {
      const [childLeftH, childRightH] = computeBalance(root.leftChild);
      if (childLeftH > childRightH) {
        return rightRotate(root);
      } else {
        root.leftChild = leftRotate(root.leftChild);
        return rightRotate(root);
      }
    }
    const [childLeftH, childRightH] = computeBalance(root.rightChild);
    if (childRightH > childLeftH) {
      return leftRotate(root);
    } else {
      root.rightChild = rightRotate(root.rightChild);
      return leftRotate(root);
    }
  };

  const leftRotate = (root: node<T>) => {
    const repNode = new Node(
      root.leftChild,
      root.rightChild.leftChild,
      root.key,
      root.data,
      root.height
    );
    root.rightChild.leftChild = repNode;
    return repNode;
  };

  const rightRotate = (root: node<T>) => {
    const repNode = new Node(
      root.leftChild.rightChild,
      root.rightChild,
      root.key,
      root.data,
      root.height
    );
    root.leftChild.rightChild = repNode;
    return repNode;
  };

  this.search = (key: T) => {
    return searchNodes(this.root, key);
  };

  const searchNodes = (recRoot: node<T>, key: T) => {
    if (recRoot) {
      if (gt(recRoot.key, key)) {
        return searchNodes(recRoot.leftChild, key);
      }
      if (eq(recRoot.key, key)) {
        return [
          recRoot.data,
          ...searchNodes(recRoot.rightChild, key),
          ...searchNodes(recRoot.leftChild, key),
        ];
      } else {
        return searchNodes(recRoot.rightChild, key);
      }
    }

    return [];
  };

  this.filter = (key: T) => {
    return filterNodes(this.root, key);
  };

  const filterNodes = (recRoot: node<T>, key: T) => {
    if (recRoot) {
      if (gt(key, recRoot.key)) {
        return [
          ...traverseNodes(recRoot.leftChild),
          filterNodes(recRoot.rightChild, key),
        ];
      }
      return filterNodes(recRoot.leftChild, key);
    }

    return [];
  };

  this.traverse = () => {
    return traverseNodes(this.root);
  };
  
  const traverseNodes = (recRoot: node<T>) => {
    if (recRoot) {
      return [
        ...traverseNodes(recRoot.leftChild),
        recRoot.data,
        ...traverseNodes(recRoot.rightChild),
      ];
    }
    return [];
  };

  return this;
}
