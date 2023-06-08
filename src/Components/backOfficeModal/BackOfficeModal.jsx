import React from "react";

import "./backOfficeModal.css";

const BackOfficeModal = ({ reservation, onClose }) => {
  return (
    <div className="backofficemodal-container">
      <div className="backofficemodal-content">
        <div className="backofficemodal-title">
          <h2>Détails de la réservation</h2>
          <button className="ico-close" onClick={onClose}></button>
        </div>
        <div className="backofficemodal-body">
          <div className="backofficemodal-body-item">
            <span>Réference de la réservation: </span>
            <span>{reservation.uniqueId}</span>
          </div>
          <div className="backofficemodal-body-item">
            <span>Client (Prénom Nom):</span>
            <span>
              {reservation.firstName} {reservation.lastName}
            </span>
          </div>
          <div className="backofficemodal-body-item">
            <span>Adresse mail:</span>
            <span>{reservation.email}</span>
          </div>
          <div className="backofficemodal-body-item">
            <span>Prix de la réservation:</span>
            <span>€ {reservation.totalPrice}</span>
          </div>
          <div className="backofficemodal-body-item backofficemodal-body-margin">
            <span>Détails du prix:</span>
          </div>
          <div className="backofficemodal-body-item">
            <span>Prix par jour:</span>
            <span>€ {reservation.price}</span>
          </div>
          <div className="backofficemodal-body-item">
            <span>Prix de la réservation:</span>
            <span>€ {reservation.totalPrice}</span>
          </div>
          <div className="backofficemodal-body-item">
            <span>Prix de la réservation:</span>
            <span>€ {reservation.totalPrice}</span>
          </div>

          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};
export default BackOfficeModal;
