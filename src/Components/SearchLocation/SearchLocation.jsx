import "../../Components/SearchLocation/searchlocation.css";
//
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AsyncSelect from "react-select/async";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";

const SearchLocation = ({ defaultValues, onChange }) => {
  const [pickupDate, setPickupDate] = useState(
    defaultValues?.pickupDate ? dayjs(defaultValues.pickupDate) : null
  );
  const [returnDate, setReturnDate] = useState(
    defaultValues?.returnDate ? dayjs(defaultValues.returnDate) : null
  );
  const [selectedPickupStation, setSelectedPickupStation] = useState(
    defaultValues?.pickupStation
      ? {
          label: defaultValues.pickupLocation,
          value: defaultValues.pickupStation,
        }
      : null
  );
  const timeOut = useRef(); // pas vu en cours
  const navigation = useNavigate();
  const loadOptions = (value, callback) => {
    try {
      if (timeOut.current) {
        clearTimeout(timeOut.current);
      }
      timeOut.current = setTimeout(async () => {
        if (value.length > 3) {
          const response = await axios.get(
            `http://localhost:3000/agences?q=${value}`
          );
          const agencesData = response.data;
          const formatedOptions = agencesData.map((agence) => {
            return { label: agence.subtitle, value: agence.id };
          });

          callback(formatedOptions);
        }
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  };
  const selectorStyle = {
    control: (provided) => ({
      ...provided,
      height: "50px",
    }),
  };

  useEffect(() => {
    if (onChange && selectedPickupStation && pickupDate && returnDate) {
      onChange(
        selectedPickupStation,
        pickupDate.toISOString(),
        returnDate.toISOString()
      );
    }
  }, [selectedPickupStation, pickupDate, returnDate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    navigation(
      `/Offerlist?station=${selectedPickupStation.value}&location=${
        selectedPickupStation.label
      }&pickupdate=${pickupDate.toISOString()}&returndate=${returnDate.toISOString()}`
    );
  };

  return (
    <>
      <header className="home-bloc-haut">
        <ul>
          <li className="home-bloc-haut-voitures">VOITURES</li>
          <li>UTILITAIRES</li>
        </ul>
        <div>
          <span className="home-bloc-haut-retrait">Retrait et Retour</span>
          <span className="home-bloc-haut-depart">Date de départ</span>
          <span className="home-bloc-haut-retour">Date de retour</span>
        </div>
        <form className="home-bloc-haut-form" onSubmit={handleSubmit}>
          <AsyncSelect
            className="home-bloc-haut-form-place"
            cacheOptions
            loadOptions={loadOptions}
            styles={selectorStyle}
            value={selectedPickupStation}
            onChange={setSelectedPickupStation}
          />
          <div style={{ background: "white" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                onChange={(value) => {
                  setPickupDate(value);
                }}
                minDate={dayjs().startOf("day")}
                minTime={dayjs().set("hour", 8)}
                maxTime={dayjs().set("hour", 18)}
                ampm={false}
                minutesStep={30}
                skipDisabled={true}
                format="DD/MM/YYYY HH:mm"
                className="home-bloc-haut-form-date"
                {...(defaultValues?.pickupDate && {
                  defaultValue: dayjs(defaultValues.pickupDate),
                })}
              />
              <DateTimePicker
                onChange={(value) => {
                  setReturnDate(value);
                }}
                minDate={pickupDate ? dayjs(pickupDate) : dayjs()}
                minTime={dayjs().set("hour", 8)}
                maxTime={dayjs().set("hour", 18)}
                ampm={false}
                minutesStep={30}
                skipDisabled={true}
                format="DD/MM/YYYY HH:mm"
                className="home-bloc-haut-form-date"
                {...(defaultValues?.returnDate && {
                  defaultValue: dayjs(defaultValues.returnDate),
                })}
              />
            </LocalizationProvider>
          </div>

          {!defaultValues && (
            <button
              className="home-bloc-haut-form-button"
              type="submit"
              disabled={!pickupDate || !returnDate || !selectedPickupStation}
            >
              VOIR LES OFFRES
            </button>
          )}
        </form>
      </header>
    </>
  );
};

export default SearchLocation;
