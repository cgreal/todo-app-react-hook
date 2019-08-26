import React, { Component } from "react";

class Todo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      edit: false,
      id: null,
      mockData: [
        {
          id: "1",
          title: "Default todo list item",
          done: false,
          date: new Date()
        }
      ]
    };
  }

  //   this.apiUrl = '//57b1924b46b57d1100a3c3f8.mockapi.io/api/todos'

  onSubmitHandle(event) {
    event.preventDefault();

    this.setState({
      mockData: [
        ...this.state.mockData,
        {
          id: Date.now(),
          title: event.target.item.value,
          done: false,
          date: new Date()
        }
      ]
    });

    event.target.item.value = "";
  }

  onDeleteHandle() {
    let id = arguments[0];

    this.setState({
      mockData: this.state.mockData.filter(item => {
        if (item.id !== id) {
          return item;
        }
      })
    });
  }

  onEditHandle(event) {
    this.setState({
      edit: true,
      id: arguments[0],
      title: arguments[1]
    });
  }

  onUpdateHandle(event) {
    event.preventDefault();

    this.setState({
      mockData: this.state.mockData.map(item => {
        if (item.id === this.state.id) {
          item["title"] = event.target.updatedItem.value;
          return item;
        }

        return item;
      })
    });

    this.setState({
      edit: false
    });
  }

  onCompleteHandle() {
    let id = arguments[0];

    this.setState({
      mockData: this.state.mockData.map(item => {
        if (item.id === id) {
          item["done"] = true;
          return item;
        }

        return item;
      })
    });
  }

  renderEditForm() {
    if (this.state.edit) {
      return (
        <div className="todo-input-wrapper">
          <form onSubmit={this.onUpdateHandle.bind(this)}>
            <input
              type="text"
              name="updatedItem"
              className="item"
              defaultValue={this.state.title}
            />
            <button className="btn btn-item review">Güncelle</button>
          </form>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="container">
        <div className="todo-container">
          <div className="todo-input-wrapper">
            <form onSubmit={this.onSubmitHandle.bind(this)}>
              <input
                type="text"
                name="item"
                className="item"
                placeholder="Yapılacak iş ekleyin!"
              />
              <button className="btn btn-add-item icon-plus"></button>
            </form>
          </div>
          {this.renderEditForm()}
          <div className="todo-list-wrapper">
            <ul className="item-wrapper">
              {this.state.mockData.map(item => (
                <li
                  key={item.id}
                  className={item.done ? " list-item done" : "list-item hidden"}
                >
                  <div className="d-flex item-row">
                    <div className="col">{item.title}</div>
                    <div className="col">
                      <button
                        onClick={this.onDeleteHandle.bind(this, item.id)}
                        className="btn btn-item"
                      >
                        <span className="icon-remove"></span>
                      </button>
                      <button
                        onClick={this.onEditHandle.bind(
                          this,
                          item.id,
                          item.title
                        )}
                        className="btn btn-item"
                      >
                        <span className="icon-update"></span>
                      </button>
                      <button
                        onClick={this.onCompleteHandle.bind(this, item.id)}
                        className="btn btn-item"
                      >
                        <span className="icon-complete"></span>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Todo;
