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

  const handleAddTask = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
    };

    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setAllTodos(updatedTodoArr);
    localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));
  };

  const handleDeleteTask = (index) => {
    let reducedTodoList = [...allTodos];
    reducedTodoList.splice(index);

    localStorage.setItem("todolist", JSON.stringify(reducedTodoList));
    setAllTodos(reducedTodoList);
  }

  useEffect(() => {
    let storageTodo = JSON.parse(localStorage.getItem("todolist"));
    if (storageTodo) {
      setAllTodos(storageTodo);
        }
  },[]);

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
            <Button className="btn" onClick={handleAddTask} text="Add" />
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
          {allTodos.map((item, index) => {
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
                    onClick={()=> handleDeleteTask(index)}
                    title="Delete"
                  />
                  <BsCheckLg
                    className="list-wrapper__item-icon__check"
                    title="Complete"
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
