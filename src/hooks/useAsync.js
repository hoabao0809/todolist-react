import { useState, useCallback } from "react";

export const useAsync = (asyncFunction) => {
  const [status, setStatus] = useState("idle");
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);

  const execute = useCallback(async () => {
    setStatus("pending");

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        asyncFunction();

        resolve("Successfully");
        // Check and return error
      }, 1000);
    })
      .then((res) => {
        setStatus("success");
        setValue(res);
      })
      .catch((error) => {
        setError(error);
        setStatus("error");
      });
  }, [asyncFunction]);

  return { execute, status, value, error };
};
