//packages import
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
//pages
// import SearchLocation from "../../Components/SearchLocation/SearchLocation";
import "./offerConfig.css";
import CardOption from "../../Components/cardOption/CardOption";
import ModalOptions from "../../Components/modalOptions/ModalOptions";

const Offerconfig = () => {
  const [result, setResult] = useState({
    config: null,
    offer: null,
    days: null,
    isLoading: true,
  });
  const [moreOptions, setMoreOptions] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const location = useLocation();
  const navigation = useNavigate();

  useEffect(() => {
    if (location.state) {
      setResult((prevstate) => ({
        ...prevstate,
        ...location.state,
        isLoading: false,
      }));
      return;
    }
  }, []);

  const handleOption = (item) => {
    if (isActive(item.id)) {
      setSelectedOptions(
        selectedOptions.filter((option) => option.id !== item.id)
      );
    } else {
      if (item.id === "I3" || item.id === "I4") {
        const idToRemove = item.id === "I3" ? "I4" : "I3";
        if (isActive(idToRemove)) {
          setSelectedOptions(
            selectedOptions.filter((option) => option.id !== idToRemove)
          );
        }
      }
      setSelectedOptions((prevSelectedOptions) => [
        ...prevSelectedOptions,
        item,
      ]);
    }
  };

  const isActive = (id) => {
    return selectedOptions.find((option) => option.id === id);
  };

  //Calculer le prix jours + options + taxes
  const calculateTotalPrice = () => {
    let totalPrice = result.offer.prices.dayPrice.amount * result.days;

    selectedOptions.forEach((option) => {
      if (option.price.unit === "jour") {
        totalPrice += option.price.amount * result.days;
      } else {
        totalPrice += option.price.amount;
      }
    });
    result.config.extraFees.forEach((fee) => {
      totalPrice += fee.price.amount;
    });
    return totalPrice.toFixed(2);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    navigation(`/personaldetails`, {
      state: {
        selectedOptions,
        result,
      },
    });
  };

  if (!result.config || !result.offer || !result.days) {
    return null;
  }

  return (
    <div className="offerconfig-container">
      <div className="offerconfig-hero-container">
        <img
          className="offerconfig-hero"
          src={result.config.splashImages[0]}
          alt="hero"
        />
      </div>
      <div className="offerconfig-hero-title">
        <span>{result.offer.headlines.description}</span>
      </div>
      <div className="offerconfig-hero-bottom">
        <div>
          <span>{result.offer.headlines.longSubline}</span>
        </div>
        <div>
          <span className="ico-maxPassengers">
            <span>{result.offer.carGroupInfo.maxPassengers} Sièges</span>
          </span>
          <span className="ico-doors">
            <span>{result.offer.carGroupInfo.doors} Portes</span>
          </span>
          <span className="ico-automatic">
            <span>
              {result.offer.carGroupInfo.automatic === true
                ? "Automatique"
                : "Manual"}
            </span>
          </span>
          <span className="ico-baggage">
            <span>
              {result.offer.carGroupInfo.baggage === 1
                ? result.offer.carGroupInfo.baggage + " Bagage"
                : result.offer.carGroupInfo.baggage + " Bagages"}
            </span>
          </span>
          <span className="ico-airCondition">
            <span>{result.offer.carGroupInfo.airCondition} Climatisation</span>
          </span>
          <span className="ico-driverRequirements">
            <span>{result.offer.carGroupInfo.driverMinAge} Ans</span>
          </span>
        </div>
      </div>

      <div className="offerconfig-center">
        <div className="offerconfig-center-left">
          <div>
            <h1>CHOISISSEZ VOTRE PROTECTION ET VOS OPTIONS</h1>
            <h2>VOTRE OFFRE INCLUT</h2>
          </div>
          <div className="offerconfig-center-left-top">
            <div className="offerconfig-center-left-included">
              {result.config.includedCharges.map((charge, index) => (
                <span className="ico-bullet-sm" key={index}>
                  <span style={{ fontSize: "12px", fontFamily: "Roboto" }}>
                    {charge.title}
                  </span>
                </span>
              ))}
              {selectedOptions.map((charge, index) => (
                <span className="ico-bullet-sm" key={index}>
                  <span style={{ fontSize: "12px", fontFamily: "Roboto" }}>
                    {charge.title}
                  </span>
                </span>
              ))}
            </div>
            <div>
              <h2>CHOISISSEZ VOS OPTIONS</h2>
            </div>
            <div className="offerconfig-center-left-options">
              {result.config.additionalCharges
                .slice(0, moreOptions ? 50 : 5)
                .map((item, index) => {
                  return (
                    <CardOption
                      item={item}
                      key={index}
                      onChange={() => handleOption(item)}
                      isActive={isActive(item.id)}
                    />
                  );
                })}
            </div>
            <div
              className="offerconfig-center-left-options-plus"
              onClick={() => setMoreOptions(!moreOptions)}
            >
              <i className="ico-plus-sign"></i>
              <span>{moreOptions ? "VOIR MOINS" : "VOIR PLUS D'OPTIONS"}</span>
            </div>
          </div>
        </div>
        <div className="offerconfig-center-right">
          <div>
            <div className="offerconfig-center-right-price">
              <span className="offerconfig-center-right-text">TOTAL</span>
              <span>{calculateTotalPrice()}</span>
            </div>
            <div className="offerconfig-center-right-price">
              <div>
                <ModalOptions
                  selectedOptions={selectedOptions}
                  days={result.days}
                  result={result}
                  calculateTotalPrice={calculateTotalPrice}
                />
              </div>
              <span>Taxes incluses</span>
            </div>
            <div>
              <button
                className="offerconfig-price-button"
                onClick={handleSubmit}
              >
                CONTINUER
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offerconfig;
