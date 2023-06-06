import "./backoffice.css";

const Backoffice = () => {
  return (
    <div className="backoffice-container">
      <div>
        <h1>Sixt Backoffice</h1>
      </div>
      <div>
        <form action="">
          <input
            className="backoffice-input"
            type="password"
            name="password"
            id="password"
            placeholder="Rentrer votre mot de passe"
          />
          <button className="backoffice-button" type="submit">
            Se Connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Backoffice;
