
import './App.css';
import Button from "./components/Button/Button.jsx";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          TO DO LIST
        </h1>
      </header>
      <div className="to-do-wrapper">
        <div className="to-do-item"> 
          <label className="label">Title:</label>
          <input type="text" className="input" placeholder="What is a title?"></input>
        </div>
        <div className="to-do-item"> 
          <label className="label">Description:</label>
          <input type="text" className="input" placeholder="What is a description?"></input>
        </div>
        <div className="to-do-item"> 
          <Button className="btn btn-add" text="Add"/>
        </div>
      </div>
      
      <div className="btn-wrapper">
        <Button className="btn btn-todo" text="To Do List"/>
        <Button className="btn btn-completed" text="Completed"/>
      </div>

      <div className="list-wrapper">
        <h3>Task 1</h3>
        <p>Description</p>
      </div>
    </div>

  );
}

export default App;
