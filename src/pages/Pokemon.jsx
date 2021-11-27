import { useParams } from "react-router-dom";

const Pokemon = () => {
  let { pokemon } = useParams();
  console.log(pokemon);

  return (
    <div>
      <p>AAAAAAAAaaaa</p>
    </div>
  );
};

export default Pokemon;
