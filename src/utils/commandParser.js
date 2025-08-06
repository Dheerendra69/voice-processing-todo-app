const parseCommand = (text) => {
  const cleaned = text.trim().toLowerCase();

  if (cleaned.startsWith('add task')) {
    return {
      action: 'add',
      task: cleaned.replace('add task', '').trim(),
    };
  }

  if (cleaned.startsWith('delete task')) {
    return {
      action: 'delete',
      task: cleaned.replace('delete task', '').trim(),
    };
  }

  return { action: null, task: null };
};

export default parseCommand;
