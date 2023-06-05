import "./offerlist.css";

import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

import SearchLocation from "../../Components/SearchLocation/SearchLocation";

const Offerlist = () => {
  const [result, setResult] = useState({
    data: [],
    isLoading: true,
  });
  const location = useLocation();
  const queryParameters = new URLSearchParams(location.search);
  const pickupStation = queryParameters.get("station");
  const pickupLocation = queryParameters.get("location");
  const pickupDate = queryParameters.get("pickupdate");
  const returnDate = queryParameters.get("returndate");

  useEffect(() => {
    fetchData(pickupStation, pickupDate, returnDate);
  }, []);

  const fetchData = async (pickupStation, pickupDate, returnDate) => {
    try {
      setResult((prevstate) => ({
        ...prevstate,
        isLoading: true,
      }));
      const response = await axios.get(`http://localhost:3000/offres`, {
        params: {
          pickupStation,
          returnStation: pickupStation,
          pickupDate,
          returnDate,
        },
      });

      setResult((prevstate) => ({
        ...prevstate,
        data: response.data,
        isLoading: false,
      }));
    } catch (error) {
      console.error(error);
      setResult((prevstate) => ({
        ...prevstate,
        isLoading: false,
      }));
    }
  };

  const onChange = (pickupStation, pickupDate, returnDate) => {
    window.history.replaceState(
      {},
      "",
      `/Offerlist?station=${pickupStation.value}&location=${pickupStation.label}&pickupdate=${pickupDate}&returndate=${returnDate}`
    );
    fetchData(pickupStation.value, pickupDate, returnDate);
  };

  /// Modal pour afficher les détails
  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = (item) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  return (
    <div className="offerlist-container">
      <SearchLocation
        defaultValues={{
          pickupLocation,
          pickupStation,
          pickupDate,
          returnDate,
        }}
        onChange={onChange}
      />
      {result.isLoading ? (
        <p> Chargement en cours </p>
      ) : result.data.length === 0 ? (
        <p> aucun résultat </p>
      ) : (
        <div>
          <div className="offerlist-filter">
            <span style={{ fontSize: "22px" }}>
              {result.data.length}
              <span style={{ fontSize: "14px" }}> OFFRES</span>
              <span>FILTRE A RAJOUTER</span>
            </span>
          </div>
          <div className="offerlist-cards">
            {result.data.map((item) => {
              return (
                <div
                  className="offerlist-card"
                  key={item.id}
                  onClick={() => openModal(item)}
                >
                  <span className="offerlist-cards-title ">
                    {item.headlines.description}
                  </span>
                  <div className="offerlist-cards-title-subline">
                    {item.headlines.shortSubline}
                  </div>
                  <img
                    className="offerlist-cards-image"
                    src={item.images.small}
                    alt="image voiture"
                  />
                  <div className="ico-bullet-sm offerlist-cards-mileage">
                    <span className="offerlist-cards-mileage">
                      {item.headlines.mileageInfo}
                    </span>
                  </div>
                  <div className="offerlist-cards-price">
                    € {item.prices.dayPrice.amount}
                    <span style={{ fontSize: "12px" }}> jour</span>
                  </div>
                  <div className="offerlist-cards-totalprice">TOTAL PRICE</div>
                </div>
              );
            })}
          </div>
          {selectedItem && (
            <div className="offerlist-modal">
              <div className="offerlist-modal-content">
                <h2>{selectedItem.headlines.description}</h2>
                <div>{selectedItem.headlines.shortSubline}</div>
                <img
                  src={selectedItem.images.small}
                  alt="image voiture"
                  className="offerlist-modal-image"
                />
                <div className="ico-bullet-sm offerlist-cards-mileage">
                  <span className="offerlist-cards-mileage">
                    {selectedItem.headlines.mileageInfo}
                  </span>
                </div>
                <div className="offerlist-cards-price">
                  € {selectedItem.prices.dayPrice.amount}
                  <span style={{ fontSize: "12px" }}> jour</span>
                </div>
                <i
                  className="ico-close offerlist-modal-close"
                  onClick={closeModal}
                ></i>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Offerlist;
