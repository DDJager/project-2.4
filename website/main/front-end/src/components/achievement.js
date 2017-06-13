import React from 'react';

const Achievement = (props)=> {
    return (
        <div>
            <img src={props.image} alt={props.name}/><br/>
            {props.name}
        </div>
    )
};

export default Achievement;