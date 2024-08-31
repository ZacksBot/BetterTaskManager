import axios from "axios";

//const URL = "https://taskmanagerschoolapi.herokuapp.com/api/";
const URL = "http://localhost:3001/api/";

export const callApi = ({
  path = "",
  method = "GET",
  url = null,
  body = null,
}) => {
  let token = localStorage.getItem("task-manager-uuid");

  var headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  let options = {
    method,
    redirect: "follow",
  };

  if (token) headers["authorization"] = token;

  options.headers = headers;
  if (body) options.data = body;

  let urlString = URL + path;
  if (url) {
    urlString = url;
  }
  options.url = urlString;

  return axios(options).then((res) => {
    if (res.status === 500)
      return { success: false, status: 500, message: res.statusText };
    if (res.status === 401)
      return { success: false, status: 401, message: res.statusText };
    return res.data;
  });
};
