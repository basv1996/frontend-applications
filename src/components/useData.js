import { useEffect, useState } from "react";

export const useData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://api.punkapi.com/v2/beers?page=1&per_page=11") // Vult hier de API url in + het API topic
      .then((response) => response.json())
      .then((data) => {
        setData(data); // Voer de showResults functie uit en stuur een parameter mee
      });
  }, []);

  return data;
};