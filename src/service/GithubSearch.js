import Axios from "axios";

const PER_PAGE = 10;

export default {
  search: async keyword => {
    return Axios.get(
      `https://api.github.com/search/repositories?per_page=${PER_PAGE}&q=${keyword}`
    ).then(res => res.data);
  }
};
