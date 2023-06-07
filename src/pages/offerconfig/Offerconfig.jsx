//packages
import { useEffect, useState } from "react";
// import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
//pages
// import SearchLocation from "../../Components/SearchLocation/SearchLocation";
import PersonalDetails from "../personaldetails/Personaldetails";
import "./offerConfig.css";

const Offerconfig = () => {
  const [result, setResult] = useState({
    config: null,
    offer: null,
    days: null,
    isLoading: true,
  });
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
  // console.log(result);
  // console.log(location.state.offer.headlines.description);
  // console.log(result.offer);
  // console.log(location.state.config);

  const handleSubmit = async (event) => {
    event.preventDefault();
    navigation(`/PersonalDetails`);
  };

  return (
    <div className="offerconfig-container">
      <div className="offerconfig-hero-container">
        <img
          className="offerconfig-hero"
          src={location.state.config.splashImages[0]}
          alt="hero"
        />
      </div>
      <div className="offerconfig-hero-title">
        <span>{location.state.offer.headlines.description}</span>
      </div>
      <div className="offerconfig-hero-bottom">
        <div>
          <span>{location.state.offer.headlines.longSubline}</span>
        </div>
        <div>
          <span className="ico-maxPassengers">
            <span>
              {location.state.offer.carGroupInfo.maxPassengers} Sièges
            </span>
          </span>
          <span className="ico-doors">
            <span>{location.state.offer.carGroupInfo.doors} Portes</span>
          </span>
          <span className="ico-automatic">
            <span>
              {location.state.offer.carGroupInfo.automatic === true
                ? "Automatique"
                : "Manual"}
            </span>
          </span>
          <span className="ico-baggage">
            <span>
              {location.state.offer.carGroupInfo.baggage === 1
                ? location.state.offer.carGroupInfo.baggage + " Bagage"
                : location.state.offer.carGroupInfo.baggage + " Bagages"}
            </span>
          </span>
          <span className="ico-airCondition">
            <span>
              {location.state.offer.carGroupInfo.airCondition} Climatisation
            </span>
          </span>
          <span className="ico-driverRequirements">
            <span>{location.state.offer.carGroupInfo.driverMinAge} Ans</span>
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
              {location.state.config.includedCharges.map((charge, index) => (
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
              <button className="offerconfig-center-left-options-card">
                <div className="offerconfig-center-left-options-card-self">
                  <div>
                    <i className="ico-carshield"></i>
                  </div>
                  <div>
                    <h3>PROTÉGEZ VOTRE LOCATION</h3>
                    <span>
                      {location.state.config.includedCharges[0].title}
                    </span>
                  </div>
                </div>
              </button>
              <button className="offerconfig-center-left-options-card">
                <div className="offerconfig-center-left-options-card-self">
                  <div>
                    <i className="ico-charges"></i>
                  </div>
                  <div>
                    <h3>PÉAGE EXPRESS ILLIMITÉ</h3>
                    <span>
                      {location.state.config.additionalCharges[1].description}
                    </span>
                    <div>
                      <span>
                        €
                        {
                          location.state.config.additionalCharges[1].price
                            .amount
                        }
                        Jour
                      </span>
                    </div>
                  </div>
                </div>
              </button>
              <button className="offerconfig-center-left-options-card">
                <div className="offerconfig-center-left-options-card-self">
                  <div>
                    <i className="ico-wifi"></i>
                  </div>
                  <div>
                    <h3>SIXT CONNECT PLUS</h3>
                    <span>
                      {location.state.config.additionalCharges[2].description}
                    </span>
                    <div>
                      <span>
                        €
                        {
                          location.state.config.additionalCharges[2].price
                            .amount
                        }
                        Jour
                      </span>
                    </div>
                  </div>
                </div>
              </button>
              <button className="offerconfig-center-left-options-card">
                <div className="offerconfig-center-left-options-card-self">
                  <div>
                    <i className="ico-satnav"></i>
                  </div>
                  <div>
                    <h3>SYSTÈME DE NAVIGATION GARANTI</h3>
                    <span>
                      {location.state.config.additionalCharges[3].description}
                    </span>
                    <div>
                      <span>
                        €
                        {
                          location.state.config.additionalCharges[3].price
                            .amount
                        }
                        Jour
                      </span>
                    </div>
                  </div>
                </div>
              </button>
              <button className="offerconfig-center-left-options-card">
                <div className="offerconfig-center-left-options-card-self">
                  <div>
                    <i className="ico-refill"></i>
                  </div>
                  <div>
                    <h3>VÉHICULE PRIS RÉSERVOIR PLEIN - RETOUR À VIDE</h3>
                    <span>
                      {location.state.config.additionalCharges[4].description}
                    </span>
                    <div>
                      <span>
                        €
                        {
                          location.state.config.additionalCharges[4].price
                            .amount
                        }
                        total
                      </span>
                    </div>
                  </div>
                </div>
              </button>
              <button className="offerconfig-center-left-options-card">
                <div className="offerconfig-center-left-options-card-self">
                  <div>
                    <i className="ico-wifi"></i>
                  </div>
                  <div>
                    <h3>SIXT CONNECT</h3>
                    <span>
                      {location.state.config.additionalCharges[5].description}
                    </span>
                    <div>
                      <span>
                        €
                        {
                          location.state.config.additionalCharges[5].price
                            .amount
                        }
                        jour
                      </span>
                    </div>
                  </div>
                </div>
              </button>
              <button className="offerconfig-center-left-options-card">
                <div className="offerconfig-center-left-options-card-self">
                  <div>
                    <i className="ico-personplusbig"></i>
                  </div>
                  <div>
                    <h3>CONDUCTEUR SUPPLÉMENTAIRE</h3>
                    <div>
                      <span>€ 31,27 jour</span>
                    </div>
                  </div>
                </div>
              </button>
              <button className="offerconfig-center-left-options-card">
                <div className="offerconfig-center-left-options-card-self">
                  <div>
                    <i className="ico-mailinvoice"></i>
                  </div>
                  <div>
                    <h3>ENVOI FACTURE PAR COURIER</h3>
                    <span>
                      {location.state.config.additionalCharges[6].description}
                    </span>
                    <div>
                      <span>
                        €
                        {
                          location.state.config.additionalCharges[6].price
                            .amount
                        }
                        jour
                      </span>
                    </div>
                  </div>
                </div>
              </button>
              <button className="offerconfig-center-left-options-card">
                <div className="offerconfig-center-left-options-card-self">
                  <div>
                    <i className="ico-sixt-logo-sm"></i>
                  </div>
                  <div>
                    <h3>PARKING PASS UNLIMITED</h3>

                    <div>
                      <span>€ 31,27 jour</span>
                    </div>
                  </div>
                </div>
              </button>
              <button className="offerconfig-center-left-options-card">
                <div className="offerconfig-center-left-options-card-self">
                  <div>
                    <i className="ico-childseat"></i>
                  </div>
                  <div>
                    <h3>PSIÈGES BÉBÉ</h3>
                    <div>
                      <span>
                        €
                        {
                          location.state.config.additionalCharges[7].price
                            .amount
                        }
                        jour
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
        <div className="offerconfig-center-right">
          <div>
            <div className="offerconfig-center-right-price">
              <span className="offerconfig-center-right-text">TOTAL</span>
              <span>
                {(
                  location.state.offer.prices.dayPrice.amount * result.days
                ).toFixed(2)}
              </span>
            </div>
            <div className="offerconfig-center-right-price">
              <span>Détails du prix - MODAL a faire</span>
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
