import { useState } from "react";
import "./App.css";
import Card from "./components/Card";

function App() {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [dateTime, setDateTime] = useState();

  const handleClick = () => {
    console.log("Clicked", dateTime);
  }

  return (
    <div className="App">
      <h1>
        Countdown <span id="heading">Timer</span>
      </h1>
      <input type="datetime-local" value={dateTime} id="dateTime" onChange={(e) => setDateTime(e.value)}/>
      <button name="start" onClick={handleClick}>Start Timer</button>
      <div id="card-collection">
        <Card val={days} type="Days" />
        <Card val={hours} type="Hours" />
        <Card val={minutes} type="Minutes" />
        <Card val={seconds} type="Seconds" />
      </div>
    </div>
  );
}

export default App;
