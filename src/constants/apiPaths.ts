const DEFAULT_API_PATH = "https://ja4ylhyni1.execute-api.eu-west-1.amazonaws.com/dev"
const { REACT_APP_API_PATH, REACT_APP_CARD_API_PATH } = process.env;

const API_PATHS = {
  products: `${REACT_APP_API_PATH || DEFAULT_API_PATH}`,
  order: `${REACT_APP_CARD_API_PATH || DEFAULT_API_PATH}`,
  import: `${REACT_APP_API_PATH || DEFAULT_API_PATH}`,
  bff: `${REACT_APP_API_PATH || DEFAULT_API_PATH}`,
  cart: `${REACT_APP_CARD_API_PATH || DEFAULT_API_PATH}`,
};

export default API_PATHS;
