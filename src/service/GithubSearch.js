import * as R from "ramda";
export default {
  search: async keyword => {
    return [keyword];
  },
  process: R.pipe(R.prop("items"))
};
