import '../Stopwatch/Stopwatch.css';

interface IStopwatchProps {
    time: number | string,
    sec: number | string,
    min: number | string,
}

function Stopwatch(props: IStopwatchProps) {
    let time = props.time;
    let sec = props.sec;
    let min = props.min;

    time = (time < 10) ? '0' + time : time;
    sec = (sec < 10) ? '0' + sec : sec;
    min = (min < 10) ? '0' + min : min;

    return (
        <div id="stopwatch">
            {`${min} : ${sec} . ${time}`}
        </div>
    );
}

export default Stopwatch;