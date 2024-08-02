import React, {useState} from "react";
import "./App.scss";
import Button from "./components/Button/Button.jsx";

function App() {
  const [isCompletedScreen, setIsCompletedScreen] = useState(false);
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
              placeholder="What is a title?"
            ></input>
          </div>
          <div className="to-do-input__item">
            <label className="to-do-input__item-label">Description:</label>
            <input
              type="text"
              className="to-do-input__item-text"
              placeholder="What is a description?"
            ></input>
          </div>
          <div className="to-do-input__item">
            <Button className="btn" text="Add" />
          </div>
        </div>
        <div className="btn-wrapper">
          <Button className= {`btn ${isCompletedScreen === false && "active"}`} onClick={()=>setIsCompletedScreen(false)} text="To Do List" />
          <Button className={`btn ${isCompletedScreen === true && "active"}`} onClick={()=>setIsCompletedScreen(true)} text="Completed" />
        </div>

        <div className="list-wrapper">
          <h3>Task 1</h3>
          <p>Description</p>
        </div>
      </div>
    </div>
  );
}

export default App;
