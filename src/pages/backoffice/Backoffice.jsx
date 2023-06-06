//Packages
import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import "./backoffice.css";

const Backoffice = () => {
  const navigation = useNavigate();
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isConnected, setIsConnected] = useState(
    Cookies.get("token") === "connected"
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/backoffice", {
        password: password,
      });

      if (response.data.success) {
        Cookies.set("token", "connected", { expires: 1 });
        setIsConnected(true);
      } else {
        setErrorMessage("Mot de passe incorrect");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Une erreur s'est produite");
    }
  };

  const handleDisconnect = () => {
    Cookies.remove("token");
    setIsConnected(false);
    navigation("/backoffice");
  };

  return (
    <div className="backoffice-container">
      {!isConnected ? (
        <div>
          <div>
            <h1>🔑 Connexion au Backoffice 🔑</h1>
          </div>
          <div className="input-button-container">
            <form onSubmit={handleSubmit}>
              <input
                className="backoffice-input"
                type="password"
                name="password"
                id="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </form>
            <button className="backoffice-button" type="submit">
              Se Connecter
            </button>
          </div>

          {errorMessage && <p className="backoffice-error">{errorMessage}</p>}
        </div>
      ) : (
        <div className="backoffice-connected">
          <div>
            <h1>🔑 Backoffice Connecté 🔑</h1>
          </div>
          <p>Item 1</p>
          <p>Item 1</p>
          <p>Item 1</p>
          <p>Item 1</p>
          <p>Item 1</p>
          <p>Item 1</p>
          <button className="backoffice-button" onClick={handleDisconnect}>
            Se Déconnecter
          </button>
        </div>
      )}
    </div>
  );
};

export default Backoffice;
