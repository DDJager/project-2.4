import React from 'react';

export default (field) => {
    const {error, touched} = field.meta;
    return (
        <div>
            <label>{field.label}</label>
            <input
                type={field.type}
                {...field.input}
            />
            {touched ? error : ''}
        </div>
    );
};
