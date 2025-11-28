export type Profile = {
  id: string;
  email: string;
  full_name: string;
  phone: string | null;
  role: 'client' | 'admin';
  created_at: string;
  updated_at: string;
};
