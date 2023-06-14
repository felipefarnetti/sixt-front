//Packages
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
//Components
import BackOfficeModal from "../../Components/backOfficeModal/BackOfficeModal";
import "./backoffice.css";

const Backoffice = () => {
  const navigation = useNavigate();
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isConnected, setIsConnected] = useState(
    Cookies.get("token") === "connected"
  );
  const [reservations, setReservations] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Effect to fetch reservations when the connected state changes
    if (isConnected) {
      fetchReservations(); // Fetch reservations when connected
    }
  }, [isConnected]);

  const fetchReservations = async () => {
    try {
      // Fetch reservations from backend route /useroffers
      const response = await axios.get(
        "https://site--six-back--4w9wbptccl4w.code.run/useroffers"
      );
      setReservations(response.data.userOffers);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setErrorMessage("Une erreur s'est produite");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Post request to verify entered password
      const response = await axios.post(
        "https://site--six-back--4w9wbptccl4w.code.run/backoffice",
        {
          password: password,
        }
      );
      if (response.data.success) {
        // If the response indicates success
        // set the token in cookies and set connected state to true
        Cookies.set("token", "connected", { expires: 1 });
        setIsConnected(true);
      } else {
        setErrorMessage("Mot de passe incorrect");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Une erreur s'est produite");
    }
  };

  const handleDisconnect = () => {
    Cookies.remove("token"); // Remove token from cookies
    setIsConnected(false); // Set connected state to false
    navigation("/backoffice"); // Navigate to "/backoffice" page
  };

  const handleDeleteReservation = async (uniqueId) => {
    try {
      // Send a request to delete a reservation with a specific uniqueId
      await axios.delete(
        `https://site--six-back--4w9wbptccl4w.code.run/useroffers/${uniqueId}`
      );
      fetchReservations(); // Fetch updated reservations after deletion
    } catch (error) {
      console.error(error);
      setErrorMessage(
        "Une erreur s'est produite lors de la suppression de la réservation"
      );
    }
  };

  const handleOpenModal = (reservation) => {
    setSelectedReservation(reservation); // Set selected reservation in state
  };

  const closeModal = () => {
    setSelectedReservation(null); // Clear selected reservation from state
  };

  return (
    <div className="backoffice-container">
      {!isConnected ? (
        <div>
          <div>
            <h1>🔑 Connexion au Backoffice 🔑</h1>
          </div>
          <form className="input-button-container" onSubmit={handleSubmit}>
            <input
              className="backoffice-input"
              type="password"
              name="password"
              id="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button className="backoffice-button" type="submit">
              Se Connecter
            </button>
          </form>
          {errorMessage && <p className="backoffice-error">{errorMessage}</p>}
        </div>
      ) : (
        <div className="backoffice-connected">
          <div>
            <h1>🔑 Backoffice Réservations 🔑</h1>
          </div>
          {isLoading ? (
            <p>Chargement...</p>
          ) : reservations.length > 0 ? (
            <div className="reservations-container">
              <div className="reservations-header">
                <span>Date de réservation</span>
                <span>Référence client</span>
                <span>Nom/Prénom</span>
                <span>Durée</span>
                <span>Prix total</span>
                <span>Actions</span>
              </div>
              <div className="reservations-body">
                {reservations
                  .slice()
                  .reverse()
                  .map((reservation) => (
                    <div
                      key={reservation.uniqueId}
                      className="reservation-row"
                      onClick={() => handleOpenModal(reservation)}
                    >
                      <span>{reservation.reservationDate}</span>
                      <span>{reservation.uniqueId}</span>
                      <span>{`${reservation.firstName} ${reservation.lastName}`}</span>
                      <span>{reservation.days}</span>
                      <span>{reservation.totalPrice}</span>
                      <span>
                        <button
                          className="reservation-delete-button"
                          onClick={() =>
                            handleDeleteReservation(reservation.uniqueId)
                          }
                        >
                          Supprimer
                        </button>
                      </span>
                    </div>
                  ))}
              </div>
              {selectedReservation && (
                <BackOfficeModal
                  reservation={selectedReservation}
                  onClose={closeModal}
                />
              )}
            </div>
          ) : (
            <p>Aucune réservation trouvée.</p>
          )}
          <button className="backoffice-button" onClick={handleDisconnect}>
            Se Déconnecter
          </button>
        </div>
      )}
    </div>
  );
};

export default Backoffice;
