export interface Experience {
  startDate: string;
  endDate: string;
  companyId?: number;
  companyName: string;
  companyUrl?: string;
  position: string;
  description: string;
  location: string;
}

export interface Profile {
  experiences: Experience[];
}
