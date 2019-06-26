export const autoCancel = (() => {
  const preTask = {};

  return (task, idGenerator) => {
    let taskId;

    try {
      if (typeof idGenerator === 'function') taskId = idGenerator(task);
      else taskId = task.id || JSON.stringify(task.params);

      if (taskId) {
        if (preTask[taskId]) preTask[taskId].abort();
        preTask[taskId] = task;
      }
    } catch(e) {}

    return task;
  };
})();
