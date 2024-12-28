const config = {
  API_URL: import.meta.env.REACT_API_URL ?? 'https://swapi.py4e.com/api',
  API_RESOURCES: [
    'people',
    'planets',
    'films',
    'species',
    'starships',
    'vehicles',
  ],
};

export default config;
