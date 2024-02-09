import { distance, point } from "@turf/turf";

export const isCloser = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
  date: Date
): { iscloser: boolean; distancia: number } => {
  const coordenada1 = [lat1, lon1]; // Exemplo de latitude e longitude
  const coordenada2 = [lat2, lon2]; // Exemplo de latitude e longitude

  const ponto1 = point(coordenada1);
  const ponto2 = point(coordenada2);

  // A distância será em quilômetros por padrão

  const distancia = Math.ceil(
    distance(ponto1, ponto2, {
      units: "kilometers",
    })
  );

  const iscloser = distancia < 20;
  return { iscloser, distancia };
};
