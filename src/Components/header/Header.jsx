//import des packages
import { useNavigate } from "react-router-dom";

//import style et logo
import "./header.css";
import logo from "../../assets/img/sixt-logo.png";

const Header = () => {
  const navigate = useNavigate();
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
