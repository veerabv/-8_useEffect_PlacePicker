import { useEffect, useRef, useState } from "react";

import Places from "./components/Places.jsx";
import { AVAILABLE_PLACES } from "./data.js";
import Modal from "./components/Modal.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
import logoImg from "./assets/logo.png";
import { sortPlacesByDistance } from "./loc.js";

//we move this line out of the component because it is used only when the app restarts
const storedIDs = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
const storedPlaces = storedIDs.map((id) =>
  AVAILABLE_PLACES.find((place) => place.id === id)
);

function App() {
  // const modal = useRef();
  const selectedPlace = useRef();
  const [pickedPlaces, setPickedPlaces] = useState(storedPlaces);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // this is used to get the current localstorageData , but this is need inside the useEffect or not ?
  // useEffect(() => {
  //     const storedIDs = JSON.parse(localStorage.getItem("selectedPlaces") )|| [];
  //    const storedPlaces =  storedIDs.map((id) => AVAILABLE_PLACES.find(place => place.id === id))
  //    setPickedPlaces(storedPlaces);
  // } , [])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      //navigator is the global object provided by the JS to get the current location of the user
      const sortedPlaces = sortPlacesByDistance(
        // with the calbaack function which gives the postition object where lat lang of the user
        AVAILABLE_PLACES,
        position.coords.latitude,
        position.coords.longitude
      );
      setAvailablePlaces(sortedPlaces);
    });
  }, []);

  function handleStartRemovePlace(id) {
    // modal.current.open();
    setIsModalOpen(true);
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    // modal.current.close();\
    setIsModalOpen(false);
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });

    const storedIDs = JSON.parse(localStorage.getItem("selectedPlaces")) || []; // updating the storage when added place

    if (storedIDs.indexOf(id) === -1) {
      localStorage.setItem(
        "selectedPlaces",
        JSON.stringify([id, ...storedIDs])
      );
    }
  }

  function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );
    // modal.current.close();
    setIsModalOpen(false);
    const storedIDs = JSON.parse(localStorage.getItem("selectedPlaces")) || []; //// updating the storage when delete place
    localStorage.setItem(
      "selectedPlaces",
      JSON.stringify(storedIDs.filter((id) => id !== selectedPlace.current))
    );
  }

  function handleModelClose() {
    setIsModalOpen(false);
  }
  return (
    <>
      <Modal open={isModalOpen} onClose={handleModelClose}>  {/* modal is a part of the dom bu the visiblity is controlled by the showModal/close */}
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={"Select the places you would like to visit below."}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          fallbackText={
            "Sorting the Available Places ... Kindly allow the loction popUp"
          }
          places={availablePlaces}
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
