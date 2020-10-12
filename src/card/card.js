import React from 'react';
import './card.css';

export const Card = (props) => {
    let squareContent = 'x';
    
    if (props.data.isFaceOn) {
        squareContent = props.data.term;
    }

    return (
        <div className={`Card ${props.data.isFaceOn ? 'face-on' : 'face-off'}`}
            onClick={() => props.onCardFlip(props.data)}>
            {squareContent}
        </div>
    );

}
