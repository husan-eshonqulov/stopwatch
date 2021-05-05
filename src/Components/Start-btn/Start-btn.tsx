import React from 'react';
import '../Start-btn/Start-btn.css';

interface IStartBtnProps {
    handleStart: React.MouseEventHandler<HTMLButtonElement>,
}

function StartBtn(props: IStartBtnProps) {
    return (
        <div>
            <button
                className="btn btn-primary"
                id="start-btn"
                onClick={props.handleStart}
            >
                Start
            </button>
        </div>
    );
}

export default StartBtn;