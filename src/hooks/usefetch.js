import { useEffect, useState } from "react";

const useFetch = (fetchFunction, dependencies = []) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await fetchFunction();

        setData(response);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, dependencies);

  return {
    data,
    loading,
    error,
    setData,
  };
};

export default useFetch;