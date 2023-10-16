export interface IProfile {
  skills: string[];
  description: string;
  hourly_rate: number;
  languages?: string[];
}

export interface ProfileInput {
  skills: string[];
  description: string;
  hourly_rate: number;
  languages?: string[];
}
