import React, { useState } from 'react';

const ToDo = () => {
  const [toDos, seToDos] = useState([
    { id: 1, text: 'Task1', status: 'todo' },
    { id: 2, text: 'Task2', status: 'todo' },
    { id: 3, text: 'Task3', status: 'done' },
  ]);

  const [newToDo, setNewTodo] = useState('');

  const handleAdd = () => {
    if (
      newToDo.trim() !== '' &&
      !toDos.some((item) => item.text === newToDo.trim())
    ) {
      const newid = toDos.length > 0 ? toDos[toDos.length - 1].id + 1 : 1;
      seToDos([...toDos, { id: newid, text: newToDo, status: 'todo' }]);
      setNewTodo('');
    }
  };

  const handleDelete = (id) => {
    const updatedTodos = toDos.filter((item) => item.id !== id);
    seToDos(updatedTodos);
  };

  // e.dataTransfer.setData('text/plain', JSON.stringify({ id })): This line sets the data that will be transferred during the drag operation. In this case, we're setting it as plain text ('text/plain'). We're using JSON.stringify({ id }) to convert the id into a JSON string. This is because setData expects a string, and JSON allows us to easily encode structured data like JavaScript objects into strings.
  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ id }));
  };

  // const updatedTodos = todos.map(todo => ...): This line updates the todos based on the dropped item. We use Array.map to iterate over the existing todos array (todos). For each todo item, we check if its ID matches the ID of the dropped todo (droppedTodo.id). If they match, we create a new todo object with the same properties as the original todo (...todo), but we update its status property to the status passed as an argument to handleDrop. If they don't match, we leave the todo unchanged.
  const handleDrop = (e, status) => {
    e.preventDefault();
    const droppedTodo = JSON.parse(e.dataTransfer.getData('text/plain'));
    const updatedTodo = toDos.map((todo) =>
      todo.id === droppedTodo.id ? { ...todo, status } : todo
    );
    seToDos(updatedTodo);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>To Do App</h1>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <h2> To Do</h2>
          <div
            onDrop={(e) => handleDrop(e, 'todo')}
            onDragOver={(e) => e.preventDefault()}
            style={{ border: '1px solid #eee' }}
          >
            {toDos.map(
              (todo) =>
                todo.status === 'todo' && (
                  <div
                    key={todo.id}
                    style={{ border: '1px solid #eee' }}
                    draggable
                    onDragStart={(e) => handleDragStart(e, todo.id)}
                  >
                    {todo.text}
                    <button onClick={() => handleDelete(todo.id)}>
                      Delete{' '}
                    </button>
                  </div>
                )
            )}
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <h2> Done</h2>
          <div
            onDrop={(e) => handleDrop(e, 'done')}
            onDragOver={(e) => e.preventDefault()}
            style={{ border: '1px solid #eee' }}
          >
            {toDos.map(
              (todo) =>
                todo.status === 'done' && (
                  <div
                    style={{ border: '1px solid #eee' }}
                    key={todo.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, todo.id)}
                  >
                    {todo.text}
                    <button onClick={() => handleDelete(todo.id)}>
                      Delete{' '}
                    </button>
                  </div>
                )
            )}
          </div>
        </div>
      </div>

      <div>
        <input type="text" placeholder="Add.."></input>
        <button onClick={handleAdd}>Add</button>
      </div>
    </div>
  );
};
export default ToDo;
