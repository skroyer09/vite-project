import { useEffect, useState } from "react";
import apiClient from "../services/api_client";

export interface Game {
  id: number;
  name: string;
  background_image: string;
}

interface GamesResponse {
  count: number;
  results: Game[];
}

const useGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    apiClient
      .get<GamesResponse>("/games")
      .then((response) => setGames(response.data.results))
      .catch((error) => setError(error.message));
  }, []);

  return { games, error };
};

export default useGames;
