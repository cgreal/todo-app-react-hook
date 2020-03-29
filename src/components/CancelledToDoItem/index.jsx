import React from 'react';
import axios from 'axios';
import { TODO_API } from '../../core/api';

const CancelledItem = ({ id, setParentState, getData }) => {
    const cancelledItemHandler = () => {
        const updateItemUrl = TODO_API + id;
        setParentState({
            isLoading: true
        });
        axios
            .put(updateItemUrl, { done: true })
            .then(() => {
                getData();
                setParentState({
                    isLoading: true
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
                setParentState({
                    error: message,
                    isLoading: false
                });
            });
    };
    return (
        <>
            <button onClick={() => cancelledItemHandler(id)} className="btn btn-item" type="button">
                <span className="icon-cancel" />
            </button>
        </>
    );
};

export default CancelledItem;
