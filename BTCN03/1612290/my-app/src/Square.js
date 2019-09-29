import React from 'react';

function Square(props) {
    const className = 'square' + (props.highlight ? 'highlight' : ''); 
    return (
      <button className = {props.className} 
        onClick = {props.onClick}>
        {props.value}
      </button>
    ); 
}

export default Square;
