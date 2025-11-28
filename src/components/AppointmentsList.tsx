import { useState, useEffect } from 'react';
import { Calendar, Clock, FileText, X, CheckCircle } from 'lucide-react';
import { supabase} from '../lib/supabase';
import { Appointment } from '../lib/Appointment';
import { Pet } from '../lib/Pet';
import { useAuth } from '../contexts/AuthContext';
import { Loader2 } from 'lucide-react';

type AppointmentWithPet = Appointment & {
  pet: Pet;
};

export default function AppointmentsList({ compact = false }: { compact?: boolean }) {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<AppointmentWithPet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadAppointments();
    }
  }, [user]);

  async function loadAppointments() {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select(`
          *,
          pet:pets(*)
        `)
        .eq('owner_id', user!.id)
        .order('appointment_date', { ascending: true });

      if (error) throw error;
      setAppointments(data as AppointmentWithPet[] || []);
    } catch (error) {
      console.error('Error loading appointments:', error);
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id: string, status: string) {
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;
      loadAppointments();
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  }

  async function deleteAppointment(id: string) {
    if (!confirm('¿Estás seguro de cancelar esta cita?')) return;

    try {
      const { error } = await supabase.from('appointments').delete().eq('id', id);
      if (error) throw error;
      loadAppointments();
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  }

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  function formatTime(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  const serviceNames: Record<string, string> = {
    consultation: 'Consulta General',
    vaccination: 'Vacunación',
    surgery: 'Cirugía',
    grooming: 'Peluquería',
    emergency: 'Emergencia',
  };

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    confirmed: 'bg-blue-100 text-blue-800 border-blue-200',
    completed: 'bg-green-100 text-green-800 border-green-200',
    cancelled: 'bg-red-100 text-red-800 border-red-200',
  };

  const statusNames: Record<string, string> = {
    pending: 'Pendiente',
    confirmed: 'Confirmada',
    completed: 'Completada',
    cancelled: 'Cancelada',
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-8 flex flex-col items-center justify-center min-h-[260px]">
        <Loader2 className="animate-spin w-8 h-8 text-teal-500" />
        <div className="mt-3 text-center text-gray-600">Cargando...</div>
      </div>
    );
  }

  const upcomingAppointments = appointments.filter(
    (apt) => new Date(apt.appointment_date) >= new Date() && apt.status !== 'cancelled'
  );
  const pastAppointments = appointments.filter(
    (apt) => new Date(apt.appointment_date) < new Date() || apt.status === 'cancelled'
  );

  const displayAppointments = compact ? upcomingAppointments.slice(0, 3) : appointments;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {compact ? 'Próximas Citas' : 'Mis Citas'}
      </h2>

      {displayAppointments.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-10 h-10 text-gray-400" />
          </div>
          <p className="text-gray-600 mb-2">No tienes citas agendadas</p>
          <p className="text-sm text-gray-500">Agenda tu primera cita para comenzar</p>
        </div>
      ) : (
        <div className="space-y-4">
          {!compact && upcomingAppointments.length > 0 && (
            <>
              <h3 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
                Próximas
              </h3>
              {upcomingAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  onUpdateStatus={updateStatus}
                  onDelete={deleteAppointment}
                  formatDate={formatDate}
                  formatTime={formatTime}
                  serviceNames={serviceNames}
                  statusColors={statusColors}
                  statusNames={statusNames}
                />
              ))}
            </>
          )}

          {compact && upcomingAppointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              onUpdateStatus={updateStatus}
              onDelete={deleteAppointment}
              formatDate={formatDate}
              formatTime={formatTime}
              serviceNames={serviceNames}
              statusColors={statusColors}
              statusNames={statusNames}
              compact
            />
          ))}

          {!compact && pastAppointments.length > 0 && (
            <>
              <h3 className="font-semibold text-gray-700 text-sm uppercase tracking-wide mt-8">
                Historial
              </h3>
              {pastAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  onUpdateStatus={updateStatus}
                  onDelete={deleteAppointment}
                  formatDate={formatDate}
                  formatTime={formatTime}
                  serviceNames={serviceNames}
                  statusColors={statusColors}
                  statusNames={statusNames}
                />
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}

function AppointmentCard({
  appointment,
  onUpdateStatus,
  onDelete,
  formatDate,
  formatTime,
  serviceNames,
  statusColors,
  statusNames,
  compact = false,
}: {
  appointment: AppointmentWithPet;
  onUpdateStatus: (id: string, status: string) => void;
  onDelete: (id: string) => void;
  formatDate: (date: string) => string;
  formatTime: (date: string) => string;
  serviceNames: Record<string, string>;
  statusColors: Record<string, string>;
  statusNames: Record<string, string>;
  compact?: boolean;
}) {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-5 border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-sm">
            <span className="text-2xl">🐾</span>
          </div>
          <div>
            <h4 className="font-bold text-gray-900">{appointment.pet.name}</h4>
            <p className="text-sm text-gray-600">{serviceNames[appointment.service_type]}</p>
          </div>
        </div>

        <span
          className={`px-3 py-1 rounded-lg text-xs font-medium border ${
            statusColors[appointment.status]
          }`}
        >
          {statusNames[appointment.status]}
        </span>
      </div>

      <div className="space-y-2 text-sm text-gray-700 mb-3">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span className="capitalize">{formatDate(appointment.appointment_date)}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-400" />
          <span>{formatTime(appointment.appointment_date)}</span>
        </div>
        {appointment.notes && (
          <div className="flex items-start gap-2">
            <FileText className="w-4 h-4 text-gray-400 mt-0.5" />
            <span className="text-gray-600">{appointment.notes}</span>
          </div>
        )}
      </div>

      {!compact && appointment.status === 'pending' && (
        <div className="flex gap-2 pt-3 border-t border-gray-200">
          <button
            onClick={() => onUpdateStatus(appointment.id, 'confirmed')}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
          >
            <CheckCircle className="w-4 h-4" />
            Confirmar
          </button>
          <button
            onClick={() => onDelete(appointment.id)}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
          >
            <X className="w-4 h-4" />
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
}
