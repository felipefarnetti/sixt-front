import "./App.css";
//Import des packages
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//import des composants
import Header from "./Components/header/Header";
import Footer from "./Components/footer/Footer";
//Import des pages
import Home from "./pages/home/Home";
import Offerlist from "./pages/offerlist/Offerlist";
import Offerconfig from "./pages/offerconfig/Offerconfig";
import Personaldetails from "./pages/personaldetails/Personaldetails/";
import Backoffice from "./pages/backoffice/Backoffice";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offerlist" element={<Offerlist />} />
        <Route path="/offerconfig" element={<Offerconfig />} />
        <Route path="/personaldetails" element={<Personaldetails />} />
        <Route path="/backoffice" element={<Backoffice />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
