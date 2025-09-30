export const CityList = async (namePrefix: string): Promise<any> => {
  const response = await fetch(
    `http://geodb-free-service.wirefreethought.com/v1/geo/places?namePrefix=${encodeURIComponent(namePrefix)}&hateoasMode=false&limit=5&offset=0&sort=-population`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch cities: ${response.status}`);
  }

  const data = await response.json();

  if (!data.data) {
    throw new Error('No city data found');
  }

  return data;
};

export const GetMileDetails = async (fromCity: string, toCity: string): Promise<any> => {
  const response = await fetch(
    `http://geodb-free-service.wirefreethought.com/v1/geo/places/${fromCity}/distance?toPlaceId=${toCity}`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch distance: ${response.status}`);
  }

  const data = await response.json();

  if (!data.data) {
    throw new Error('No distance data found');
  }

  return data;
};
