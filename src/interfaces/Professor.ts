interface AvatarAttributes {
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: any | null;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any | null;
  createdAt: string;
  updatedAt: string;
}

interface AvatarData {
  id: number;
  attributes: AvatarAttributes;
}

interface ProfessorAttributes {
  name: string;
  family: string;
  marital_status: boolean;
  age: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  phoen: string;
  address: string;
  email: string | null;
  aboutMe: string | null;
  google_scholar: string | null;
  adjectives: string[];
  slug: string;
  avatar: { data: AvatarData };
  video: { data: any };
  educations: { data: any[] };
  teachings: { data: any[] };
  researches: { data: any[] };
  honors: { data: any[] };
  activities: { data: any[] };
  skills: { data: any[] };
  comments: { data: any[] };
  scores: { data: any[] };
  academic_rank;
}

export interface ProfessorData {
  id: number;
  attributes: ProfessorAttributes;
}
