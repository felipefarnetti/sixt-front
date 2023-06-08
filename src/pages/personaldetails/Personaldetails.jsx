//Packages
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getNames } from "country-list";
import axios from "axios";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

import "./personalDetails.css";

const Personaldetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const config = location.state.result.config;
  const offer = location.state.result.offer;
  const days = location.state.result.days;
  const selectedOptions = location.state.selectedOptions;

  const [phoneNumber, setPhoneNumber] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [uniqueId, setUniqueId] = useState(null);

  //Calculer le prix jours + options + taxes
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
      // console.log(response.data);
      navigate("/"); //ne pas partir direct - partir quand on ferme le modal
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="personaldetails-titles">
            <label htmlFor="gender-male">
              <input
                type="radio"
                id="gender-male"
                value="M."
                {...register("gender", { required: true })}
              />{" "}
              M.
            </label>
            <label htmlFor="gender-female">
              <input
                type="radio"
                id="gender-female"
                value="Mme."
                {...register("gender", { required: true })}
              />{" "}
              Mme.
            </label>
            <span>*</span>
          </div>
          <div className="personaldetails-user">
            <div className="personaldetails-user-left">
              <input
                className="personaldetails-inputs"
                {...register("company", { required: false })}
                placeholder="Societé"
                type="string"
              />
              <input
                className="personaldetails-inputs"
                {...register("firstName", { required: true })}
                placeholder="Prénom *"
                type="string"
              />
              <input
                className="personaldetails-inputs"
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Adresse email invalide",
                  },
                })}
                placeholder="Adresse email *"
                type="email"
              />

              <input
                className="personaldetails-inputs"
                {...register("street", { required: true })}
                placeholder="Rue *"
                type="string"
              />
              <select
                {...register("country")}
                defaultValue="France"
                className="personaldetails-inputs"
              >
                {getNames().map((country, index) => {
                  return (
                    <option value={country} key={index}>
                      {country}
                    </option>
                  );
                })}
              </select>
              <span className="personaldetails-birthday-text">
                DATE DE NAISSANCE
              </span>
              <input
                className="personaldetails-birthday-input"
                {...register("birthDate", { required: true })}
                type="date"
                min="1900-01-01"
                max="2004-01-01"
                onChange={(e) =>
                  setValue("birthDate", e.target.value.toString())
                }
              />
            </div>

            <div className="personaldetails-user-right">
              <input
                className="personaldetails-inputs"
                {...register("lastName", { required: true })}
                placeholder="Nom de famille *"
                type="string"
              />
              <PhoneInput
                className="personaldetails-inputs personaldetails-phone"
                style={{
                  outline: "none",
                  textDecoration: "none",
                }}
                {...register("phoneNumber", { required: true })}
                placeholder="Numéro de téléphone *"
                defaultCountry="FR"
                value={phoneNumber}
                onChange={setPhoneNumber}
              />
              <input
                className="personaldetails-inputs"
                {...register("zipCode", { required: true })}
                placeholder="Code postal *"
                type="text"
                minLength={5}
                maxLength={9}
              />
              <input
                className="personaldetails-inputs"
                {...register("city", { required: true })}
                placeholder="Ville *"
                type="string"
              />
            </div>
          </div>
        </form>
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
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Personaldetails;
