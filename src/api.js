import axios from "axios";

const { REACT_APP_AUTH_HOST: authHost, REACT_APP_HOST: genHost } = process.env;

const get = ({ url, data }) => {
  if (url.includes("auth")) {
    url = authHost + url;
  } else {
    url = genHost + url;
  }
  return axios({ url, data: data, method: "post" });
};

export { get };
