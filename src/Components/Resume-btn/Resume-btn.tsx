import React from 'react';
import '../Resume-btn/Resume-btn.css';

interface IResumeBtnProps {
    handleResume: React.MouseEventHandler,
}

function ResumeBtn(props: IResumeBtnProps) {
    return (
        <div>
            <button
                className="btn btn-primary"
                id="resume-btn"
                onClick={props.handleResume}
            >
                Resume
            </button>
        </div>
    );
}

export default ResumeBtn;