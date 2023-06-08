// //Packages
// import { useForm } from "react-hook-form";
// import { getNames } from "country-list";
// import { useState } from "react";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";

// import "./dataForm.css";

// const DataForm = ({ onSubmit }) => {
//   const [phoneNumber, setPhoneNumber] = useState();
//   const { register, handleSubmit } = useForm();
//   // const onSubmit = (data) => console.log(data);

//   const handleFormSubmit = (data) => {
//     onSubmit(data);
//   };

//   return (
//     <div className="form-container">
//       <form onSubmit={handleSubmit(handleFormSubmit)}>
//         <div className="personaldetails-titles">
//           <label htmlFor="gender-male">
//             <input
//               type="radio"
//               id="gender-male"
//               value="M."
//               {...register("gender", { required: true })}
//             />{" "}
//             M.
//           </label>

//           <label htmlFor="gender-female">
//             <input
//               type="radio"
//               id="gender-female"
//               value="Mme."
//               {...register("gender", { required: true })}
//             />{" "}
//             Mme.
//           </label>
//           <span>*</span>
//         </div>
//         <div className="personaldetails-user">
//           <div className="personaldetails-user-left">
//             <input
//               className="personaldetails-inputs"
//               {...register("company", { required: false })}
//               placeholder="Societé"
//               type="string"
//             />
//             <input
//               className="personaldetails-inputs"
//               {...register("firstName", { required: true })}
//               placeholder="Prénom *"
//               type="string"
//             />
//             <input
//               className="personaldetails-inputs"
//               {...register("email", { required: true })}
//               placeholder="Adresse email *"
//               type="email"
//             />
//             <input
//               className="personaldetails-inputs"
//               {...register("street", { required: true })}
//               placeholder="Rue *"
//               type="string"
//             />
//             <select
//               {...register("country")}
//               defaultValue="France"
//               className="personaldetails-inputs"
//             >
//               {getNames().map((country, index) => {
//                 return (
//                   <option value={country} key={index}>
//                     {country}
//                   </option>
//                 );
//               })}
//             </select>
//             <span className="personaldetails-birthday-text">
//               DATE DE NAISSANCE
//             </span>
//             <input
//               className="personaldetails-birthday-input"
//               {...register("birthday", { required: true })}
//               type="date"
//               min="1900-01-01"
//               max="2004-01-01"
//             />
//           </div>

//           <div className="personaldetails-user-right">
//             <input
//               className="personaldetails-inputs"
//               {...register("lastName", { required: true })}
//               placeholder="Nom de famille *"
//               type="string"
//             />
//             <PhoneInput
//               className="personaldetails-inputs personaldetails-phone"
//               {...register("telephone", { required: true })}
//               placeholder="Numéro de téléphone *"
//               country="fr"
//               value={phoneNumber}
//               onChange={setPhoneNumber}
//             />
//             <input
//               className="personaldetails-inputs"
//               {...register("zipCode", { required: true })}
//               placeholder="Code postal *"
//               type="text"
//               minLength={5}
//               maxLength={9}
//             />
//             <input
//               className="personaldetails-inputs"
//               {...register("city", { required: true })}
//               placeholder="Ville *"
//               type="string"
//             />
//             {/* <input type="submit" /> */}
//           </div>
//         </div>
//       </form>
//       <button
//         className="personaldetails-button"
//         type="submit"
//         onClick={handleSubmit(handleFormSubmit)}
//       >
//         RÉSERVER
//       </button>
//     </div>
//   );
// };

// export default DataForm;
