/**
 * @Class 优先队列
 * 
 * 提供入队出队操作，出队时按照权重执行，要求每个item提供一个权重。
 * 保证优先级的方式主要有三种：1、只在出队时查找 2、只在入队时排序 3、入队和出队都做处理
 * 
 * @Interface
 * enqueue：入队操作
 * dequeue：出队操作
 * onEnqueue：入队事件
 * 
 */
import { binarySearch } from './util';

// production queueItem
const PRIORITY_NAME = 'priority';
const itemFactory = (priority, item) => {
  return {
    [PRIORITY_NAME]: priority,
    item,
  };
}

// binarySearch using
const valueHook = item => item && item[PRIORITY_NAME];

export default class QueuePriority {

  queue = [];

  enqueue(priority, item) {
    const queueItem = itemFactory(priority, item);

    // empty
    if (this.isEmpty()) return this.queue.push(queueItem);

    // order enqueue
    const searchResult = binarySearch(this.queue, priority, 0, this.queue.length - 1, false, valueHook);
    if (searchResult.index === Infinity) this.queue.push(queueItem);
    else if (searchResult.index === -Infinity) this.queue.unshift(queueItem);
    else this.queue.splice(searchResult.index + 1, 0, queueItem);
  }

  dequeue() {
    const queueItem = this.queue.pop();
    return queueItem && queueItem.item;
  }

  isEmpty() {
    return this.queue.length === 0;
  }

}
