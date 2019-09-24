import React from 'react';

function Square(props) {
    const className = 'square' + (props.highlightw ? 'highlight' : ''); 
    return (
      <button className="square" 
        onClick={props.onClick}>
        {props.value}
      </button>
    ); 
}

export default Square;
