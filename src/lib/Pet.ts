export type Pet = {
  id: string;
  owner_id: string;
  name: string;
  species: string;
  breed: string | null;
  age: number | null;
  weight: number | null;
  photo_url: string | null;
  medical_notes: string;
  created_at: string;
  updated_at: string;
};
