import '../Stopwatch/Stopwatch.css';

interface IStopwatch {
    msec: number | string,
    sec: number | string,
    min: number | string,
}

function Stopwatch(props: IStopwatch) {
    let msec = props.min;
    let sec = props.sec;
    let min = props.min;

    msec = (msec < 10) ? '0' + msec : msec;
    sec = (sec < 10) ? '0' + sec : sec;
    min = (min < 10) ? '0' + min : min;

    return (
        <div id="stopwatch">
            {`${min} : ${sec} . ${msec}`}
        </div>
    );
}

export default Stopwatch;