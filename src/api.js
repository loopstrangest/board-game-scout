//URLs and search parameters
const client_key = process.env.REACT_APP_API_KEY;
const base_url = "https://api.boardgameatlas.com/api/";
//const filter_url = `https://api.boardgameatlas.com/api/search?client_id=${client_key}`;
const client_full_param = `&client_id=${client_key}`;
const limit_full_param = "&limit=25";
const search_prefix = "search?";
const name_param = "Catan";
const name_prefix = "name=";
const year_published_prefix = "year_published=";
const order_full_param = "order_by=rank";
const current_year_param = new Date().getFullYear();

const popular_url =
  base_url +
  search_prefix +
  order_full_param +
  limit_full_param +
  client_full_param;
const search_url =
  base_url + search_prefix + name_prefix + name_param + client_full_param;
const newest_url =
  base_url +
  search_prefix +
  year_published_prefix +
  current_year_param +
  client_full_param;

export const popularURL = () => popular_url;
export const searchURL = () => search_url;
export const newestURL = () => newest_url;
export const autocompleteURL = (game_name) =>
  `${base_url}${search_prefix}${name_prefix}${game_name}${client_full_param}`;
