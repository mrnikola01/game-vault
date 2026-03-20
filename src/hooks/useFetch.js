import { useState, useEffect } from "react";

function useFetch(fetchFunction, deps = []) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await fetchFunction();
      if (error) {
        setError(error.message);
      } else {
        setData(data);
      }
      setIsLoading(false);
    };
    fetch();
  }, deps);

  return { data, isLoading, error };
}

export default useFetch;
