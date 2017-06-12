import React from 'react';

const Achievement = (props)=> {
    return (
        <div>
            <img src={props.image}/><br/>
            {props.name}
        </div>
    )
};

export default Achievement;