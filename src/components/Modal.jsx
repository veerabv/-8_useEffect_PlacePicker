import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
function Modal({ children ,open ,onClose}) {
  // console.log("modal");

  const dialog = useRef();
   useEffect(() => {
    if(open) dialog.current.showModal();
    else dialog.current.close();
   },[open])
 

  return createPortal(
    <dialog className="modal" ref={dialog} onClose={onClose}>  {/* if we pass open directly to dialog it will affect the dim backgroud style in css*/}
      {open ? children : null}
    </dialog>,
    document.getElementById('modal')
  );
}

export default Modal;
