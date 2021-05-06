import { useState, useEffect } from 'react';
import Stopwatch from '../Stopwatch/Stopwatch';

interface ILapTime {
    min: number | undefined,
    sec: number | undefined,
    time: number | undefined,
}

function LapTime(props: ILapTime) {
    const [min, setMin] = useState<number | undefined>(0);
    const [sec, setSec] = useState<number | undefined>(0);
    const [time, setTime] = useState<number | undefined>(0);

    useEffect(() => {
        setTime(props.time);
        setSec(props.sec);
        setMin(props.min);
    }, [props.time]);

    if (time != undefined && sec != undefined && min != undefined) {
        return (
            <div>
                <Stopwatch time={time} sec={sec} min={min} />
            </div>
        );
    }
    else {
        return (
            <div></div>
        );
    }
}

export default LapTime;