import React from 'react';
import './style.styl';

const rang = times => {
    return 's'.repeat(times).split('');
};

const Loading = () => {
    return (
        <div className="message-status message-loading">
            {rang(10).map((i, index) => <div key={index} className="line" />)}
        </div>
    );
};

export default Loading;
