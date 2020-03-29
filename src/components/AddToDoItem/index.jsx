import React from 'react';
import axios from 'axios';
import { TODO_API } from '../../core/api';

const AddToDo = ({ setParentState, getData }) => {
    const onSubmitHandler = event => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const value = formData.get('item');
        console.log(value);
        axios
            .post(TODO_API, {
                id: Date.now(),
                title: value,
                done: false
            })
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
                setParentState({
                    error: message,
                    isLoading: false
                });
            });
        event.target.item.value = '';
    };
    return (
        <>
            <form onSubmit={onSubmitHandler}>
                <input type="text" name="item" className="item" placeholder="Yapılacak iş ekleyin!" />
                <button className="btn btn-add-item icon-plus" type="submit" />
            </form>
        </>
    );
};

export default AddToDo;
