export type Appointment = {
  id: string;
  pet_id: string;
  owner_id: string;
  appointment_date: string;
  service_type: 'consultation' | 'vaccination' | 'surgery' | 'grooming' | 'emergency';
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes: string;
  veterinarian_notes: string;
  created_at: string;
  updated_at: string;
};
