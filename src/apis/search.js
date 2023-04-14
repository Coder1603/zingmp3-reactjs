import axios from "~/axios";

export const getSearch = (keyword) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/search",
        method: "get",
        params: { keyword: keyword },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
