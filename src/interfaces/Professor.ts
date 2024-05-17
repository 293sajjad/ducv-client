export interface Activity {
  title: string;
  description: string;
  date_start: string;
  date_end: string;
  status: string;
}

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

export interface Education {
  id: number;
  attributes: {
    grade: string;
    name_of_the_institution: string;
    gpa: number;
    date_start: string;
    date_end: string;
    description: string;
  };
}

export interface Honor {
  id: number;
  attributes: {
    title: string;
    date: string;
    description: string;
  };
}

export interface Skill {
  id: number;
  attributes: { title: string; degree: number };
}

interface ProfessorAttributes {
  name: string;
  family: string;
  marital_status: boolean;
  age: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  phone_number: string;
  address: string;
  email: string | null;
  aboutMe: string | null;
  google_scholar: string | null;
  adjectives: string[];
  slug: string;
  avatar: { data: AvatarData };
  video: { data: any };
  educations: { data: Education[] };
  teachings: { data: any[] };
  ResearchActivitie: { data: any };
  honors: { data: Honor[] };
  activities: { data: Activity[] };
  skills: { data: Skill[] };
  comments: { data: any[] };
  scores: { data: any[] };

  academic_rank: string;
}

export interface ProfessorData {
  id: number;
  attributes: ProfessorAttributes;
}
