import React from 'react';

export default (props) => {
    return (
        <div>
            <i className="far fa-frown"> {props.noRowsMessageFunc()}</i>
        </div>
    );
};

