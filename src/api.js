//Base URL
const base_url = "https://api.boardgameatlas.com/api/";
const client_prefix = "client_id=";
const client_param = "Irc9LZsUlW";
const search_prefix = "search?";
const name_param = "name=Catan";
const and = "&";

const search_url =
  base_url + search_prefix + name_param + and + client_prefix + client_param;

export const searchURL = () => search_url;
