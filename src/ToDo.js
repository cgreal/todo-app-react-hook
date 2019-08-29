import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
class Todo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      edit: false,
      id: null,
      mockData: [
        {
          id: "1",
          title: "",
          done: null,
          date: new Date()
        }
      ]
    };
    this.getToDoItem = this.getToDoItem.bind(this);
    this.getToDoItem();
  }

  getToDoItem = () => {
    const getURL = "http://5d6190ac5f64870014060505.mockapi.io/api/v1/mockData";
    axios
      .get(getURL)
      .then(res => {
        this.setState({ mockData: res.data });
      })
      .catch(error => {
        console.log("Error fetching and parsing data", error);
      });
  };

  onSubmitHandle(event) {
    event.preventDefault();
    const addItemUrl =
      "http://5d6190ac5f64870014060505.mockapi.io/api/v1/mockData";

    axios
      .post(addItemUrl, {
        id: Date.now(),
        title: event.target.item.value,
        done: false
      })
      .then(() => {
        this.getToDoItem();
      })
      .catch(error => {
        console.log("Error fetching and parsing data", error);
      });
    event.target.item.value = "";
  }

  onDeleteHandle() {
    let id = arguments[0];
    const deleteItemUrl =
      "http://5d6190ac5f64870014060505.mockapi.io/api/v1/mockData/" + id;
    axios
      .delete(deleteItemUrl)
      .then(() => {
        this.getToDoItem();
      })
      .catch(error => {
        console.log("Error fetching and parsing data", error);
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
    let id = event.target.updatedItem.id;
    let updatedItem = "";
    const updateItemUrl =
      "http://5d6190ac5f64870014060505.mockapi.io/api/v1/mockData/" + id;

    updatedItem = {
      title: event.target.updatedItem.value,
      done: false
    };

    axios
      .put(updateItemUrl, updatedItem)
      .then(() => {
        this.getToDoItem();
      })
      .catch(error => {
        console.log("Error fetching and parsing data", error);
      });
    this.setState({
      edit: false
    });
  }

  onCompleteHandle(isDone) {
    let id = isDone;
    const updateItemUrl =
      "http://5d6190ac5f64870014060505.mockapi.io/api/v1/mockData/" + id;
    if (isDone) {
      axios
        .put(updateItemUrl, { done: true })
        .then(() => {
          this.getToDoItem();
        })
        .catch(error => {
          console.log("Error fetching and parsing data", error);
        });
    } else {
      this.getToDoItem();
    }
  }

  renderEditForm() {
    if (this.state.edit) {
      return (
        <div className="todo-input-wrapper">
          <form onSubmit={this.onUpdateHandle.bind(this)}>
            <input
              id={this.state.id}
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
              {Object.keys(this.state).map(i => this.state[i.title])}
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
                        onClick={this.onCompleteHandle.bind(
                          this,
                          (item.done = true),
                          item.id
                        )}
                        className="btn btn-item"
                        type="submit"
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
Todo.propTypes = {
  getToDoItem: PropTypes.func
};
export default Todo;
