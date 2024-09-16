import { useEffect, useState } from "react";
import apiClient from "../services/api_client";

interface Response<T> {
  count: number;
  results: T[];
}

const useData = <T>(endpoint: string) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    setisLoading(true);

    apiClient
      .get<Response<T>>(endpoint)
      .then((response) => setData(response.data.results))
      .catch((error) => setError(error.message))
      .finally(() => setisLoading(false));
  }, []);

  return { data, error, isLoading };
};

export default useData;
