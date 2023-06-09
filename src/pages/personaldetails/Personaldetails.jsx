//Packages
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import DataForm from "../../Components/dataForm/DataForm";

import "./personalDetails.css";

const Personaldetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const config = location.state.result.config;
  const offer = location.state.result.offer;
  const days = location.state.result.days;
  const selectedOptions = location.state.selectedOptions;

  const [modalOpen, setModalOpen] = useState(false);
  const [uniqueId, setUniqueId] = useState(null);

  //Function to calc the total price + options + fees
  const calculateTotalPrice = () => {
    let totalPrice = offer.prices.dayPrice.amount * days;

    selectedOptions.forEach((option) => {
      if (option.price.unit === "jour") {
        totalPrice += option.price.amount * days;
      } else {
        totalPrice += option.price.amount;
      }
    });
    config.extraFees.forEach((fee) => {
      totalPrice += fee.price.amount;
    });
    return totalPrice.toFixed(2);
  };

  //Form register - input datas + reservation data
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isValid },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    const birthDate = data.birthDate.split("-").reverse().join("-");
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const reservationDate = `${day}-${month}-${year}`;

    const formData = {
      ...data,
      price: offer.prices.dayPrice.amount,
      totalPrice: calculateTotalPrice(),
      selectedOptions,
      days,
      carPhoto: offer.images.small,
      carPhotos: config.splashImages,
      carName: offer.headlines.longSubline,
      includedCharges: config.includedCharges,
      extraFees: config.extraFees,
      reservationDate,
      birthDate,
    };
    console.log(data);
    try {
      const response = await axios.post(
        "https://site--six-back--4w9wbptccl4w.code.run/useroffer",
        formData
      );
      setUniqueId(response.data.uniqueId);
      setModalOpen(true);
      //ne pas partir direct - partir quand on ferme le modal
    } catch (error) {
      console.error(error);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setUniqueId(null);
  };

  return (
    <div className="personaldetails-container">
      <div className="personaldetails-title">
        <h1>INFORMATIONS PERSONNELLES</h1>
      </div>
      <div>
        <DataForm onSubmit={onSubmit} />
      </div>
      <div>
        <div className="personaldetails-bottom">
          <h1 className="personaldetails-bottom-title">VOTRE OFFRE INCLUT</h1>
          {config.includedCharges.map((charges, index) => (
            <i className="ico-bullet-sm" key={index}>
              <span>{charges.title}</span>
            </i>
          ))}
        </div>
        <div className="personaldetails-bottom">
          <h1 className="personaldetails-bottom-title">
            EXIGENCES POUR LES CONDUCTEURS
          </h1>
          <i className="ico-bullet-sm">
            <span>
              Conducteur âgé d'au moins {offer.carGroupInfo.driverMinAge} ans
            </span>
          </i>
        </div>
        <div className="personaldetails-bottom">
          <h1 className="personaldetails-bottom-title">PÉRIODE DE LOCATION</h1>
          <div className="personaldetails-bottom-information">
            <span>
              Durée de location ({days} x {offer.prices.dayPrice.amount})
            </span>
            <span>€ {(offer.prices.dayPrice.amount * days).toFixed(2)}</span>
          </div>
        </div>
        <div className="personaldetails-bottom">
          <h1 className="personaldetails-bottom-title">
            PROTECTION ET OPTIONS
          </h1>
          {selectedOptions.map((options, index) => (
            <div className="personaldetails-bottom-information" key={index}>
              <span>{options.title}</span>
              <span>
                €
                {options.price.unit === "jour"
                  ? (options.price.amount * days).toFixed(2)
                  : options.price.amount}
              </span>
            </div>
          ))}
        </div>
        <div className="personaldetails-bottom">
          <h1 className="personaldetails-bottom-title">FRAIS</h1>
          {config.extraFees.map((fees, index) => (
            <div className="personaldetails-bottom-information" key={index}>
              <span>{fees.title}</span>
              <span>
                €
                {fees.price.unit === "jour"
                  ? (fees.price.amount * days).toFixed(2)
                  : fees.price.amount}
              </span>
            </div>
          ))}
        </div>

        <div className="personaldetails-bottom-total">
          <h1>TOTAL</h1>
          <span>{calculateTotalPrice()}</span>
        </div>
      </div>

      <div className="personaldetails-bottom-cgu">
        <span>
          En cliquant sur le bouton, je confirme que j'ai lu et accepté les{" "}
          <span style={{ color: "#ff5f00" }}>informations de location</span> et
          les <span style={{ color: "#ff5f00" }}>termes et conditions</span>
        </span>
      </div>

      <div>
        <button
          className="personaldetails-button"
          type="submit"
          onClick={handleSubmit(onSubmit)}
          disabled={!isValid}
        >
          RÉSERVER
        </button>
      </div>
      {modalOpen && (
        <div className="personaldetails-modal">
          <div className="personaldetails-modal-container">
            <h2>Réservation confirmée</h2>
            <p>Voici la référence de votre dossier:</p>
            <p className="unique-id">{uniqueId}</p>
            <button className="modal-close-button" onClick={closeModal}>
              {navigate("/")}
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Personaldetails;
