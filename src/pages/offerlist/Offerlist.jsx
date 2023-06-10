//packages import
import Select from "react-select";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
//components import
import SearchLocation from "../../Components/SearchLocation/SearchLocation";
import CardOffer from "../../Components/cardOffer/CardOffer";

import "./offerlist.css";

//Car types filter options
const carOptions = [
  { label: "CONVERTIBLE", value: "Cabriolet" },
  { label: "BERLINE", value: "Berline" },
  { label: "SUV", value: "SUV" },
  { label: "COUPÉ", value: "Coupé" },
  { label: "PICKUP", value: "Pick-up" },
];

const Offerlist = () => {
  const [result, setResult] = useState({
    data: [],
    initialData: [],
    isLoading: true,
  });
  const location = useLocation();
  const queryParameters = new URLSearchParams(location.search);
  const pickupStation = queryParameters.get("station");
  const pickupLocation = queryParameters.get("location");
  const pickupDate = queryParameters.get("pickupdate");
  const returnDate = queryParameters.get("returndate");
  const [days, setDays] = useState();

  //UseEffect to render when fetchdata is called
  useEffect(() => {
    fetchData(pickupStation, pickupDate, returnDate);
  }, []);

  // Fetch data from the API
  const fetchData = async (pickupStation, pickupDate, returnDate) => {
    try {
      setResult((prevstate) => ({
        ...prevstate,
        isLoading: true,
      }));
      const response = await axios.get(
        `https://site--six-back--4w9wbptccl4w.code.run/offres`,
        {
          params: {
            pickupStation: pickupStation,
            returnStation: pickupStation,
            pickupDate: pickupDate,
            returnDate: returnDate,
          },
        }
      );
      setDays(calculateDays(pickupDate, returnDate));
      setResult((prevstate) => ({
        ...prevstate,
        data: response.data,
        initialData: response.data,
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
  //On changing on of the arguments it reaplaces the web adress on browser
  const onChange = (pickupStation, pickupDate, returnDate) => {
    window.history.replaceState(
      {},
      "",
      `/offerlist?station=${pickupStation.value}&location=${pickupStation.label}&pickupdate=${pickupDate}&returndate=${returnDate}`
    );
    fetchData(pickupStation.value, pickupDate, returnDate);
  };
  //Filter car types function
  const handleFilters = (filters) => {
    const filterValues = filters.map((filter) => filter.value);
    console.log(filterValues);
    setResult((prevstate) => ({
      ...prevstate,
      isLoading: true,
    }));
    //Timeout to  ????
    setTimeout(() => {
      if (filterValues.length === 0) {
        setResult((prevstate) => ({
          ...prevstate,
          data: prevstate.initialData,
          isLoading: false,
        }));
        return;
      }
      setResult((prevstate) => ({
        ...prevstate,
        data: prevstate.initialData.filter((item) => {
          console.log(item.carGroupInfo.bodyStyle);
          return filterValues.indexOf(item.carGroupInfo.bodyStyle) !== -1;
        }),
        isLoading: false,
      }));
    }, 500);
  };
  //calculate the number of days based on 24H
  const calculateDays = (pickupDate, returnDate) => {
    const date1 = new Date(pickupDate);
    const date2 = new Date(returnDate);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="offerlist-container">
      <>
        {/* Search component */}
        <SearchLocation
          defaultValues={{
            pickupLocation,
            pickupStation,
            pickupDate,
            returnDate,
          }}
          onChange={onChange}
        />
        <div className="offerlist-filter">
          <span style={{ fontSize: "22px" }}>
            {result.data.length}
            <span style={{ fontSize: "14px" }}> OFFRES</span>
          </span>
          {/* Filter car models */}
          <Select
            isMulti
            name="options"
            options={carOptions}
            onChange={handleFilters}
            className="offerlist-filter-select"
            classNamePrefix="select"
          />
        </div>
      </>
      {result.isLoading ? (
        <p> Chargement en cours </p>
      ) : result.data.length === 0 ? (
        <p> aucun résultat </p>
      ) : (
        <div>
          <div className="offerlist-cards">
            {result.data.map((item) => {
              {
                /* Component CardOffer to map the avaiblables cars in selected agency */
              }
              return <CardOffer key={item.id} item={item} days={days} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Offerlist;
