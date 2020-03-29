import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { TODO_API } from '../../core/api';

const DeleteItem = ({ setParentState, id, getData }) => {
    const removeToDoItem = id => {
        const deleteItemUrl = TODO_API + id;
        setParentState({
            isLoading: true
        });
        axios
            .delete(deleteItemUrl)
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
    };
    return (
        <>
            <button onClick={() => removeToDoItem(id)} className="btn btn-item" type="button">
                <span className="icon-remove" />
            </button>
        </>
    );
};
DeleteItem.propTypes = {
    setParentState: PropTypes.func
};

DeleteItem.defaultProps = {
    setParentState: () => {}
};
export default DeleteItem;
