//import des packages
import { useLocation, useNavigate } from "react-router-dom";

//import style et logo
import "./header.css";
import logo from "../../assets/img/sixt-logo.png";

const steps = [
  {
    pathname: "/offerlist",
    step: 1,
    title: "Sélection des véhicules",
  },
  {
    pathname: "/offerconfig",
    step: 2,
    title: "Protection et options",
  },
  {
    pathname: "/personaldetails",
    step: 3,
    title: "Conducteur",
  },
];

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getCurrentStep = () => {
    return steps.find((step) => step.pathname === location.pathname);
  };

  const currentStep = getCurrentStep();
  return (
    <div className="header-container">
      <img
        className="header-logo"
        src={logo}
        alt="logo sixt"
        onClick={() => {
          navigate("/");
        }}
      />
      {currentStep ? (
        <ul className="header-step">
          {steps.map((step, index) => {
            const isActive = step.pathname === currentStep.pathname;
            const isCompleted = currentStep.step > index + 1;
            return (
              <li
                className={`header-step ${
                  isActive || isCompleted ? "is-active" : ""
                }`}
                key={index}
              >
                {isCompleted ? "" : step.step} {step.title}
                {isActive && ""}
                {isCompleted && ""}
              </li>
            );
          })}
        </ul>
      ) : (
        <ul className="header-menu">
          <li
            className="header-item header-item-rent"
            onClick={() => {
              navigate("/");
            }}
          >
            RENT
          </li>
          <li className="header-item">SHARE</li>
          <li className="header-item">RIDE</li>
          <li className="header-item">
            SIXT+<span className="header-item-smaller">ABONNEMENT AUTO</span>
          </li>
        </ul>
      )}

      <div className="header-backoffice">
        <span className="ico-planet header-icon-size"></span>
        <span
          className="header-backoffice-text"
          onClick={() => {
            navigate("/backoffice");
          }}
        >
          BACKOFFICE
        </span>
      </div>
    </div>
  );
};

export default Header;
