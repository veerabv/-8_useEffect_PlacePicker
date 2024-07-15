import { useEffect, useState } from "react";

const TIMER = 3000;
export default function DeleteConfirmation({ onConfirm, onCancel }) {
  const [progressValue , setProgressValue] = useState(TIMER);
useEffect(()=>{
  const interval = setInterval(()=>{
    setProgressValue((previousTime) => previousTime -10);
  },10)

  return () => {
    clearInterval(interval)
  }
},[])
  
  // console.log('timmer started'); 
  useEffect(()=>{
   const timer =  setTimeout(() => {   
      onConfirm()
    },TIMER)

    return () => {  // cleaning the timer 
      clearTimeout(timer)
    }
  } ,[onConfirm] ) // onConfirm is function , read any article what happen if the dependency value is a function or object. the issue will be infinite loop
 
  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
      <progress value={progressValue} max = {TIMER}/>  {/* default html code*/}
    </div>
  );
}
