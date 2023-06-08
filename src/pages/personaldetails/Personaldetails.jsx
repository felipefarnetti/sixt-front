//Packages
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { getNames } from "country-list";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

import "./personalDetails.css";

const Personaldetails = () => {
  const location = useLocation();
  const [phoneNumber, setPhoneNumber] = useState();
  // console.log(location.state);

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div className="personaldetails-container">
      <div className="personaldetails-title">
        <h1>INFORMATIONS PERSONNELLES</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="personaldetails-titles">
            <input
              type="radio"
              id="gender-male"
              value="M."
              {...register("gender", { required: false })}
            />
            <label htmlFor="gender-male">M.</label>

            <input
              type="radio"
              id="gender-female"
              value="Mme."
              {...register("gender", { required: false })}
            />
            <label htmlFor="gender-female">Mme.</label>
          </div>
          <div className="personaldetails-user">
            <div className="personaldetails-user-left">
              <input
                {...register("company", { required: false })}
                placeholder="Societé"
              />
              <input
                {...register("firstName", { required: true })}
                placeholder="Prénom *"
              />
              <input
                {...register("email", { required: true })}
                placeholder="Adresse email *"
              />
              <select {...register("country")}>
                {getNames().map((country, index) => {
                  return (
                    <option value={country} key={index}>
                      {country}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="personaldetails-user-right">
              <PhoneInput
                {...register("telephone", { required: true })}
                placeholder="Numéro de téléphone *"
                defaultCountry="FR"
                value={phoneNumber}
                onChange={setPhoneNumber}
              />
              <input type="submit" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Personaldetails;
