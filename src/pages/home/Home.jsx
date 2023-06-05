import "./home.css";
import hero1 from "../../assets/img/carousel/hero1.jpeg";
import hero2 from "../../assets/img/carousel/hero2.jpeg";
import hero3 from "../../assets/img/carousel/hero3.jpeg";
import middlePicture from "../../assets/img/sixt-in-the-world.png";

import React, { useState, useEffect } from "react";
// import { Button } from "@mui/material";
import axios from "axios";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Home = () => {
  const [agences, setAgences] = useState("");
  const [autocompleteOptions, setAutocompleteOptions] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchAutocompleteOptions = async () => {
      try {
        const response = await axios.get("http://localhost:3000/agences");
        const agencesData = response.data;
        setAutocompleteOptions(agencesData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAutocompleteOptions();
  }, []);

  useEffect(() => {
    let timer;

    const handleSearch = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/agences?q=${agences}`
        );

        const agencesData = response.data;
        setSearchResults(agencesData);
      } catch (error) {
        console.error(error);
      }
    };

    if (agences) {
      timer = setTimeout(() => {
        handleSearch();
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [agences]);

  const getAgences = (event) => {
    const searchTerm = event.target.value;
    setAgences(searchTerm);
  };

  const renderSearchResults = () => {
    return (
      <ul>
        {searchResults.map((result) => (
          <li key={result.id}>{result.title}</li>
        ))}
      </ul>
    );
  };

  const renderAutocompleteOptions = () => {
    return autocompleteOptions.map((option) => (
      <option key={option.id} value={option.label} />
    ));
  };

  return (
    <div className="home-container">
      <header className="home-bloc-haut">
        <div>
          <ul>
            <li className="home-bloc-haut-voitures">VOITURES</li>
            <li>UTILITAIRES</li>
          </ul>
        </div>
        <div>
          <span className="home-bloc-haut-retrait">Retrait et Retour</span>
          <span className="home-bloc-haut-depart">Date de départ</span>
          <span className="home-bloc-haut-retour">Date de retour</span>
        </div>
        <form className="home-bloc-haut-form">
          <input
            className="home-bloc-haut-form-place"
            type="text"
            list="agences"
            label="Agences"
            value={agences}
            onChange={getAgences}
          />
          <datalist id="agences">{renderAutocompleteOptions()}</datalist>
          <input
            className="home-bloc-haut-form-depart-date"
            type="date"
            label="Date de départ"
            id="departure-date"
            name="departure-date"
          />
          <input
            className="home-bloc-haut-form-depart-hour"
            type="time"
            label="Heure de départ"
            id="departure-time"
            name="departure-time"
          />
          <input
            className="home-bloc-haut-form-retour-date"
            type="date"
            label="Date de retour"
            id="return-date"
            name="return-date"
          />
          <input
            className="home-bloc-haut-form-retour-hour"
            type="time"
            label="Heure de retour"
            id="return-time"
            name="return-time"
          />
          <button className="home-bloc-haut-form-button" type="submit">
            VOIR LES OFFRES
          </button>
        </form>
      </header>
      <div className="home-search-results">
        {searchResults.length > 0 && (
          <>
            <h2>Search Results</h2>
            {renderSearchResults()}
          </>
        )}
      </div>
      <Carousel
        autoPlay={true}
        interval={5000}
        infiniteLoop={true}
        showThumbs={false}
      >
        <div>
          <img src={hero1} alt="Pub voiture premium" />
        </div>
        <div>
          <img src={hero2} alt="Pub réduction mobile" />
        </div>
        <div>
          <img src={hero3} alt="Pub abonnement auto" />
        </div>
      </Carousel>
      <div className="home-bloc-milieu">
        <div className="home-bloc-milieu-text">
          <span>LES AGENCES SIXT DANS LE MONDE</span>
        </div>
        <div>
          <img src={middlePicture} alt="Carte monde agences" />
          <button className="home-bloc-milieu-button">TROUVER L'AGENCE</button>
        </div>
      </div>

      <div className="home-bloc-bas">
        <span className="home-bloc-bas-text">TÉLÉCHARGEZ L'APP SIXT</span>
        <div className="home-bloc-bas-download">
          <button className="home-bloc-bas-button ico-apple-logo"></button>
          <button className="home-bloc-bas-button ico-google-logo"></button>
        </div>
        <div>
          <span className="home-bloc-bas-text">SUIVEZ-NOUS</span>
        </div>
        <div className="home-bloc-bas-social">
          <a
            href="https://www.facebook.com/SixtFrance"
            className="ico-fb-logo"
          ></a>
          <a href="https://twitter.com/SixtFR" className="ico-twitter-logo"></a>
          <a
            href="https://www.instagram.com/sixtfrance/"
            className="ico-instagram-logo"
          ></a>
          <a
            href="https://www.youtube.com/c/sixtlocation"
            className="ico-youtube-logo"
          ></a>
        </div>
      </div>
    </div>
  );
};

export default Home;
