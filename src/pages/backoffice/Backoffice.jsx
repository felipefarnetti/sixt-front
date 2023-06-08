//Packages
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

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

  useEffect(() => {
    if (isConnected) {
      fetchReservations();
    }
  }, [isConnected]);

  const fetchReservations = async () => {
    try {
      const response = await axios.get(
        "https://site--six-back--4w9wbptccl4w.code.run/useroffers"
      );
      setReservations(response.data.userOffers);
    } catch (error) {
      console.error(error);
      setErrorMessage("Une erreur s'est produite");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://site--six-back--4w9wbptccl4w.code.run/backoffice",
        {
          password: password,
        }
      );
      if (response.data.success) {
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
    Cookies.remove("token");
    setIsConnected(false);
    navigation("/backoffice");
  };

  const handleDeleteReservation = async (uniqueId) => {
    try {
      await axios.delete(
        `https://site--six-back--4w9wbptccl4w.code.run/useroffers/${uniqueId}`
      );
      fetchReservations();
    } catch (error) {
      console.error(error);
      setErrorMessage(
        "Une erreur s'est produite lors de la suppression de la réservation"
      );
    }
  };

  const handleOpenModal = (reservation) => {
    setSelectedReservation(reservation);
  };

  const closeModal = () => {
    setSelectedReservation(null);
  };

  return (
    <div className="backoffice-container">
      {!isConnected ? (
        <div>
          <div>
            <h1>🔑 Connexion au Backoffice 🔑</h1>
          </div>
          <div className="input-button-container">
            <form onSubmit={handleSubmit}>
              <input
                className="backoffice-input"
                type="password"
                name="password"
                id="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </form>
            <button className="backoffice-button" type="submit">
              Se Connecter
            </button>
          </div>

          {errorMessage && <p className="backoffice-error">{errorMessage}</p>}
        </div>
      ) : (
        <div className="backoffice-connected">
          <div>
            <h1>🔑 Backoffice Connecté 🔑</h1>
          </div>
          {reservations.length > 0 ? (
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
                {reservations.map((reservation) => (
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
                        className="delete-button"
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
