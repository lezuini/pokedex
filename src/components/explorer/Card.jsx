import bgBug from "../../images/backgrounds/bug.jpg";
import bgDark from "../../images/backgrounds/dark.jpg";
import bgDragon from "../../images/backgrounds/dragon.jpg";
import bgElectric from "../../images/backgrounds/electric.jpg";
import bgFairy from "../../images/backgrounds/fairy.jpg";
import bgFighting from "../../images/backgrounds/fighting.jpg";
import bgFire from "../../images/backgrounds/fire.jpg";
import bgFlying from "../../images/backgrounds/flying.jpg";
import bgGhost from "../../images/backgrounds/ghost.jpg";
import bgGrass from "../../images/backgrounds/grass.jpg";
import bgGround from "../../images/backgrounds/ground.jpg";
import bgIce from "../../images/backgrounds/ice.jpg";
import bgNormal from "../../images/backgrounds/normal.jpg";
import bgPoison from "../../images/backgrounds/poison.jpg";
import bgPsychic from "../../images/backgrounds/psychic.jpg";
import bgRock from "../../images/backgrounds/rock.jpg";
import bgSteel from "../../images/backgrounds/steel.jpg";
import bgWater from "../../images/backgrounds/water.jpg";

// import svgBug from "../../images/icons/bug.svg";
// import svgDark from "../../images/icons/dark.svg";
// import svgDragon from "../../images/icons/dragon.svg";
// import svgElectric from "../../images/icons/electric.svg";
// import svgFairy from "../../images/icons/fairy.svg";
// import svgFighting from "../../images/icons/fighting.svg";
// import svgFire from "../../images/icons/fire.svg";
// import svgFlying from "../../images/icons/flying.svg";
// import svgGhost from "../../images/icons/ghost.svg";
// import svgGrass from "../../images/icons/grass.svg";
// import svgGround from "../../images/icons/ground.svg";
// import svgIce from "../../images/icons/ice.svg";
// import svgNormal from "../../images/icons/normal.svg";
// import svgPoison from "../../images/icons/poison.svg";
// import svgPsychic from "../../images/icons/psychic.svg";
// import svgRock from "../../images/icons/rock.svg";
// import svgSteel from "../../images/icons/steel.svg";
// import svgWater from "../../images/icons/water.svg";

import Type from "./Type";
import { useEffect, useState } from "react";

const Card = ({ url }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
      });
  }, [url]);

  const [loaded, setLoaded] = useState(false);

  const [source, setSource] = useState(null);
  const [bgSource, setBgSource] = useState(null);

  useEffect(() => {
    if (data) {
      setSource(null);
      setLoaded(false);
      setTimeout(() =>
        setSource(data.sprites.other["official-artwork"].front_default)
      );

      switch (data.types[0].type.name) {
        case "bug":
          setBgSource(bgBug);
          break;
        case "dark":
          setBgSource(bgDark);
          break;
        case "dragon":
          setBgSource(bgDragon);
          break;
        case "electric":
          setBgSource(bgElectric);
          break;
        case "fairy":
          setBgSource(bgFairy);
          break;
        case "fighting":
          setBgSource(bgFighting);
          break;
        case "fire":
          setBgSource(bgFire);
          break;
        case "flying":
          setBgSource(bgFlying);
          break;
        case "ghost":
          setBgSource(bgGhost);
          break;
        case "grass":
          setBgSource(bgGrass);
          break;
        case "ground":
          setBgSource(bgGround);
          break;
        case "ice":
          setBgSource(bgIce);
          break;
        case "normal":
          setBgSource(bgNormal);
          break;
        case "poison":
          setBgSource(bgPoison);
          break;
        case "psychic":
          setBgSource(bgPsychic);
          break;
        case "rock":
          setBgSource(bgRock);
          break;
        case "steel":
          setBgSource(bgSteel);
          break;
        case "water":
          setBgSource(bgWater);
          break;

        default:
          setBgSource(bgNormal);
          break;
      }
    }
  }, [data]);

  const handleLoad = () => {
    setLoaded(true);
  };

  return (
    <div className="card">
      {data && (
        <>
          <div className="pictures">
            <div className="background">
              <img src={bgSource} alt="" />
            </div>
            <div className="pokemon">
              <img
                src={source}
                alt=""
                className={loaded ? "ready" : undefined}
                onLoad={handleLoad}
                loading="lazy"
              />
            </div>
          </div>
          <div className="info">
            <div className="icon"></div>
            {data.types.map((el, i) => {
              return <Type type={el.type.name} key={i} />;
            })}

            <h2>{`#${data.id}`}</h2>
            <h3>{data.name}</h3>
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
