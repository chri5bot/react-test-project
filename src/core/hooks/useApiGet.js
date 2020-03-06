import { useEffect, useState } from "react";
import axios from "axios";

export const API_URL = "https://jsonplaceholder.typicode.com";

export const useApiGet = query => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    try {
      axios
        .get(`${API_URL}/${query}`, { cancelToken: source.token })
        .then(res => res && setData(res.data))
        .catch(err => console.error(err));
    } catch (error) {
      if (axios.isCancel(error)) console.log("cancelled");
      else throw error;
    }

    return () => source.cancel();
  }, [query]);

  return data;
};
