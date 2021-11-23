import BackgroundIMG from "../../images/grass.png";
import PokemonIMG from "../../images/001.png";
import Type from "./Type";

const Card = () => {
  return (
    <div className="card">
      <div className="pictures">
        <div className="background">
          <img src={BackgroundIMG} alt="" />
        </div>
        <div className="pokemon">
          <img src={PokemonIMG} alt="" />
        </div>
      </div>
      <div className="info">
        <div className="icon"></div>
        <Type type="grass" />
        <Type type="poison" />
        <h2>#001</h2>
        <h3>Bulbasaur</h3>
      </div>
    </div>
  );
};

export default Card;
