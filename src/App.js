import React, { Component } from "react";
import "./assets/styles/styles.scss";

import ToDoList from "./ToDo";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false
    };
  }

  render() {
    return (
      <div className="App">
        <ToDoList />
      </div>
    );
  }
}

export default App;
