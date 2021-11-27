import { useCallback, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import useFetch from "../hooks/useFetch";

// import Card from "../components/discover/Card";

const Explorer = () => {
  const data = useFetch();

  useEffect(() => {
    console.log(data);
  }, [data]);

  return <div>{}</div>;
};

export default Explorer;
