//Packages
import React from "react";
import { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import "./backOfficeModal.css";

const BackOfficeModal = ({ reservation, onClose }) => {
  const [showCarPhotos, setShowCarPhotos] = useState(false);

  const handleCarPhotoClick = () => {
    setShowCarPhotos(true);
  };

  const handleCloseCarPhotos = () => {
    setShowCarPhotos(false);
  };

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
              {reservation.gender} {reservation.firstName}{" "}
              {reservation.lastName}
            </span>
          </div>
          <div className="backofficemodal-body-item">
            <span>Adresse mail:</span>
            <span>{reservation.email}</span>
          </div>
          <div className="backofficemodal-body-item backofficemodal-body-item-align">
            <div className="backoffice-car">
              <span>{reservation.carName}</span>
              <div
                className="backoffice-car-container"
                onClick={handleCarPhotoClick}
              >
                <div>Voir photos</div>
                <img
                  className="backofficemodal-pic-small"
                  src={reservation.carPhoto}
                  alt="selected car"
                  onClick={handleCarPhotoClick}
                />
              </div>
            </div>
          </div>

          <div className="backofficemodal-body-item backofficemodal-body-margin">
            <span>Détails du prix:</span>
          </div>
          <div className="backofficemodal-body-item">
            <span>Nombre de jours</span>
            <span>
              {reservation.days === 1
                ? reservation.days + " jour"
                : reservation.days + " jours"}
            </span>
          </div>
          <div className="backofficemodal-body-item">
            <span>Prix par jour:</span>
            <span>€ {reservation.price}</span>
          </div>
          <div className="backofficemodal-body-item backofficemodal-body-margin">
            <span>Inclus dans votre réservation: </span>
          </div>
          <div className="backofficemodal-body backofficemodal-body-item">
            {reservation.includedCharges.map((charges, index) => {
              return (
                <span
                  className="backofficemodal-body-margin backofficemodal-item-small"
                  key={index}
                >
                  {charges.title === "Illimité Miles"
                    ? "Kilométrage illimité"
                    : charges.title}
                </span>
              );
            })}
          </div>
          <div className="backofficemodal-body-item backofficemodal-body-margin">
            <span>Taxes: </span>
          </div>
          <div className="backofficemodal-body backofficemodal-body-item">
            {reservation.extraFees.map((fees, index) => {
              return (
                <div
                  className="backofficemodal-body-item backofficemodal-item-small"
                  key={index}
                >
                  <span>{fees.title}</span>
                  <span>€ {fees.price.amount.toFixed(2)}</span>
                </div>
              );
            })}
          </div>
          <div className="backofficemodal-body-item backofficemodal-body-margin">
            <span>Options: </span>
          </div>
          <div className="backofficemodal-body backofficemodal-body-item">
            {reservation.selectedOptions.map((options, index) => {
              return (
                <div
                  className="backofficemodal-body-item backofficemodal-item-small"
                  key={index}
                >
                  <span>
                    {options.title +
                      (options.price.unit === "jour" ? " / jour" : "")}
                  </span>
                  <span>€ {options.price.amount.toFixed(2)}</span>
                </div>
              );
            })}
          </div>

          <div className="backofficemodal-body-item">
            <span>Prix de la réservation:</span>
            <span>€ {reservation.totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
      {showCarPhotos && (
        <div className="car-photos-modal">
          <div className="car-photos-modal-content">
            <span className="ico-close" onClick={handleCloseCarPhotos}></span>
            <div className="car-photos-modal-body">
              <Carousel
                className="car-photos-border"
                autoPlay={true}
                interval={3000}
                infiniteLoop={true}
                showThumbs={false}
              >
                {reservation.carPhotos.map((photo, index) => (
                  <img key={index} src={photo} alt={`Car model ${index}`} />
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default BackOfficeModal;
