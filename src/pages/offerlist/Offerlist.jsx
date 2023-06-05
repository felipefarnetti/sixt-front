import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

import SearchLocation from "../../Components/SearchLocation/SearchLocation";

const Offerlist = () => {
  const [result, setResult] = useState({
    data: [],
    isLoading: true,
  });
  const location = useLocation();
  const queryParameters = new URLSearchParams(location.search);
  const pickupStation = queryParameters.get("station");
  const pickupLocation = queryParameters.get("location");
  const pickupDate = queryParameters.get("pickupdate");
  const returnDate = queryParameters.get("returndate");

  useEffect(() => {
    fetchData(pickupStation, pickupDate, returnDate);
  }, []);

  const fetchData = async (pickupStation, pickupDate, returnDate) => {
    try {
      setResult((prevstate) => ({
        ...prevstate,
        isLoading: true,
      }));
      const response = await axios.get(`http://localhost:3000/offres`, {
        params: {
          pickupStation,
          returnStation: pickupStation,
          pickupDate,
          returnDate,
        },
      });
      setResult((prevstate) => ({
        ...prevstate,
        data: response.data,
        isLoading: false,
      }));
    } catch (error) {
      console.error(error);
      setResult((prevstate) => ({
        ...prevstate,
        isLoading: false,
      }));
    }
  };
  const onChange = (pickupStation, pickupDate, returnDate) => {
    window.history.replaceState(
      {},
      "",
      `/Offerlist?station=${pickupStation.value}&location=${pickupStation.label}&pickupdate=${pickupDate}&returndate=${returnDate}`
    );
    fetchData(pickupStation.value, pickupDate, returnDate);
  };

  return (
    <div>
      <SearchLocation
        defaultValues={{
          pickupLocation,
          pickupStation,
          pickupDate,
          returnDate,
        }}
        onChange={onChange}
      />
      {result.isLoading ? (
        <p> Chargement en cours </p>
      ) : result.data.length === 0 ? (
        <p> aucun résultat </p>
      ) : (
        <div>
          {result.data.map((item) => {
            return <div key={item.id}>{item.headlines.description}</div>;
          })}
        </div>
      )}
    </div>
  );
};

export default Offerlist;
