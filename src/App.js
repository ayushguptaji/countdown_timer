import { useState, useRef, useEffect } from "react";
import "./App.css";
import Card from "./components/Card";

function App() {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [dateTime, setDateTime] = useState();
  const [msg, setMsg] = useState(""); 
  const [timer, setTimer] = useState(false);
  const ref = useRef();

  const handleChange = () => {
    const value = ref.current.value;
    setDateTime(Date.parse(value));
  };
  const handleClick = (e) => {
    setMsg("");
    if(e.target.name === "stop") {
      setTimer(false);      
      setDays(0);
      setHours(0);
      setMinutes(0);
      setSeconds(0);
      return;
    } 
    if(dateTime === undefined) {
      alert("Select Date and Time");
      return;
    }
    const currentDateTime = Date.parse(new Date());
    // console.log(currentDateTime, dateTime);
    if(currentDateTime > dateTime) {
      alert("Select Future Date & Time")
      return;
    }
    const diff = dateTime - currentDateTime;
    const calDays = Math.floor(diff/86400000);
    if(calDays > 99) {
      setMsg("Selected Time is more than 100 days");
      return;
    } 
    const calHrs = Math.floor((diff%86400000)/3600000);
    const calMins = Math.floor(((diff%86400000)%3600000)/60000);
    const calSecs = Math.floor((((diff%86400000)%3600000)%60000)/1000);
    //console.log(diff, calDays, calHrs, calMins, calSecs);
    setDays(calDays);
    setHours(calHrs);
    setMinutes(calMins);
    setSeconds(calSecs);
    setTimer(true);
  };

  useEffect(() => {
    //console.log(days, hours, minutes, seconds);
    if(!timer) {
      setDays(0);
      setHours(0);
      setMinutes(0);
      setSeconds(0);
      return;
    }
    setTimeout(() => {
      if(seconds === 0) {
        if(minutes > 0) {
          setMinutes(prev => prev-1);
          setSeconds(59);
        } else if(hours > 0) {
          setHours(prev => prev-1);
          setMinutes(59);
          setSeconds(59);
        } else if(days > 0) {
          setDays(prev => prev-1);
          setHours(23);
          setMinutes(59);
          setSeconds(59);
        } else {
          setDays(0);
          setHours(0);
          setMinutes(0);
          setSeconds(0);
          setTimer(false);
          setMsg("🎉The countdown is over! What's next on your adventure?🎉")
        }
      } else {        
        setSeconds(prev => prev-1);
      }
    }, 1000);
  }, [timer, days, hours, minutes, seconds]);

  return (
    <div className="App">
      <h1>
        Countdown <span id="heading">Timer</span>
      </h1>
      <input
        type="datetime-local"
        ref={ref}
        id="dateTime"
        onChange={handleChange}
      />
      {!timer ? <button name="start" onClick={handleClick}>
        Start Timer
      </button>: <button name="stop" onClick={(e)=> handleClick(e)}>
        Stop Timer
      </button>}
      {msg === "" ? <div id="card-collection">
        <Card val={days} type="Days" />
        <Card val={hours} type="Hours" />
        <Card val={minutes} type="Minutes" />
        <Card val={seconds} type="Seconds" />
      </div> : <div id="msg">{msg}</div>}
    </div>
  );
}

export default App;
