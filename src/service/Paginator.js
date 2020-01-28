import * as R from "ramda";

const getRange = size => {
  return [...Array(size).keys()];
};

export default (total, current) => {
  let output = R.pipe(
    getRange,
    R.map(i => i + current - 5),
    R.filter(d => d >= 1 && d <= total && d >= current - 2 && d <= current + 2),
    data =>
      R.head(data) > 1
        ? R.concat([1, R.head(data) == 2 ? false : "..."], data)
        : data,
    data =>
      R.last(data) < total
        ? R.concat(data, [R.last(data) == total - 1 ? false : "...", total])
        : data,
    R.filter(d => d)
  )(10);

  output.current = current;

  return output;
};
