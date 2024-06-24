import { useEffect, useState, useRef } from "react";

export default function useFetchTasks<APIResponse>({ url, options }: {url: string, options: RequestInit}) {
  const [isLoading, setIsLoading] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [serverError, setServerError] = useState('');
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url, options);
        if (!response.ok) setServerError('Network response was not ok');
        const data = await response.json();
        setApiData(data);
        fetchedRef.current = true;
      } catch (error) {
        // setServerError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, options]);

  return { isLoading, apiData, serverError } as { isLoading: boolean, apiData: APIResponse, serverError: string };
}