import axios from "axios";

export const authRequest = async (method, url, jwt, body) => {
  const authHeader = {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  };

  switch (method) {
    case "GET":
      return await axios.get(url, authHeader);
    case "POST":
      return await axios.post(url, body, authHeader);
    case "PATCH":
      return await axios.patch(url, body, authHeader);
    case "DELETE":
      return await axios.delete(url, authHeader);
    default:
      throw console.error("Error sending an authenticated http request");
  }
};
