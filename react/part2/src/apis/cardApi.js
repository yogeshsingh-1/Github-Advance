import axiosInstance from "../utils/axios";
const cardApi = async (action, data = {}) => {
  let url = API_URL;
  let method = "GET";
  let body;

  switch (action) {
    case "create":
      method = "POST";
      body = JSON.stringify(data);
      break;

    case "getAll":
      break;

    case "getById":
      url += `/${data.id}`;
      break;

    case "update":
      url += `/${data.id}`;
      method = "PUT";
      body = JSON.stringify(data.cardData);
      break;

    case "delete":
      url += `/${data.id}`;
      method = "DELETE";
      break;

    default:
      throw new Error("Invalid action");
  }

//   const response = await fetch(url, {
//     method,
//     credentials: "include",
//     headers: { "Content-Type": "application/json" },
//     ...(body && { body }),
//   });
axiosInstance.call()

  if (!response.ok) {
    throw new Error("API request failed");
  }

  return response.json();
};

export default cardApi;
