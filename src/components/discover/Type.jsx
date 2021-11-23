const Type = ({ type }) => {
  const capitalize = (string) => {
    const firstLetter = string[0];

    return string.replace(firstLetter, firstLetter.toUpperCase());
  };

  return (
    <div className={"type " + type}>
      <p>{capitalize(type)}</p>
    </div>
  );
};

export default Type;
