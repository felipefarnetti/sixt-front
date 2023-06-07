import { useState } from "react";
import "./modalOptions.css";

const ModalOptions = ({
  selectedOptions,
  days,
  result,
  calculateTotalPrice,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };
  //   console.log(days);
  //   console.log(result);
  //   console.log(selectedOptions);

  return (
    <div>
      <i className="ico-chevron-right" onClick={handleOpenModal}>
        {" "}
        <span className="modal-details-price">Détails du prix</span>
      </i>

      {isOpen && (
        <div className="modal-options">
          <div className="modal-options-container">
            <div>
              <h1>DÉTAILS DU PRIX</h1>
            </div>
            <div>
              <h2>PÉRIODE DE LOCATION</h2>
            </div>
            <div className="modal-options-line">
              <span>
                Durée de location ({days} jours x{" "}
                {result.offer.prices.dayPrice.amount})
              </span>
              <span>
                € {(result.offer.prices.dayPrice.amount * days).toFixed(2)}
              </span>
            </div>
            <div>
              <h2>PROTECTION ET OPTIONS</h2>
            </div>
            <ul>
              {selectedOptions.map((option) => (
                <li className="modal-options-line" key={option.id}>
                  <span>{option.title}</span>
                  <span>
                    € {option.price.amount === 0 ? "0,00" : option.price.amount}
                  </span>
                </li>
              ))}
            </ul>
            <div>
              <h2>FRAIS</h2>
            </div>
            <ul>
              {result.config.extraFees.map((option) => (
                <li className="modal-options-line" key={option.id}>
                  <span>{option.title}</span>
                  <span>
                    € {option.price.amount === 0 ? "0,00" : option.price.amount}
                  </span>
                </li>
              ))}
            </ul>
            <div className="modal-options-total">
              <h2>TOTAL</h2>
              <span>{calculateTotalPrice()}</span>
            </div>
            <div className="modal-options-total-taxes">
              <span>Taxes incluses</span>
            </div>

            <div className="modal-options-close" onClick={handleCloseModal}>
              <i className="ico-close"></i>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalOptions;
