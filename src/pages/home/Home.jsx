import "./home.css";
import hero1 from "../../assets/img/carousel/hero1.jpeg";
import hero2 from "../../assets/img/carousel/hero2.jpeg";
import hero3 from "../../assets/img/carousel/hero3.jpeg";
import middlePicture from "../../assets/img/sixt-in-the-world.png";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import SearchLocation from "../../Components/SearchLocation/SearchLocation";

const Home = () => {
  return (
    <div className="home-container">
      <SearchLocation />
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
