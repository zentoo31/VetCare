import { useState, useEffect } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { supabase } from '../lib/supabase';
import { Pet } from '../lib/Pet';
import { useAuth } from '../contexts/AuthContext';
// no imports from HeroUI needed here

export default function AppointmentBooking() {
  const { user } = useAuth();
  const [pets, setPets] = useState<Pet[]>([]);
  const [formData, setFormData] = useState({
    pet_id: '',
    date: '',
    time: '',
    service_type: '',
    notes: '',
  });
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // intentionally only run when `user` changes
    if (user) {
      loadPets();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  async function loadPets() {
    try {
      const { data, error } = await supabase
        .from('pets')
        .select('*')
        .eq('owner_id', user!.id);

      if (error) throw error;
      setPets(data || []);
    } catch (error) {
      console.error('Error loading pets:', error);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      // Use selectedDate (from DayPicker) if available, otherwise fallback to formData.date
      if (!selectedDate && !formData.date) throw new Error('Selecciona una fecha');
      const datePart = selectedDate ? selectedDate.toISOString().split('T')[0] : formData.date;
      const appointmentDate = new Date(`${datePart}T${formData.time}`);

      const { error } = await supabase.from('appointments').insert({
        pet_id: formData.pet_id,
        owner_id: user!.id,
        appointment_date: appointmentDate.toISOString(),
        service_type: formData.service_type,
        notes: formData.notes,
        status: 'pending',
      });

      if (error) throw error;

      setSuccess(true);
      setFormData({
        pet_id: '',
        date: '',
        time: '',
        service_type: '',
        notes: '',
      });
      setSelectedDate(undefined);

      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error creating appointment:', error);
    } finally {
      setLoading(false);
    }
  }

  function generateTimeSlots(start = '08:00', end = '18:00', stepMinutes = 30) {
    const slots: string[] = [];
    const [startH, startM] = start.split(':').map(Number);
    const [endH, endM] = end.split(':').map(Number);
    let cur = new Date();
    cur.setHours(startH, startM, 0, 0);
    const endDate = new Date();
    endDate.setHours(endH, endM, 0, 0);
    while (cur <= endDate) {
      const hh = String(cur.getHours()).padStart(2, '0');
      const mm = String(cur.getMinutes()).padStart(2, '0');
      slots.push(`${hh}:${mm}`);
      cur = new Date(cur.getTime() + stepMinutes * 60000);
    }
    return slots;
  }

  const timeSlots = generateTimeSlots('08:00', '18:00', 30);
  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Agendar Cita</h2>

      {pets.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🐾</span>
          </div>
          <p className="text-gray-600 mb-2">Primero debes registrar una mascota</p>
          <p className="text-sm text-gray-500">Ve a la sección "Mis Mascotas" para añadir una</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Seleccionar Mascota *
            </label>
            <select
              required
              value={formData.pet_id}
              onChange={(e) => setFormData({ ...formData, pet_id: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="">Selecciona una mascota...</option>
              {pets.map((pet) => (
                <option key={pet.id} value={pet.id}>
                  {pet.name} - {pet.species}
                </option>
              ))}
            </select>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fecha *</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <div className="pl-10">
                    <DayPicker
                      mode="single"
                      selected={selectedDate}
                        onSelect={(date) => {
                          setSelectedDate(date || undefined);
                          setFormData({ ...formData, date: date ? date.toISOString().split('T')[0] : '' });
                        }}
                        disabled={[{ before: todayDate }, { dayOfWeek: [0] }]}
                        fromDate={todayDate}
                      className="react-day-picker"
                    />
                  </div>
                </div>
              </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hora *</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  required
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="">Selecciona hora...</option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
              <label className='block text-sm font-medium text-gray-700 mb-2 mt-2'>Número celular *</label>
              <input type="number"  className='w-full px-4 py-3 border border-gray-200 rounded-xl' placeholder='+51 999 999 999'/>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Servicio *
            </label>
            <select
              required
              value={formData.service_type}
              onChange={(e) => setFormData({ ...formData, service_type: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="">Selecciona un servicio...</option>
              <option value="consultation">Consulta General</option>
              <option value="vaccination">Baños</option>
              <option value="grooming">Peluquería</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notas Adicionales
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Describe el motivo de la consulta o cualquier información relevante..."
            />
          </div>

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl">
              ¡Cita agendada exitosamente!
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-linear-to-r from-teal-500 to-cyan-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Agendando...' : 'Agendar Cita'}
          </button>
        </form>
      )}
    </div>
  );
}
