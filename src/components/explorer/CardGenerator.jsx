import Card from "./Card";

const CardGenerator = ({ data }) => {
  // let { results } = data;

  // console.log(data.results);

  return (
    <div className="generator">
      {data &&
        data.results &&
        data.results.map((el, i) => {
          return <Card url={el.url} key={i} />;
        })}
    </div>
  );
};

export default CardGenerator;
