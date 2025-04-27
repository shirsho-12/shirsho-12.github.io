import { useState, useEffect } from "react";
import { publications } from "@/data/publications";

export const usePublications = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(false);
  }, []);

  return {
    publications,
    loading,
    error,
  };
};
