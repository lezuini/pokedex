// This hook will be in charge of consulting the endpoints of the API...

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

/*
  Possible cases:
  - Open page for the first time:

    The hook should not have any parameters


  - Open page in explorer with custom limits:

    The hook should know what the limit is and the offset


  - Open page with a pokemon as parameter:

    The hook should know what the pokemon is

*/

const API = "https://pokeapi.co/api/v2/";
let ENDPOINT = "pokemon";

const useFetch = () => {
  let [searchParams, setSearchParams] = useSearchParams();

  const getParam = (name) => {
    let param = searchParams.get(name);

    if (param !== null) {
      return parseInt(param);
    } else {
      return null;
    }
  };

  const getParamCallback = useCallback(getParam, [searchParams]);

  const [offset, setOffset] = useState(getParamCallback("offset"));
  const [limit, setLimit] = useState(getParamCallback("limit"));

  useEffect(() => {
    setOffset(getParamCallback("offset"));
    setLimit(getParamCallback("limit"));
  }, [getParamCallback]);

  const [options, setOptions] = useState({
    offset,
    limit,
  });

  useEffect(() => {
    setOptions({
      offset,
      limit,
    });
  }, [offset, limit]);

  const [resp, setResp] = useState(null);

  useEffect(() => {
    let url = API + ENDPOINT + "/";

    if (options.pokemon) {
      url += options.pokemon;
    } else if (options.offset !== undefined && options.limit !== undefined) {
      url += `?offset=${options.offset}&limit=${options.limit}`;
    }

    console.log(url);

    fetch(url)
      .then((res) => res.json())
      .then((json) => setResp(json));
  }, [options]);

  return resp;
};

export default useFetch;
