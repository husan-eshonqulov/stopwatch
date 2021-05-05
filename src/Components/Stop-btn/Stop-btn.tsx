import React from 'react';
import '../Stop-btn/Stop-btn.css';

interface IStopBtnProps {
    handleStop: React.MouseEventHandler<HTMLButtonElement>,
}

function StartBtn(props: IStopBtnProps) {
    return (
        <div>
            <button
                className="btn btn-danger"
                id="stop-btn"
                onClick={props.handleStop}
            >
                Stop
            </button>
        </div>
    );
}

export default StartBtn;