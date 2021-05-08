import { useState, useEffect } from 'react';
import '../App/App.css';

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
    const [firstView, setFirstView] = useState(true);
    const [secondView, setSecondView] = useState(false);

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
        setFirstView(false);
        setSecondView(true);
    };

    const handleStop = () => {
        setStatus(false);
        setSecondView(false);
    };

    const handleResume = () => {
        setStatus(true);
        setSecondView(true);
    }

    const handleReset = () => {
        setTime(0);
        setSec(0);
        setMin(0);
        setStatus(false);
        setTable(undefined);
        setSecondView(false);
        setFirstView(true);
    };

    const lapTimeInfo = () => {
        if (table !== undefined) {
            const lastTable = table[0];
            const lastOverallTime = lastTable.overallTime;
            let oTime = parseInt(lastOverallTime.slice(-2));
            let oSec = parseInt(lastOverallTime.slice(-7, -5));
            let oMin = parseInt(lastOverallTime.slice(-12, -10));
            let lapTime;
            let lapSec;
            let lapMin;

            if (time >= oTime) {
                lapTime = time - oTime;
            }
            else {
                lapTime = time + 100 - oTime;
                oSec += 1;
            }

            if (sec >= oSec) {
                lapSec = sec - oSec;
            }
            else {
                lapSec = sec + 60 - oSec;
                oMin += 1;
            }

            lapMin = min - oMin;


            return {
                lapTime: lapTime,
                lapSec: lapSec,
                lapMin: lapMin,
            };
        }
        else {
            return {
                lapTime: undefined,
                lapSec: undefined,
                lapMin: undefined,
            };
        }
    }

    const handleLap = () => {
        setTable((prevTable) => {
            if (prevTable !== undefined) {
                let lap: number | string = prevTable.length + 1;
                lap = (lap < 10) ? '0' + lap : lap;
                const lastTableElement = prevTable[0];
                const lastOverallTime = lastTableElement.overallTime;
                let oTime = parseInt(lastOverallTime.slice(-2));
                let oSec = parseInt(lastOverallTime.slice(-7, -5));
                let oMin = parseInt(lastOverallTime.slice(-12, -10));

                let lapTime;
                let lapSec;
                let lapMin;

                if (time >= oTime) {
                    lapTime = time - oTime;
                }
                else {
                    lapTime = time + 100 - oTime;
                    oSec += 1;
                }

                if (sec >= oSec) {
                    lapSec = sec - oSec;
                }
                else {
                    lapSec = sec + 60 - oSec;
                    oMin += 1;
                }

                lapMin = min - oMin;

                return (
                    [

                        {
                            lap: lap,
                            lapTime: createStopwatch(lapMin, lapSec, lapTime),
                            overallTime: createStopwatch(min, sec, time),
                        },

                        ...prevTable,

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

    if (firstView) {
        return (
            <div className="App first-view d-flex align-items-center justify-content-center">
                <div className="d-flex flex-column align-items-center">
                    <div>
                        <div className="stopwatch">
                            <Stopwatch min={min} sec={sec} time={time} />
                        </div>
                        <div className="laptime">
                            <LapTime min={lapTimeInfo().lapMin} sec={lapTimeInfo().lapSec} time={lapTimeInfo().lapTime} />
                        </div>
                    </div>

                    <div>
                        <StartBtn handleStart={handleStart} />
                    </div>
                </div>
            </div>
        );
    }
    else {
        if (secondView) {
            return (
                <div className="App">
                    <div className="row">
                        <div className="col-6">
                            <div>
                                <div className="stopwatch">
                                    <Stopwatch min={min} sec={sec} time={time} />
                                </div>
                                <div className="laptime">
                                    <LapTime min={lapTimeInfo().lapMin} sec={lapTimeInfo().lapSec} time={lapTimeInfo().lapTime} />
                                </div>
                            </div>

                            <div>
                                <StopBtn handleStop={handleStop} />
                                <LapBtn handleLap={handleLap} />
                            </div>
                        </div>

                        <div className="col-6">
                            <Table table={table} />
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className="App">
                    <div className="row">
                        <div className="col-6">
                            <div>
                                <div className="stopwatch">
                                    <Stopwatch min={min} sec={sec} time={time} />
                                </div>
                                <div className="laptime">
                                    <LapTime min={lapTimeInfo().lapMin} sec={lapTimeInfo().lapSec} time={lapTimeInfo().lapTime} />
                                </div>
                            </div>

                            <div>
                                <ResumeBtn handleResume={handleResume} />
                                <ResetBtn handleReset={handleReset} />
                            </div>
                        </div>

                        <div className="col-6">
                            <Table table={table} />
                        </div>
                    </div>
                </div>
            );
        }
    }


    // return (
    //     <div className="container m-5">
    //         <StartBtn handleStart={handleStart} />
    //         <p></p>
    //         <ResumeBtn handleResume={handleStart} />
    //         <p></p>
    //         <StopBtn handleStop={handleStop} />
    //         <p></p>
    //         <LapBtn handleLap={handleLap} />
    //         <p></p>
    //         <ResumeBtn handleResume={handleStart} />
    //         <p></p>
    //         <ResetBtn handleReset={handleReset} />
    //         <p></p>
    //         <Stopwatch time={time} sec={sec} min={min} />
    //         <p></p>
    //         <LapTime min={lapTimeInfo().lapMin} sec={lapTimeInfo().lapSec} time={lapTimeInfo().lapTime} />
    //         <p></p>
    //         <Table table={table} />
    //     </div>
    // );
}

type Time = number | string;

function createStopwatch(min: Time, sec: Time, time: Time) {
    const Time = (time < 10) ? '0' + time : time;
    const Sec = (sec < 10) ? '0' + sec : sec;
    const Min = (min < 10) ? '0' + min : min;

    return `${Min} : ${Sec} . ${Time}`;
}

export default App;