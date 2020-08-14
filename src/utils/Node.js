//@flow

import type { node } from "./Types";

function Node<T>(
  leftChild: ?node<T>,
  rightChild: ?node<T>,
  key: T,
  data?: Object,
  height: number
): node<T> {
  this.leftChild = leftChild;
  this.rightChild = rightChild;
  this.key = key;
  this.data = data;
  this.height = height;
  this.computeHeight = () => {
    this.height =
      1 +
      Math.max(
        (leftChild || { height: -1 }).height,
        (rightChild || { height: -1 }).height
      );
  };

  return this;
}
export default Node;
