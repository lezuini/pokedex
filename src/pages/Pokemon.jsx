import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Evolution from "../components/pokemon/Evolution";

import bgBug from "../images/backgrounds/bug.jpg";
import bgDark from "../images/backgrounds/dark.jpg";
import bgDragon from "../images/backgrounds/dragon.jpg";
import bgElectric from "../images/backgrounds/electric.jpg";
import bgFairy from "../images/backgrounds/fairy.jpg";
import bgFighting from "../images/backgrounds/fighting.jpg";
import bgFire from "../images/backgrounds/fire.jpg";
import bgFlying from "../images/backgrounds/flying.jpg";
import bgGhost from "../images/backgrounds/ghost.jpg";
import bgGrass from "../images/backgrounds/grass.jpg";
import bgGround from "../images/backgrounds/ground.jpg";
import bgIce from "../images/backgrounds/ice.jpg";
import bgNormal from "../images/backgrounds/normal.jpg";
import bgPoison from "../images/backgrounds/poison.jpg";
import bgPsychic from "../images/backgrounds/psychic.jpg";
import bgRock from "../images/backgrounds/rock.jpg";
import bgSteel from "../images/backgrounds/steel.jpg";
import bgWater from "../images/backgrounds/water.jpg";

import { ReactComponent as SVGBug } from "../images/icons/bug.svg";
import { ReactComponent as SVGDark } from "../images/icons/dark.svg";
import { ReactComponent as SVGDragon } from "../images/icons/dragon.svg";
import { ReactComponent as SVGElectric } from "../images/icons/electric.svg";
import { ReactComponent as SVGFairy } from "../images/icons/fairy.svg";
import { ReactComponent as SVGFighting } from "../images/icons/fighting.svg";
import { ReactComponent as SVGFire } from "../images/icons/fire.svg";
import { ReactComponent as SVGFlying } from "../images/icons/flying.svg";
import { ReactComponent as SVGGhost } from "../images/icons/ghost.svg";
import { ReactComponent as SVGGrass } from "../images/icons/grass.svg";
import { ReactComponent as SVGGround } from "../images/icons/ground.svg";
import { ReactComponent as SVGIce } from "../images/icons/ice.svg";
import { ReactComponent as SVGNormal } from "../images/icons/normal.svg";
import { ReactComponent as SVGPoison } from "../images/icons/poison.svg";
import { ReactComponent as SVGPsychic } from "../images/icons/psychic.svg";
import { ReactComponent as SVGRock } from "../images/icons/rock.svg";
import { ReactComponent as SVGSteel } from "../images/icons/steel.svg";
import { ReactComponent as SVGWater } from "../images/icons/water.svg";

const Pokemon = () => {
  let { pokemon, page } = useParams();

  const [data, setData] = useState(null);

  console.log(pokemon, page);

  useEffect(() => {
    const ac = new AbortController();

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`, { signal: ac.signal })
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
  }, [pokemon]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const icons = {
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

  const backgrounds = {
    bug: bgBug,
    dark: bgDark,
    dragon: bgDragon,
    electric: bgElectric,
    fairy: bgFairy,
    fighting: bgFighting,
    fire: bgFire,
    flying: bgFlying,
    ghost: bgGhost,
    grass: bgGrass,
    ground: bgGround,
    ice: bgIce,
    normal: bgNormal,
    poison: bgPoison,
    psychic: bgPsychic,
    rock: bgRock,
    steel: bgSteel,
    water: bgWater,
  };

  const [tab, setTab] = useState(page);

  useEffect(() => {
    setTab(page);
  }, [page]);

  return (
    <div className="pokemon-layout">
      {data !== null && (
        <>
          <div className="background">
            <img src={backgrounds[data.types[0].type.name]} alt="" />
          </div>
          <div className="body">
            <div className="pokemon-image">
              <img
                src={data.sprites.other["official-artwork"].front_default}
                alt=""
              />
            </div>
            <h1 className="name">{data.name}</h1>
            <div className="health">
              <div className="bar"></div>
              <p className="hp">{`${
                data.stats.find((el) => {
                  return el.stat.name === "hp";
                }).base_stat
              } HP`}</p>
            </div>
            <div className="basics">
              <div className="container">
                <div className="weight">
                  <p>{data.weight}kg</p>
                  <span>Weight</span>
                </div>
                <div className="types">
                  <div className="icons">
                    {data.types.map((el, i) => {
                      return <span key={i}>{icons[el.type.name]}</span>;
                    })}
                  </div>
                  <p>
                    {data.types.map((el, i) => {
                      if (i !== 0) {
                        return (
                          <>
                            <span key="sep">/</span>
                            <span key={i}>{el.type.name}</span>
                          </>
                        );
                      } else {
                        return <span key={i}>{el.type.name}</span>;
                      }
                    })}
                  </p>
                </div>
                <div className="height">
                  <p>{data.height}m</p>
                  <span>Height</span>
                </div>
              </div>
            </div>
            <div className="tabs">
              <button
                className={!tab || tab === "overview" ? "active" : undefined}
              >
                <Link to="overview">Overview</Link>
              </button>
              <button className={tab === "stats" ? "active" : undefined}>
                <Link to="stats">Stats</Link>
              </button>
              <button className={tab === "abilities" ? "active" : undefined}>
                <Link to="abilities">Abilities</Link>
              </button>
              <button className={tab === "evolution" ? "active" : undefined}>
                <Link to="evolution">Evolution</Link>
              </button>
            </div>
            <div className="content">
              {tab === "stats" ? (
                <div className="box stats"></div>
              ) : tab === "abilities" ? (
                <div className="box abilities"></div>
              ) : tab === "evolution" ? (
                <Evolution specie={data.species.url} />
              ) : (
                <div className="box overview"></div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Pokemon;
