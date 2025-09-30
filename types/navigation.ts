export type RootStackParamList = {
  index: undefined;
  history: undefined;
  profile: undefined;
};

export type Location = {
  latitude: number;
  longitude: number;
  address?: string;
};

export type MileageCalculation = {
  id: string;
  startLocation: Location;
  endLocation: Location;
  distance: number;
  timestamp: number;
  vehicleType?: string;
};
