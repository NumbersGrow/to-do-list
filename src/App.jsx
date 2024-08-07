import React, { useState, useEffect } from "react";
import "./App.scss";
import Button from "./components/Button/Button.jsx";

import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";

function App() {
  const [isCompletedScreen, setIsCompletedScreen] = useState(false);
  const [allTodos, setAllTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTasks, setCompletedTasks] = useState([]);
  const [editTask, setEditTask] = useState("");
  const [editUpdatedTask, setEditUpdatedTask] = useState("");

  const handleCompletedTask = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let hh = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn =
      dd + "-" + mm + "-" + yyyy + " at " + hh + ":" + m + ":" + s;

    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn,
    };

    let updatedCompletedArr = [...completedTasks];
    updatedCompletedArr.push(filteredItem);
    setCompletedTasks(updatedCompletedArr);
    handleDeleteTask(index);
    localStorage.setItem("completedTodos", JSON.stringify(updatedCompletedArr));
  };

  const handleAddTask = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
    };

    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setAllTodos(updatedTodoArr);
    setNewTitle("");
    setNewDescription("");
    localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));
  };

  const handleDeleteTask = (index) => {
    let reducedTodoList = [...allTodos];
    reducedTodoList.splice(index, 1);

    localStorage.setItem("todolist", JSON.stringify(reducedTodoList));
    setAllTodos(reducedTodoList);
  };

  const handleDeleteCompletedTask = (index) => {
    let reducedCompletedList = [...completedTasks];
    reducedCompletedList.splice(index, 1);
    localStorage.setItem(
      "completedTodos",
      JSON.stringify(reducedCompletedList)
    );
    setCompletedTasks(reducedCompletedList);
  };

  const handleEdit = (ind, item) => {
    console.log(ind);
    setEditTask(ind);
    setEditUpdatedTask(item);
  };

  const handleEditTitle = (value) => {
    setEditUpdatedTask((prev) => {
      return { ...prev, title: value };
    });
  };

  const handleEditDescription = (value) => {
    setEditUpdatedTask((prev) => {
      return { ...prev, description: value };
    });
  };

const handleUpdate = () => {
let newTodo = [...allTodos];
newTodo[editTask] = editUpdatedTask;
setAllTodos(newTodo);
setEditTask("");


}

  useEffect(() => {
    let storageTodo = JSON.parse(localStorage.getItem("todolist"));
    let storageCompletedTodo = JSON.parse(
      localStorage.getItem("completedTodos")
    );

    if (storageTodo) {
      setAllTodos(storageTodo);
    }
    if (storageCompletedTodo) {
      setCompletedTasks(storageCompletedTodo);
    }
  }, []);

  return (
    <div className="App">
      <header className="header">
        <h1>TO DO LIST</h1>
      </header>
      <div className="to-do-wrapper">
        <div className="to-do-input">
          <div className="to-do-input__item">
            <label className="to-do-input__item-label">Title:</label>
            <input
              type="text"
              className="to-do-input__item-text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="What is a title?"
            ></input>
          </div>
          <div className="to-do-input__item">
            <label className="to-do-input__item-label">Description:</label>
            <input
              type="text"
              className="to-do-input__item-text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="What is a description?"
            ></input>
          </div>
          <div className="to-do-input__item">
            <Button
              className="btn"
              onClick={handleAddTask}
              type="reset"
              text="Add"
            />
          </div>
        </div>
        <div className="btn-wrapper">
          <Button
            className={`btn ${isCompletedScreen === false && "btn__active"}`}
            onClick={() => setIsCompletedScreen(false)}
            text="To Do List"
          />
          <Button
            className={`btn ${isCompletedScreen === true && "btn__active"}`}
            onClick={() => setIsCompletedScreen(true)}
            text="Completed"
          />
        </div>

        <div className="list-wrapper">
          {isCompletedScreen === false &&
            allTodos.map((item, index) => {
              if (editTask === index) {
                return (
                  <div className="edit-wrapper" key={index}>
                    <input
                      className="edit-wrapper__title"
                      placeholder="Edit Title"
                      onChange={(e) => handleEditTitle(e.target.value)}
                      value={editUpdatedTask.title}
                    />
                    <textarea
                      className="edit-wrapper__description"
                      rows={4}
                      placeholder="Edit Description"
                      onChange={(e) => handleEditDescription(e.target.value)}
                      value={editUpdatedTask.description}
                    />
                    <Button
                      className="btn"
                      onClick={handleUpdate}
                      type="button"
                      text="Update"
                    />
                  </div>
                );
              } else {
                return (
                  <div className="list-wrapper__item" key={index}>
                    <div className="list-wrapper__item-text">
                      <h3 className="list-wrapper__item-text__title">
                        {item.title}
                      </h3>
                      <p className="list-wrapper__item-text__description">
                        {item.description}
                      </p>
                    </div>
                    <div className="list-wrapper__item-icon">
                      <AiOutlineDelete
                        className="list-wrapper__item-icon__delete"
                        onClick={() => handleDeleteTask(index)}
                        title="Delete"
                      />
                      <BsCheckLg
                        className="list-wrapper__item-icon__check"
                        onClick={() => handleCompletedTask(index)}
                        title="Complete"
                      />
                      <AiOutlineEdit
                        className="list-wrapper__item-icon__check"
                        onClick={() => handleEdit(index, item)}
                        title="Complete"
                      />
                    </div>
                  </div>
                );
              }
            })}

          {isCompletedScreen === true &&
            completedTasks.map((item, index) => {
              return (
                <div className="list-wrapper__item" key={index}>
                  <div className="list-wrapper__item-text">
                    <h3 className="list-wrapper__item-text__title">
                      {item.title}
                    </h3>
                    <p className="list-wrapper__item-text__description">
                      {item.description}
                    </p>
                    <p className="list-wrapper__item-text__time">
                      Completed on : {item.completedOn}
                    </p>
                  </div>
                  <div className="list-wrapper__item-icon">
                    <AiOutlineDelete
                      className="list-wrapper__item-icon__delete"
                      onClick={() => handleDeleteCompletedTask(index)}
                      title="Delete"
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
