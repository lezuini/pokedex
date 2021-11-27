import { Routes, Route } from "react-router-dom";

import "./App.scss";

import Explorer from "./pages/Explorer";
import Pokemon from "./pages/Pokemon";

function App() {
  // useEffect(() => {
  //   fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20/")
  //     .then((res) => res.json())
  //     .then((json) => {
  //       if (json.message) {
  //         // In case there are additional problems
  //         throw new Error(json.message);
  //       } else {
  //         console.log(json);
  //         // setData(json);
  //         // setLoading(false);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       // setError(true);
  //       // setLoading(false);
  //     });
  // }, []);

  return (
    <Routes>
      <Route path="/" element={<Explorer />} />
      <Route path=":pokemon" element={<Pokemon />} />
    </Routes>
  );
}

export default App;
