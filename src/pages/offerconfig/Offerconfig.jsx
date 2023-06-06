import "./offerConfig.css";

//packages
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
//pages
import SearchLocation from "../../Components/SearchLocation/SearchLocation";

const Offerconfig = () => {
  // const [result, setResult] = useState({
  //   data: [],
  //   initialData: [],
  //   isLoading: true,
  // });
  // const location = useLocation();
  // const queryParameters = new URLSearchParams(location.search);
  // const pickupStation = queryParameters.get("station");
  // const pickupLocation = queryParameters.get("location");
  // const pickupDate = queryParameters.get("pickupdate");
  // const returnDate = queryParameters.get("returndate");

  // useEffect(() => {
  //   fetchData(pickupStation, pickupDate, returnDate);
  // }, []);

  // // const fetchData = async () => {
  // //   try {
  // //     const response = await axios.post(
  // //       `https://site--six-back--4w9wbptccl4w.code.run/configuration-offre`,
  // //       { offerId: item.id }
  // //     );
  // //     setData(response.data);
  // //   } catch (error) {
  // //     console.error(error);
  // //   }
  // // };

  return (
    <div className="offerconfig-container">
      <div>
        {/* <SearchLocation
          defaultValues={{
            pickupLocation,
            pickupStation,
            pickupDate,
            returnDate,
          }}
          onChange={onChange}
        /> */}
      </div>
    </div>
  );
};

export default Offerconfig;
