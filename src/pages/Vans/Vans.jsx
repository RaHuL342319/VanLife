import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getVans } from "../../api";

const Vans = () => {
  const [vans, setVans] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const typeFilter = searchParams.get("type");

  React.useEffect(() => {
    const loadVans = async () => {
      setLoading(true);
      try {
        const data = await getVans();
        setVans(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadVans();
  }, []);

  const displayedVans = typeFilter
    ? vans.filter((van) => van.type === typeFilter)
    : vans;

  //   console.log(vans);
  const vanElements = displayedVans.map((van) => (
    <div key={van.id} className="van-tile">
      <Link
        to={`${van.id}`}
        state={{ search: `?${searchParams}`, type: typeFilter }}
      >
        <img src={van.imageUrl} />
        <div className="van-info">
          <h3>{van.name}</h3>
          <p>
            ${van.price}
            <span>/day</span>
          </p>
        </div>
        <i className={`van-type ${van.type} selected`}>{van.type}</i>
      </Link>
    </div>
  ));

  // function genNewSearchParamString(key, value) {
  //   const sp = new URLSearchParams(searchParams);
  //   if (value === null) {
  //     sp.delete(key);
  //   } else {
  //     sp.set(key, value);
  //   }
  //   return `?${sp.toString()}`;
  // }

  const handleSearch = (key, value) => {
    setSearchParams((prevParams) => {
      if (value === null) {
        prevParams.delete(key);
      } else {
        prevParams.set(key, value);
      }
      return prevParams;
    });
  };

  // early return
  if (loading) {
    return <h1>Loading...</h1>;
  }

  // early return
  if (error) {
    return <h1>There was an Error: {error.message}</h1>;
  }

  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>
      {/* <div className="van-list-filter-buttons">
        <Link
          to={genNewSearchParamString("type", "simple")}
          className={`van-type simple ${
            typeFilter === "simple" ? "selected" : ""
          }`}
        >
          Simple
        </Link>
        <Link
          to={genNewSearchParamString("type", "luxury")}
          className={`van-type luxury ${
            typeFilter === "luxury" ? "selected" : ""
          }`}
        >
          Luxury
        </Link>
        <Link
          to={genNewSearchParamString("type", "rugged")}
          className={`van-type rugged ${
            typeFilter === "rugged" ? "selected" : ""
          }`}
        >
          Rugged
        </Link>
        <Link
          to={genNewSearchParamString({})}
          className="van-type clear-filters"
        >
          Clear filter
        </Link>
      </div> */}

      <div className="van-list-filter-buttons">
        <button
          className={`van-type simple ${
            typeFilter === "simple" ? "selected" : ""
          }`}
          onClick={() => handleSearch("type", "simple")}
        >
          Simple
        </button>
        <button
          className={`van-type luxury ${
            typeFilter === "luxury" ? "selected" : ""
          }`}
          onClick={() => handleSearch("type", "luxury")}
        >
          Luxury
        </button>
        <button
          className={`van-type rugged ${
            typeFilter === "rugged" ? "selected" : ""
          }`}
          onClick={() => handleSearch("type", "rugged")}
        >
          Rugged
        </button>
        {typeFilter ? (
          <button
            className="van-type clear-filters"
            onClick={() => handleSearch("type", null)}
          >
            Clear filter
          </button>
        ) : null}
      </div>
      <div className="van-list">{vanElements}</div>
    </div>
  );
};

export default Vans;
