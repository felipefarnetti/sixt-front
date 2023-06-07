import "./personalDetails.css";

const Personaldetails = ({ selectedOptions, result }) => {
  console.log(result);
  console.log(selectedOptions);
  return (
    <div className="personaldetails-container">
      <div className="personaldetails-title">
        <h1>INFORMATIONS PERSONNELLES</h1>
      </div>
    </div>
  );
};

export default Personaldetails;
