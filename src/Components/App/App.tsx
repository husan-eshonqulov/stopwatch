import { useState, useEffect } from 'react';

import Stopwatch from '../Stopwatch/Stopwatch';
import StartBtn from '../Start-btn/Start-btn';
import ResumeBtn from '../Resume-btn/Resume-btn';
import StopBtn from '../Stop-btn/Stop-btn';
import ResetBtn from '../Reset-btn/Reset-btn';
import LapBtn from '../Lap-btn/Lap-btn';
import Table from '../Table/Table';
import LapTime from '../Lap-times/Lap-times';

type Table = {
    lap: number | string,
    lapTime: string,
    overallTime: string,
}[];

function App() {
    const [sec, setSec] = useState(0);
    const [min, setMin] = useState(0);
    const [time, setTime] = useState(0);
    const [status, setStatus] = useState(false);
    const [table, setTable] = useState<Table | undefined>();

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

    const handleStart = () => {
        setStatus(true);
    };

    const handleStop = () => {
        setStatus(false);
    };

    const handleReset = () => {
        setTime(0);
        setSec(0);
        setMin(0);
        setStatus(false);
    };

    const handleLap = () => {
        setTable((prevTable) => {
            if (prevTable !== undefined) {
                let lap: number | string = prevTable.length + 1;
                lap = (lap < 10) ? '0' + lap : lap;
                const laptime = createStopwatch(min, sec, time);
                const prevOverallTime = prevTable[prevTable.length - 1].overallTime;

                let oTime = parseInt(prevOverallTime.slice(-2)) + time;
                let oSec = parseInt(prevOverallTime.slice(-7, -5)) + sec;
                let oMin = parseInt(prevOverallTime.slice(-12, -10)) + min;

                if (oTime > 99) {
                    oTime -= 99;
                    oSec += 1;
                }

                if (oSec > 59) {
                    oSec -= 59;
                    oMin += 1;
                }

                const overallTime = createStopwatch(oMin, oSec, oTime);
                return (
                    [
                        ...prevTable,
                        {
                            lap: lap,
                            lapTime: laptime,
                            overallTime: overallTime,
                        }
                    ]
                );
            }
            else {
                const laptime = createStopwatch(min, sec, time);
                const overallTime = laptime;
                return (
                    [
                        {
                            lap: '01',
                            lapTime: laptime,
                            overallTime: overallTime,
                        }
                    ]
                );
            }
        });
    };

    return (
        <div className="container m-5">
            <StartBtn handleStart={handleStart} />
            <p></p>
            <ResumeBtn handleResume={handleStart} />
            <p></p>
            <StopBtn handleStop={handleStop} />
            <p></p>
            <LapBtn handleLap={handleLap} />
            <p></p>
            <ResumeBtn handleResume={handleStart} />
            <p></p>
            <ResetBtn handleReset={handleReset} />
            <p></p>
            <Stopwatch time={time} sec={sec} min={min} />
            <p></p>
            <LapTime status={status} />
            <p></p>
            <Table table={table} />
        </div>
    );
}

type Time = number | string;

function createStopwatch(min: Time, sec: Time, time: Time) {
    const Time = (time < 10) ? '0' + time : time;
    const Sec = (sec < 10) ? '0' + sec : sec;
    const Min = (min < 10) ? '0' + min : min;

    return `${Min} : ${Sec} . ${Time}`;
}

export default App;