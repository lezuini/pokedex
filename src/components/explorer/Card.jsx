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

import { ReactComponent as SVGBug } from "../../images/icons/bug.svg";
import { ReactComponent as SVGDark } from "../../images/icons/dark.svg";
import { ReactComponent as SVGDragon } from "../../images/icons/dragon.svg";
import { ReactComponent as SVGElectric } from "../../images/icons/electric.svg";
import { ReactComponent as SVGFairy } from "../../images/icons/fairy.svg";
import { ReactComponent as SVGFighting } from "../../images/icons/fighting.svg";
import { ReactComponent as SVGFire } from "../../images/icons/fire.svg";
import { ReactComponent as SVGFlying } from "../../images/icons/flying.svg";
import { ReactComponent as SVGGhost } from "../../images/icons/ghost.svg";
import { ReactComponent as SVGGrass } from "../../images/icons/grass.svg";
import { ReactComponent as SVGGround } from "../../images/icons/ground.svg";
import { ReactComponent as SVGIce } from "../../images/icons/ice.svg";
import { ReactComponent as SVGNormal } from "../../images/icons/normal.svg";
import { ReactComponent as SVGPoison } from "../../images/icons/poison.svg";
import { ReactComponent as SVGPsychic } from "../../images/icons/psychic.svg";
import { ReactComponent as SVGRock } from "../../images/icons/rock.svg";
import { ReactComponent as SVGSteel } from "../../images/icons/steel.svg";
import { ReactComponent as SVGWater } from "../../images/icons/water.svg";

import Type from "./Type";
import { useEffect, useState } from "react";

const Card = ({ url }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const ac = new AbortController();

    fetch(url, { signal: ac.signal })
      .then((res) => res.json())
      .then((json) => {
        setData(json);
      })
      .catch((error) => {
        console.log(error);
      });

    return () => {
      ac.abort(); // Abort fetch on unmount
      setData(null);
    };
  }, [url]);

  const [loaded, setLoaded] = useState(false);

  const [source, setSource] = useState(null);
  const [bgSource, setBgSource] = useState(null);
  const [iconSource, setIconSource] = useState(null);

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
          // setIconSource(svgBug);
          break;
        case "dark":
          setBgSource(bgDark);
          // setIconSource(<svgDark />);
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

  const tp = {
    bug: <SVGBug />,
    dark: <SVGDark />,
    dragon: <SVGDragon />,
    electric: <SVGElectric />,
    fairy: <SVGFairy />,
    fighting: <SVGFighting />,
    fire: <SVGFire />,
    flying: <SVGFlying />,
    ghost: <SVGGhost />,
    grass: <SVGGrass />,
    ground: <SVGGround />,
    ice: <SVGIce />,
    normal: <SVGNormal />,
    poison: <SVGPoison />,
    psychic: <SVGPsychic />,
    rock: <SVGRock />,
    steel: <SVGSteel />,
    water: <SVGWater />,
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
            <div className="icon">{tp[data.types[0].type.name]}</div>
          </div>
          <div className="info">
            <div className="types">
              {data.types.map((el, i) => {
                return <Type type={el.type.name} key={i} />;
              })}
            </div>

            <h2>{`#${data.id}`}</h2>
            <h3>{data.name[0].toUpperCase() + data.name.slice(1)}</h3>
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
