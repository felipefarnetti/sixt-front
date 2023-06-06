import "./cardOffer.css";
import { useState } from "react";
import ModalOffer from "../modalOffer/ModalOffer";

const CardOffer = ({ item, days }) => {
  /// Modal pour afficher recaptulatif
  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = (item) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  return (
    <>
      <div className="offerlist-card" onClick={() => openModal(item)}>
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
        <div className="offerlist-cards-totalprice">
          € {(item.prices.dayPrice.amount * days).toFixed(2)}
        </div>
      </div>
      {selectedItem && (
        <ModalOffer item={selectedItem} close={closeModal} days={days} />
      )}
    </>
  );
};

export default CardOffer;
