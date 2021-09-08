const DEFAULT_API_PATH = "https://ja4ylhyni1.execute-api.eu-west-1.amazonaws.com/dev"
const { REACT_APP_API_PATH } = process.env;

const API_PATHS = {
  products: `${REACT_APP_API_PATH || DEFAULT_API_PATH}`,
  order: 'https://.execute-api.eu-west-1.amazonaws.com/dev',
  import: 'https://.execute-api.eu-west-1.amazonaws.com/dev',
  bff: 'https://.execute-api.eu-west-1.amazonaws.com/dev',
  cart: 'https://.execute-api.eu-west-1.amazonaws.com/dev',
};

export default API_PATHS;
