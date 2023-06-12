function roundUnits(ratio: number) {
  return Math.round((ratio + 0.00001) * 100) / 100
}

// US Customary

const mlPerOunce = 29.5735
const mlPerGallon = 3785.41

export const volume = {
  teaspoons: roundUnits(mlPerOunce / 6),
  tablespoons: roundUnits(mlPerOunce / 2),
  fluidounces: roundUnits(mlPerOunce),
  shots: roundUnits(mlPerOunce * 1.5),
  gills: roundUnits(mlPerOunce * 4),
  cups: roundUnits(mlPerGallon / 16),
  pints: roundUnits(mlPerGallon / 8),
  fifths: roundUnits(mlPerGallon / 5),
  quarts: roundUnits(mlPerGallon / 4),
  gallons: roundUnits(mlPerGallon),
  parts: 1
}
