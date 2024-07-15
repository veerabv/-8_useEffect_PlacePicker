export default function DeleteConfirmation({ onConfirm, onCancel }) {
  console.log('timmer started'); 
  setTimeout(() => {   // the problem :  the timmer started when the app component rendered we can also controll that conditionaly but when we click the no button in this component the place is deleted
    onConfirm()
  },3*1000)
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
