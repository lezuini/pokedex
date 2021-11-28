import { useCallback, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import CardGenerator from "../components/explorer/CardGenerator";

// import useFetch from "../hooks/useFetch";

const DEFAULT_OFFSET = 0;
const DEFAULT_LIMIT = 5;

const Explorer = () => {
  /*
    Consultar por default los primeros 5 pokemones
  */

  // URL Search Parameters
  let [searchParams, setSearchParams] = useSearchParams();

  // Function that gets search parameters
  const getParam = (name) => {
    let param = searchParams.get(name);

    if (param !== null) {
      return parseInt(param);
    } else {
      return null;
    }
  };

  const getParamCB = useCallback(getParam, [searchParams]);

  // Variables that control how many pokemon are consulted
  const [offset, setOffset] = useState(
    getParam("offset") ? getParam("offset") : DEFAULT_OFFSET
  );
  const [limit, setLimit] = useState(
    getParam("limit") ? getParam("limit") : DEFAULT_LIMIT
  );

  // Automatically update control variables when URL changes
  useEffect(() => {
    let paramOffset = getParamCB("offset");
    let paramLimit = getParamCB("limit");

    if (paramOffset !== null) {
      setOffset(paramOffset);
    } else {
      setOffset(DEFAULT_OFFSET);
    }

    if (paramLimit !== null) {
      setLimit(paramLimit);
    } else {
      setLimit(DEFAULT_LIMIT);
    }
  }, [getParamCB]);

  // CSS Response UX
  const [loading, setLoading] = useState(true);

  // API stuff
  const [maxNumberOfResults, setMaxNumberOfResults] = useState(1118);

  // API Data
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setData(json);
      });
  }, [offset, limit]);

  const goForward = () => {
    setSearchParams({
      offset: offset + limit,
      limit: limit,
    });
  };

  const goBack = () => {
    if (offset - limit >= 0) {
      setSearchParams({
        offset: offset - limit,
        limit: limit,
      });
    } else {
      setSearchParams({
        offset: DEFAULT_OFFSET,
        limit: limit,
      });
    }
  };

  return (
    <div>
      <CardGenerator data={data} />

      <nav>
        <Link to="/">Inicio</Link>
        <button onClick={goBack}>Atras</button>
        <button onClick={goForward}>Adelante</button>
      </nav>
    </div>
  );
};

export default Explorer;
