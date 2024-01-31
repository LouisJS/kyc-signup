import axios from 'axios';
import { useEffect, useState } from 'react';

interface FeatureCollection {
  type: string;
  version: string;
  features: Feature[];
  attribution: string;
  licence: string;
  query: string;
  limit: number;
}

interface Feature {
  type: string;
  geometry: Geometry;
  properties: Properties;
}

interface Geometry {
  type: string;
  coordinates: [number, number];
}

interface Properties {
  label: string;
  score: number;
  housenumber: string;
  id: string;
  type: string;
  name: string;
  postcode: string;
  citycode: string;
  x: number;
  y: number;
  city: string;
  context: string;
  importance: number;
  street: string;
}

const useFetchResidenceData = (residence: string) => {
  const [data, setData] = useState<FeatureCollection | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!residence) return; // Pour éviter des appels API inutiles

      setLoading(true);
      try {
        const response = await axios.get<FeatureCollection>(
          `https://api-adresse.data.gouv.fr/search?q=${residence}&type=housenumber`
        );
        setData(response.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [residence]);

  return { data, loading, error };
};

export default useFetchResidenceData;
