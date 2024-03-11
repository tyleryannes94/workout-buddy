import React from "react";

const Cards = ({title, children}) => {
    return (
        <div className='component-cards'>
            <h2 className='customSerif-bold'>{title}</h2>
            {children}
        </div>
    );
};

export default Cards;