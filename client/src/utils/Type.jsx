import React from 'react';
import Checkbox from 'rc-checkbox';
import 'rc-checkbox/assets/index.css';

const Type = ({type,id,handleCheckbox}) => {
    return (
    <label className='text-sm font-medium text-black-600'>
    <Checkbox name={type.name} id={id} checked={type.checked}
    onChange={(e)=>handleCheckbox(e)}/>
        &nbsp;{type.name}
    </label>);
}

export default Type;