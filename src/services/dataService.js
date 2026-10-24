const DATA_URL = `${import.meta.env.BASE_URL}data/political-data.json`;

export function validateDataset(d) {
  if (
    !d?.metadata ||
    !d?.overview ||
    !Array.isArray(d.overview.segments) ||
    !Array.isArray(d.parliamentary) ||
    !Array.isArray(d.assembly)
  ) {
    throw new Error("Unexpected dataset format");
  }
  if (d.parliamentary.length === 0) {
    throw new Error("Dataset contains no parliamentary election records");
  }
  return d;
}

export async function loadData(signal) {
  let response;
  try {
    response = await fetch(DATA_URL, { signal });
  } catch (err) {
    if (err.name === "AbortError") throw err;
    throw new Error("Network error – could not reach the data file");
  }
  if (!response.ok) throw new Error(`Could not load data (${response.status})`);

  let json;
  try {
    json = await response.json();
  } catch {
    throw new Error("Data file is not valid JSON");
  }
  return validateDataset(json);
}
