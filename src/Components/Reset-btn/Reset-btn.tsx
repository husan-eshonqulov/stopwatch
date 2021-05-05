import React from 'react';
import '../Reset-btn/Reset-btn.css';

interface IResetBtnProps {
    handleReset: React.MouseEventHandler<HTMLButtonElement>,
}

function ResetBtn(props: IResetBtnProps) {
    return (
        <div>
            <button
                className="btn btn-dark"
                id="reset-btn"
                onClick={props.handleReset}
            >
                Reset
        </button>
        </div>
    );
}

export default ResetBtn;