import React from 'react';

const Question = (props) => {

return (
    <div>
        <p>Question: {props.currentIndex}/{props.question}</p>
        <p>{props.currentQuestion}</p>
    </div>
)
};

export default Question;