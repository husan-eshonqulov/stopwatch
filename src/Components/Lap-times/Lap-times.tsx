import { useState, useEffect } from 'react';
import Stopwatch from '../Stopwatch/Stopwatch';

interface ILapTime {
    status: boolean,
}

function LapTime(props: ILapTime) {
    const [sec, setSec] = useState(0);
    const [min, setMin] = useState(0);
    const [time, setTime] = useState(0);

    const status = props.status;

    useEffect(() => {
        if (status) {
            const intervalId = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 10);

            return () => {
                clearInterval(intervalId);
            };
        }
    }, [status]);

    useEffect(() => {
        if (time === 99) {
            setSec(prevSec => prevSec + 1);
            setTime(0);
        }

        if (sec === 59) {
            setMin(prevMin => prevMin + 1);
            setSec(0);
        }
    });

    return (
        <div>
            <Stopwatch time={time} sec={sec} min={min} />
        </div>
    );
}

export default LapTime;