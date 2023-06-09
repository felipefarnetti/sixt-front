import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { getNames } from "country-list";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

const DataForm = ({ onSubmit }) => {
  const [phoneNumber, setPhoneNumber] = useState();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isValid },
  } = useForm({ mode: "onChange" });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="personaldetails-titles">
        <label htmlFor="gender-male">
          <input
            type="radio"
            id="gender-male"
            value="M."
            {...register("gender", { required: true })}
          />{" "}
          M.
        </label>
        <label htmlFor="gender-female">
          <input
            type="radio"
            id="gender-female"
            value="Mme."
            {...register("gender", { required: true })}
          />{" "}
          Mme.
        </label>
        <span>*</span>
      </div>
      <div className="personaldetails-user">
        <div className="personaldetails-user-left">
          <input
            className="personaldetails-inputs"
            {...register("company", { required: false })}
            placeholder="Societé"
            type="string"
          />
          <input
            className="personaldetails-inputs"
            {...register("firstName", { required: true })}
            placeholder="Prénom *"
            type="string"
          />
          <input
            className="personaldetails-inputs"
            {...register("email", {
              required: true,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Adresse email invalide",
              },
            })}
            placeholder="Adresse email *"
            type="email"
          />

          <input
            className="personaldetails-inputs"
            {...register("street", { required: true })}
            placeholder="Rue *"
            type="string"
          />
          <select
            {...register("country")}
            defaultValue="France"
            className="personaldetails-inputs"
          >
            {getNames().map((country, index) => {
              return (
                <option value={country} key={index}>
                  {country}
                </option>
              );
            })}
          </select>
          <span className="personaldetails-birthday-text">
            DATE DE NAISSANCE
          </span>
          <input
            className="personaldetails-birthday-input"
            {...register("birthDate", { required: true })}
            type="date"
            min="1900-01-01"
            max="2004-01-01"
            onChange={(element) =>
              setValue("birthDate", element.target.value.toString())
            }
          />
        </div>

        <div className="personaldetails-user-right">
          <input
            className="personaldetails-inputs"
            {...register("lastName", { required: true })}
            placeholder="Nom de famille *"
            type="string"
          />
          <PhoneInput
            className="personaldetails-inputs personaldetails-phone"
            style={{
              outline: "none",
              textDecoration: "none",
            }}
            {...register("phoneNumber", { required: true })}
            placeholder="Numéro de téléphone *"
            defaultCountry="FR"
            value={phoneNumber}
            onChange={setPhoneNumber}
          />
          <input
            className="personaldetails-inputs"
            {...register("zipCode", { required: true })}
            placeholder="Code postal *"
            type="text"
            minLength={5}
            maxLength={9}
          />
          <input
            className="personaldetails-inputs"
            {...register("city", { required: true })}
            placeholder="Ville *"
            type="string"
          />
        </div>
      </div>
    </form>
  );
};

export default DataForm;
