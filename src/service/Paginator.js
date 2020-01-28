export default (total, current) => {
  let output = [...Array(total).keys()].map(i => i + 1);
  output.current = current;
  return output;
};
