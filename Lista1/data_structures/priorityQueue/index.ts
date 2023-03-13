export class PriorityQueue<T> {
  private heap: { priority: number; value: T }[] = [];

  private getParentIndex(index: number): number {
    return Math.floor((index - 1) / 2);
  }

  private getLeftChildIndex(index: number): number {
    return 2 * index + 1;
  }

  private getRightChildIndex(index: number): number {
    return 2 * index + 2;
  }

  private swap(index1: number, index2: number): void {
    const temp = this.heap[index1];
    this.heap[index1] = this.heap[index2];
    this.heap[index2] = temp;
  }

  private siftUp(index: number): void {
    if (index === 0) {
      return;
    }
    const parentIndex = this.getParentIndex(index);
    if (this.heap[parentIndex].priority > this.heap[index].priority) {
      this.swap(index, parentIndex);
      this.siftUp(parentIndex);
    }
  }

  private siftDown(index: number): void {
    const leftChildIndex = this.getLeftChildIndex(index);
    const rightChildIndex = this.getRightChildIndex(index);
    let minIndex = index;
    if (
      leftChildIndex < this.heap.length &&
      this.heap[leftChildIndex].priority < this.heap[minIndex].priority
    ) {
      minIndex = leftChildIndex;
    }
    if (
      rightChildIndex < this.heap.length &&
      this.heap[rightChildIndex].priority < this.heap[minIndex].priority
    ) {
      minIndex = rightChildIndex;
    }
    if (index !== minIndex) {
      this.swap(index, minIndex);
      this.siftDown(minIndex);
    }
  }

  public enqueue(value: T, priority: number): void {
    this.heap.push({ value, priority });
    this.siftUp(this.heap.length - 1);
  }

  public dequeue(): T | undefined {
    if (this.heap.length === 0) {
      return undefined;
    }
    const minValue = this.heap[0].value;
    const lastIndex = this.heap.length - 1;
    this.heap[0] = this.heap[lastIndex];
    this.heap.pop();
    this.siftDown(0);
    return minValue;
  }

  public get length(): number {
    return this.heap.length;
  }

  public isEmpty(): boolean {
    return this.heap.length === 0;
  }
}
