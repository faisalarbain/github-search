import Axios from "axios";

export default {
  search: async (keyword, per_page) => {
    return Axios.get(
      `https://api.github.com/search/repositories?per_page=${per_page}&q=${keyword}`
    ).then(res => res.data);
  }
};
