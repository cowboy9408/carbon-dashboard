export type Emission = {
  yearMonth: string;   // "2025-01"
  source: string;      // 예: "electricity", "fuel"
  emissions: number;   // kgCO2e
};

export type Company = {
  id: string;
  name: string;
  country: string;
  monthlyEmissions: Emission[];
};

export type Post = {
  id: string;
  title: string;
  resourceUid: string; // company.id
  dateTime: string;    // ISO
  content: string;
};
