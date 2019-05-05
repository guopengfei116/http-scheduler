import QueuePriority from '../../src/queue-priority';

const queuePriority = new QueuePriority();

const testCase = [
  [3, [1,2,3]],
  [5, [4,5,6]],
  [5, [6,6,6]],
  [1, [8,8,8]],
  [1, [9,8,8]],
  [0, [0,0,0]],
];

// enqueue test
testCase.forEach(item => {
  queuePriority.enqueue(item[0], item[1]);
});

console.log('-----------------输出队列内容----------------');
console.log(queuePriority.queue);
console.log(`队列长度：${queuePriority.queue.length}，预期长度：${testCase.length}`);
console.log('-----------------输出队列内容----------------');

// dequeue test
testCase.forEach((v, i) => {
  const item = queuePriority.dequeue();
  console.log(`出队-${i}: ${JSON.stringify(item)}`);
});

console.log('-----------------输出队列内容----------------');
console.log(queuePriority.queue);
console.log(`队列长度：${queuePriority.queue.length}，预期长度：0`);
console.log('-----------------输出队列内容----------------');
