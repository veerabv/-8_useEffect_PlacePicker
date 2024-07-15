import { useEffect } from "react";

export default function DeleteConfirmation({ onConfirm, onCancel }) {
  console.log('timmer started'); 
  useEffect(()=>{
   const timer =  setTimeout(() => {   
      onConfirm()
    },3*1000)

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
    </div>
  );
}
