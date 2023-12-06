import React, { useState } from "react";
import { addTodo, deleteTodo, editTodo } from "./redux/slices/todoSlice";
import { useSelector, useDispatch } from "react-redux";

const App = () => {
  const { todos } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (isEdit) {
      dispatch(editTodo({ id: editId, text: editText }));
      setEditId(null);
      setEditText("");
      setIsEdit(false);
    } else {
      dispatch(addTodo(text));
      setText("");
    }
  };

  const deleteTodoHandler = (id) => {
    dispatch(deleteTodo(id));
  };

  const editTodoHandler = (todo) => {
    setIsEdit(true);
    setEditId(todo.id);
    setEditText(todo.text);
  };

  return (
    <div className="flex items-center justify-center flex-col w-96 shadow mx-auto m-2 sm:mt-8 py-4">
      <div className="text-2xl font-semibold pb-4">
        {isEdit ? "Edit Todo" : "Add Todo"}
      </div>
      <form
        onSubmit={handleAddTodo}
        className="w-full px-8 flex items-start my-3 gap-2.5"
      >
        <input
          type="text"
          placeholder="add todo.."
          className="outline-none  w-full border p-2 rounded focus:border-blue-500"
          value={isEdit ? editText : text}
          onChange={(e) =>
            isEdit ? setEditText(e.target.value) : setText(e.target.value)
          }
        />
        <button className="bg-green-500 px-2 py-2 rounded text-white">
          {isEdit ? "Edit" : "Add"}
        </button>
      </form>
      <div className="text-2xl font-semibold pb-4">My Todos</div>
      {todos && todos.length > 0 ? (
        todos.map((todo) => {
          return (
            <div
              key={todo.id}
              className="flex w-full px-8 items-center justify-between gap-3 mb-3"
            >
              <div className="font-semibold">{todo.text}</div>
              <div className="flex gap-3">
                <button
                  type="button"
                  className="bg-red-500 px-2 py-1 rounded text-white"
                  onClick={() => deleteTodoHandler(todo.id)}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="bg-blue-500 px-2 py-1 rounded text-white"
                  onClick={() => editTodoHandler(todo)}
                >
                  Edit
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-red-500 font-semibold text-center">
          You have not add Todo Yet
        </div>
      )}
    </div>
  );
};

export default App;
