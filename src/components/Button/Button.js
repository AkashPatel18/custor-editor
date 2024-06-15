import React from 'react';
import './Button.css';

const Button = ({onSave}) => {
   
  return (
    <button className="dotted-button" onClick={onSave}>
      Save
    </button>
  );
};

export default Button;
