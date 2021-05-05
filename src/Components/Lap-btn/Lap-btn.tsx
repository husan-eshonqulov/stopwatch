import React, { useState } from 'react';
import '../Lap-btn/Lap-btn.css';

interface ILapBtnProps {
    handleLap: React.MouseEventHandler<HTMLButtonElement>,
}

function LapBtn(props: ILapBtnProps) {


    return (
        <div>
            <button
                className="btn btn-dark"
                id="lap-btn"
                onClick={props.handleLap}
            >
                Lap
        </button>
        </div>
    );
}

export default LapBtn;