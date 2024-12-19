export type Position = {
  lat: number;
  lng: number;
};

export type SettingsType = {
  data: {
    id: number;
    appName: string;
    appArea: string;
    initialZoom: number;
    defaultPosition: Position;
    centerPosition: Position;
    defaultBound: {
      northEast: Position;
      southWest: Position;
    };
  };
};

export type Organisation = {
  oid: number;
  organisation_name: string;
  organisation_address: string;
  organisation_email: string;
  organisation_phone: string;
};

export type ProblemCategory = {
  cat_id: number;
  cat_name: string;
  organisations: Organisation[];
};

export type Problem = {
  id: string;
  title: string;
  description: string;
  position: Position;
  createdAt: Date;
  updatedAt?: Date | null;
  status: "active" | "done";
  cat_id: number;
  uid: number;
  image: string | null;
  pinata_id: string | null;
};

export type ExtendedProblem = Problem & {
  user: Pick<User, "firstname" | "lastname" | "email">;
};

export type Problems = Problem[];

export type User = {
  uid: number;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt?: Date | null;
};

export type Users = User[];

export type LoginRegisterResponse = {
  message: string;
  data: User;
  tokenExpiry: Date;
};

////

type ConditionType = {
  text: string;
  icon: string;
};

export type ForecastDayType = {
  maxtemp_c: number;
  mintemp_c: number;
  condition: ConditionType;
};

export type WeatherLocation = {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
  };
};

export type WeatherCurrent = {
  current: {
    last_updated_epoch: number;
    last_updated: string;
    temp_c: number;
    wind_kph: number;
    humidity: number;
    condition: ConditionType;
  };
};

export type WeatherForecast = {
  forecast: {
    forecastday: Array<{
      date: string;
      day: ForecastDayType;
    }>;
  };
};

export type WeatherApiResponse = {
  location?: WeatherLocation;
  current: WeatherCurrent;
  forecast: WeatherForecast;
};
