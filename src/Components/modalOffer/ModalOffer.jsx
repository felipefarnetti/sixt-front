//Packages
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./modalOffer.css";
import randomCar from "../../assets/img/randomphoto.png";

const ModalOffer = ({ item, days, close }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigate();

  useEffect(() => {
    fetchData(); //warning  React Hook useEffect has a missing dependency: 'fetchData'. Either include it or remove the dependency array
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.post(
        `https://site--six-back--4w9wbptccl4w.code.run/configuration-offre`,
        { offerId: item.id }
      );
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    navigation(`/OfferConfig`, {
      state: {
        config: data,
        offer: item,
        days: days,
      },
    });
  };

  //Ici j'ai le config data alors je pourrais utiliser calculateTotalPrice
  //mais dans offerlist (cardOffer) ??

  return (
    <div className="offerlist-modal">
      <div className="offerlist-modal-content">
        <div className="offerlist-modal-left">
          <div className="offerlist-modal-image">
            {!isLoading ? (
              data?.splashImages && data.splashImages.length > 0 ? (
                <Carousel
                  autoPlay={true}
                  interval={3000}
                  infiniteLoop={true}
                  showThumbs={false}
                >
                  {data.splashImages.map((carImage, index) => (
                    <div key={index}>
                      <img
                        className="offerlist-modal-image"
                        src={carImage}
                        alt={`carImage voiture ${index + 1}`}
                      />
                    </div>
                  ))}
                </Carousel>
              ) : (
                <img
                  className="offerlist-modal-image"
                  src={randomCar}
                  alt="random car"
                />
              )
            ) : null}

            <div className="offerlist-modal-toptext">
              <span>{item.headlines.description}</span>
              <span>{item.headlines.shortSubline}</span>
            </div>
            <div className="offerlist-modal-toptext-info">
              <span className="ico-maxPassengers">
                <span className="offerlist-modal-toptext-font">
                  {item.carGroupInfo.maxPassengers} Sièges
                </span>
              </span>
              <span className="ico-doors">
                <span className="offerlist-modal-toptext-font">
                  {item.carGroupInfo.doors} Portes
                </span>
              </span>
              <span className="ico-automatic">
                <span className="offerlist-modal-toptext-font">
                  {item.carGroupInfo.automatic === true
                    ? "Automatique"
                    : "Manual"}
                </span>
              </span>
              <span className="ico-baggage">
                <span className="offerlist-modal-toptext-font">
                  {item.carGroupInfo.baggage === 1
                    ? item.carGroupInfo.baggage + " Bagage"
                    : item.carGroupInfo.baggage + " Bagages"}
                </span>
              </span>
              <span className="ico-airCondition">
                <span className="offerlist-modal-toptext-font">
                  {item.carGroupInfo.airCondition} Climatisation
                </span>
              </span>
              <span className="ico-driverRequirements">
                <span className="offerlist-modal-toptext-font">
                  {item.carGroupInfo.driverMinAge} Ans
                </span>
              </span>
            </div>
          </div>
        </div>
        <div className="offerlist-modal-right">
          <div className="offerlist-modal-totalprice">
            <span>TOTAL </span>
            <span>€ {(item.prices.dayPrice.amount * days).toFixed(2)}</span>
          </div>
          <span className="offerlist-modal-taxes">Taxes incluses</span>
          <div>
            <button className="offerlist-modal-button" onClick={handleSubmit}>
              SÉLECTIONNER
            </button>
          </div>
        </div>
        <i className="ico-close offerlist-modal-close" onClick={close}></i>
      </div>
    </div>
  );
};
export default ModalOffer;
