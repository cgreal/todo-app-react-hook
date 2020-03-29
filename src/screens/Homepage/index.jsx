import React, { useCallback, useEffect, useReducer, useRef } from 'react';
import axios from 'axios';
import AddToDo from '../../components/AddToDoItem';
import { TODO_API } from '../../core/api';
import Loading from '../../components/common/Loading';
import DeleteItem from '../../components/DeleteToDoItem';
import CancelledItem from '../../components/CancelledToDoItem';

const HomePage = () => {
    const [state, setState] = useReducer((currentState, newState) => ({ ...currentState, ...newState }), {
        editableObjId: null,
        data: [],
        isLoading: true
    });
    const { editableObjId, data, isLoading } = state;
    const newValueinputEl = useRef(null);

    const getData = useCallback(() => {
        setState({
            isLoading: true
        });
        axios
            .get(TODO_API)
            .then(res => {
                setState({
                    data: res.data,
                    isLoading: false,
                    editableObjId: null
                });
            })
            .catch(err => {
                const { message } =
                    err &&
                    err.response &&
                    err.response.data &&
                    err.response.data.errors &&
                    err.response.data.errors.length > 0
                        ? err.response.data.errors[0]
                        : err;
                setState({
                    error: message,
                    isLoading: false
                });
            });
        return false;
    }, []);

    useEffect(() => {
        getData();
    }, [getData]);

    const updateValueHandler = editableItem => {
        const updateItemUrl = TODO_API + editableItem;

        const updatedItem = {
            title: newValueinputEl.current.value,
            done: false
        };

        axios
            .put(updateItemUrl, updatedItem)
            .then(() => {
                getData();
            })
            .catch(err => {
                const { message } =
                    err &&
                    err.response &&
                    err.response.data &&
                    err.response.data.errors &&
                    err.response.data.errors.length > 0
                        ? err.response.data.errors[0]
                        : err;
                setState({
                    error: message,
                    isLoading: false
                });
            });
    };
    const clickUpdateButtonHandler = itemId => {
        setState({
            editableObjId: itemId
        });
    };
    return (
        <div className="container">
            <div className="todo-container">
                <div className="todo-input-wrapper text-center">
                    <AddToDo setParentState={setState} getData={getData} />
                </div>
                {isLoading && <Loading />}
                <ul className="item-wrapper">
                    {data &&
                        !isLoading &&
                        data.map(item => (
                            <li key={item.id} className={item.done ? ' list-item cancel' : 'list-item'}>
                                <div className="row m-0 item-row">
                                    <div className="col">
                                        {editableObjId === item.id ? (
                                            <div className={editableObjId ? `d-flex` : `d-none`}>
                                                <input
                                                    type="text"
                                                    name="newValueinputEl"
                                                    className="item"
                                                    defaultValue={item.title}
                                                    ref={newValueinputEl}
                                                />
                                                <button
                                                    className="btn"
                                                    type="button"
                                                    onClick={() => updateValueHandler(item.id)}
                                                >
                                                    Kaydet
                                                </button>
                                            </div>
                                        ) : (
                                            item.title
                                        )}
                                    </div>
                                    <button
                                        onClick={() => clickUpdateButtonHandler(item.id)}
                                        className="btn btn-item"
                                        type="button"
                                    >
                                        <span className="icon-update" />
                                    </button>
                                    <DeleteItem id={item.id} setParentState={setState} getData={getData} />
                                    <CancelledItem id={item.id} setParentState={setState} getData={getData} />
                                </div>
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
};

export default HomePage;
