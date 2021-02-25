//URLs and search parameters
const client_key = process.env.REACT_APP_API_KEY;
const base_url = "https://api.boardgameatlas.com/api/";
const client_full_param = `&client_id=${client_key}`;
const max_limit_full_param = "&limit=100";
const ten_limit_full_param = "&limit=10";
const search_prefix = "search?";
const name_prefix = "name=";
const order_full_param = "order_by=rank";
const mechanics_prefix = "mechanics=";
//const mechanics_test_param = "mechanics=vZsDDAdOoe";

const all_mechanics_url = base_url + `game/mechanics?client_id=${client_key}`;
const popular_url =
  base_url + search_prefix + order_full_param + client_full_param;

export const allMechanicsURL = () => all_mechanics_url;
export const popularURL = () => popular_url;
export const searchURL = (mechanics) =>
  `${base_url}${search_prefix}${mechanics_prefix}${mechanics}${max_limit_full_param}${client_full_param}`;
export const autocompleteURL = (game_name) =>
  `${base_url}${search_prefix}${name_prefix}${game_name}${ten_limit_full_param}${client_full_param}`;
