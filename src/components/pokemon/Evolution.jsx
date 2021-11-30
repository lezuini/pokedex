import { useEffect, useState } from "react";

const Evolution = ({ specie }) => {
  const [specieData, setSpecieData] = useState(null);
  const [evolutionChainData, setEvolutionChainData] = useState(null);

  // const [babyTrigger, setBabyTrigger] = useState(null);

  const [evolutionsArray, setEvolutionsArray] = useState(null);

  useEffect(() => {
    const ac = new AbortController();

    fetch(specie, {
      signal: ac.signal,
    })
      .then((res) => res.json())
      .then((json) => {
        setSpecieData(json);
      })
      .catch((error) => {
        console.log(error);
      });

    return () => {
      ac.abort(); // Abort fetch on unmount
      setSpecieData(null);
    };
  }, [specie]);

  useEffect(() => {
    if (specieData) {
      console.log(specieData);

      const ac = new AbortController();

      fetch(specieData.evolution_chain.url, {
        signal: ac.signal,
      })
        .then((res) => res.json())
        .then((json) => {
          setEvolutionChainData(json);
        })
        .catch((error) => {
          console.log(error);
        });

      return () => {
        ac.abort(); // Abort fetch on unmount
        setEvolutionChainData(null);
      };
    }
  }, [specieData]);

  useEffect(() => {
    if (evolutionChainData) {
      let { chain } = evolutionChainData;

      console.log(chain);

      let evolutions = [];
      let evolData = [];

      evolutions[0] = chain.species.url;

      if (chain.evolves_to.length > 0) {
        evolData[0] = chain.evolves_to;

        for (let i = 0; i < evolData[0].length; i++) {
          evolutions[1] = evolData[0][0].species.url;
        }

        if (evolData[0].length > 0) {
          evolData[1] = evolData[0][0].evolves_to;

          if (evolData[1].length > 0) {
            for (let i = 0; i < evolData[1].length; i++) {
              evolutions[2] = evolData[1][0].species.url;
            }
          }
        }
      }

      console.log(evolutions);

      setEvolutionsArray(evolutions);
    }
  }, [evolutionChainData]);

  const [eData, setEData] = useState(null);

  useEffect(() => {
    if (evolutionsArray) {
      const ac = new AbortController();

      let arrrrrr = [];

      for (let i = 0; i < evolutionsArray.length; i++) {
        fetch(evolutionsArray[i], {
          signal: ac.signal,
        })
          .then((res) => res.json())
          .then((json) => {
            arrrrrr.push(json);
          })
          .catch((error) => {
            console.log(error);
          });
      }

      setEData(arrrrrr);

      return () => {
        ac.abort(); // Abort fetch on unmount
        setEData(null);
      };
    }
  }, [evolutionsArray]);

  const [we, setWe] = useState(null);

  useEffect(() => {
    if (eData !== null) {
      // const ab = new AbortController();
      let arrrrrr = [];

      for (let i = 0; i < eData.length; i++) {
        console.log("A");
        fetch(`https://pokeapi.co/api/v2/pokemon/${eData[i].id}`)
          .then((res) => res.json())
          .then((json) => {
            arrrrrr.push(json);
            console.log(json);
          })
          .catch((error) => {
            console.log(error);
          });
      }

      setWe(arrrrrr);
      // return () => {
      //   ab.abort(); // Abort fetch on unmount
      //   setWe(null);
      // };
    }
  }, [eData]);

  return (
    <div className="box evolution">
      {we !== null &&
        we.map((el) => {
          return (
            <img
              src={el.sprites.other["official-artwork"].front_default}
              alt=""
            />
          );
        })}
    </div>
  );
};

export default Evolution;
