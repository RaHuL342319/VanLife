import React from "react";

import { Link, useLocation, useParams } from "react-router-dom";
import { getVans } from "../../api";

const VanDetail = () => {
  const [van, setVan] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const { id } = useParams();

  const location = useLocation();

  React.useEffect(() => {
    const loadVan = async () => {
      setLoading(true);
      try {
        const data = await getVans(id);
        setVan(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadVan();
  }, [id]);

  // early return
  if (loading) {
    return <h1>Loading...</h1>;
  }

  // early return
  if (error) {
    return <h1>There was an Error: {error.message}</h1>;
  }

  const search = location.state?.search || "";
  const type = location.state?.type || "all";

  return (
    <div className="van-detail-container">
      <Link to={`..${search}`} className="back-button">
        &larr; <span>Back to {type} vans</span>
      </Link>

      {van ? (
        <div className="van-detail">
          <img src={van.imageUrl} />
          <i className={`van-type ${van.type} selected`}>{van.type}</i>
          <h2>{van.name}</h2>
          <p className="van-price">
            <span>${van.price}</span>/day
          </p>
          <p>{van.description}</p>
          <button className="link-button">Rent this van</button>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
};

export default VanDetail;
