import "./searchlocation.css";

import React, { useRef, useState } from "react";
import axios from "axios";
import AsyncSelect from "react-select/async";

const SearchLocation = () => {
  const timeOut = useRef();

  const loadOptions = (value, callback) => {
    try {
      if (timeOut.current) {
        clearTimeout(timeOut.current);
      }
      timeOut.current = setTimeout(async () => {
        const response = await axios.get(
          `http://localhost:3000/agences?q=${value}`
        );
        const agencesData = response.data;
        const formatedOptions = agencesData.map((agence) => {
          return { label: agence.subtitle, value: agence.id };
        });

        callback(formatedOptions);
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
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
          <AsyncSelect
            className="home-bloc-haut-form-place"
            cacheOptions
            loadOptions={loadOptions}
          />

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
    </>
  );
};

export default SearchLocation;
