import Stopwatch from '../Stopwatch/Stopwatch';
import StartBtn from '../Start-btn/Start-btn';
import ResumeBtn from '../Resume-btn/Resume-btn';
import StopBtn from '../Stop-btn/Stop-btn';
import ResetBtn from '../Reset-btn/Reset-btn';
import LapBtn from '../Lap-btn/Lap-btn';

function App() {
    return (
        <div className="container m-5">
            <StartBtn />
            <p></p>
            <ResumeBtn />
            <p></p>
            <StopBtn />
            <p></p>
            <LapBtn />
            <p></p>
            <ResumeBtn />
            <p></p>
            <ResetBtn />
            <p></p>
            <Stopwatch msec={0} sec={0} min={0} />
        </div>
    );
}

export default App;