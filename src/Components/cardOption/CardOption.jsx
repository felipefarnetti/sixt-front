import "./cardOption.css";

const CardOption = ({ item, onChange, isActive }) => {
  const handleChange = () => {
    onChange();
  };

  return (
    <div
      className={`options-card ${isActive ? "is-active" : ""}`}
      onClick={handleChange}
    >
      <div className="options-card-self">
        <div>
          <i className={item.icon}></i>
        </div>
        <div className="options-card-price">
          <h3>{item.title}</h3>
          <span>{item.description}</span>
          <div>
            <span className="options-card-amount">
              €{item.price.amount}
              <span className="options-card-price-title">
                {item.price.unit === "jour" ? "Jour" : "Total"}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardOption;
