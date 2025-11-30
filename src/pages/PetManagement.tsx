import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { supabase } from '../lib/supabase';
import { Pet } from '../lib/Pet';
import { toast } from 'sonner';
import { useAuth } from '../contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import { uploadImage } from '../lib/uploadImage';

export default function PetManagement() {
  const { user } = useAuth();
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPet, setEditingPet] = useState<Pet | null>(null);
  const [deletingPet, setDeletingPet] = useState<Pet | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    breed: '',
    custom_breed: '',
    age: '',
    weight: '',
    medical_notes: '',
  });
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadPets();
    }
  }, [user]);

  async function loadPets() {
    try {
      const { data, error } = await supabase
        .from('pets')
        .select('*')
        .eq('owner_id', user!.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPets(data || []);
    } catch (error) {
      console.error('Error loading pets:', error);
    } finally {
      setLoading(false);
    }
  }

  function openModal(pet?: Pet) {
    if (pet) {
      setEditingPet(pet);
      setFormData({
        name: pet.name,
        species: pet.species,

        breed: pet.breed || '',
        custom_breed: '',
        age: pet.age?.toString() || '',
        weight: pet.weight?.toString() || '',
        medical_notes: pet.medical_notes || '',
      });
      setTimeout(() => {
        const popularDogBreeds = [
          'Labrador Retriever',
          'German Shepherd',
          'Golden Retriever',
          'French Bulldog',
          'Bulldog',
          'Poodle',
          'Beagle',
          'Rottweiler',
          'Yorkshire Terrier',
          'Boxer',
        ];
        if (pet.breed && !popularDogBreeds.includes(pet.breed) && pet.species === 'perro') {
          setFormData((fd) => ({ ...fd, breed: 'otro', custom_breed: pet.breed ?? '' }));
          const approx = breedWeightLookup[pet.breed || ''];
          if (!pet.weight && approx) {
            setFormData((fd) => ({ ...fd, weight: approx.toString() }));
          }
        } else if (pet.breed && popularDogBreeds.includes(pet.breed) && pet.species === 'perro') {
          const approx = breedWeightLookup[pet.breed];
          if (!pet.weight && approx) {
            setFormData((fd) => ({ ...fd, weight: approx.toString() }));
          }
        }
      }, 0);
      setPreviewUrl(pet.photo_url || null);
    } else {
      setEditingPet(null);
      setFormData({
        name: '',
        species: '',
        breed: '',
        custom_breed: '',
        age: '',
        weight: '',
        medical_notes: '',
      });
      setPreviewUrl(null);
      setSelectedImageFile(null);
    }
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setEditingPet(null);
    setSelectedImageFile(null);
    setPreviewUrl(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      // Decide which breed to save: if the select is 'otro', use the custom_breed value.
      const selectedBreed = formData.breed === 'otro' ? formData.custom_breed || '' : formData.breed;

      // Handle image upload if a new file was selected. If not, keep existing photo_url (or null for new pets).
      let photo_url: string | null = editingPet?.photo_url ?? null;
      if (selectedImageFile) {
        try {
          photo_url = await uploadImage(selectedImageFile);
        } catch (err) {
          console.error('Error uploading image:', err);
          toast.error('Error subiendo la imagen');
          return;
        }
      }

      const petData = {
        name: formData.name,
        species: formData.species,
        breed: selectedBreed || null,
        age: formData.age ? parseInt(formData.age) : null,
        weight: formData.weight ? parseFloat(formData.weight) : null,
        medical_notes: formData.medical_notes || '',
        owner_id: user!.id,
        photo_url,
        updated_at: new Date().toISOString(),
      };

      if (editingPet) {
        const { error } = await supabase
          .from('pets')
          .update(petData)
          .eq('id', editingPet.id);

        if (error) throw error;
        toast.success('Mascota actualizada');
      } else {
        const { error } = await supabase.from('pets').insert(petData);
        if (error) throw error;
        toast.success('Mascota creada');
      }

      closeModal();
      loadPets();
    } catch (error) {
      console.error('Error saving pet:', error);
      toast.error('Error guardando la mascota');
    }
  }

  function handleDelete(pet: Pet) {
    setDeletingPet(pet);
  }

  async function confirmDelete() {
    if (!deletingPet) return;

    try {
      const { error } = await supabase.from('pets').delete().eq('id', deletingPet.id);
      if (error) throw error;
      toast.success('Mascota eliminada');
      setDeletingPet(null);
      loadPets();
    } catch (error) {
      console.error('Error deleting pet:', error);
      toast.error('Error eliminando la mascota');
    }
  }

  const speciesEmoji: Record<string, string> = {
    perro: '🐕',
    gato: '🐈',
    ave: '🦜',
    conejo: '🐰',
    hámster: '🐹',
    otro: '🐾',
  };

  const breedApproxWeight: Record<string, number> = {
    'Labrador Retriever': 30,
    'German Shepherd': 35,
    'Golden Retriever': 30,
    'French Bulldog': 12,
    'Bulldog': 23,
    'Poodle': 22,
    'Beagle': 10,
    'Rottweiler': 45,
    'Yorkshire Terrier': 3,
    'Boxer': 30,
  };

  const breedsBySpecies: Record<string, string[]> = {
    perro: [
      'Labrador Retriever',
      'German Shepherd',
      'Golden Retriever',
      'French Bulldog',
      'Bulldog',
      'Poodle',
      'Beagle',
      'Rottweiler',
      'Yorkshire Terrier',
      'Boxer',
      'otro',
    ],
    gato: ['Persa', 'Siamés', 'Maine Coon', 'Bengalí', 'Ragdoll', 'otro'],
    ave: ['Periquito', 'Cacatúa', 'Loro gris', 'Canario', 'Nanday', 'otro'],
    conejo: ['Lop', 'Mini Rex', 'Netherland Dwarf', 'otro'],
    'hámster': ['Siberiano', 'Roborovski', 'Sirio', 'otro'],
    otro: ['otro'],
  };

  const extraApproxWeights: Record<string, number> = {
    Persa: 4,
    Siamés: 4,
    'Maine Coon': 6,
    Bengalí: 5,
    Ragdoll: 5,
    Periquito: 0.05,
    Cacatúa: 0.8,
    'Loro gris': 0.5,
    Canario: 0.02,
    Lop: 2,
    'Mini Rex': 2,
    'Netherland Dwarf': 1,
    Siberiano: 0.05,
    Roborovski: 0.03,
    Sirio: 0.04,
  };

  const breedWeightLookup: Record<string, number> = { ...breedApproxWeight, ...extraApproxWeights };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-8 flex flex-col items-center justify-center min-h-[260px]">
        <Loader2 className="animate-spin w-8 h-8 text-teal-500" />
        <div className="mt-3 text-center text-gray-600">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Mis Mascotas</h2>
          <button
            onClick={() => openModal()}
            className="flex items-center gap-2 bg-teal-500 text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all"
          >
            <Plus className="w-5 h-5" />
            Nueva Mascota
          </button>
        </div>

        {pets.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">🐾</span>
            </div>
            <p className="text-gray-600 mb-4">No tienes mascotas registradas</p>
            <button
              onClick={() => openModal()}
              className="text-teal-600 hover:text-teal-700 font-medium"
            >
              Añade tu primera mascota
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pets.map((pet) => (
              <div
                key={pet.id}
                className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6 border border-teal-100 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-sm overflow-hidden">
                    {pet.photo_url ? (
                      <img src={pet.photo_url} alt={`${pet.name} foto`} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-3xl">
                        {speciesEmoji[pet.species.toLowerCase()] || '🐾'}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openModal(pet)}
                      className="p-2 hover:bg-white rounded-lg transition-colors"
                    >
                      <Edit2 className="w-4 h-4 text-teal-600" />
                    </button>
                    <button
                      onClick={() => handleDelete(pet)}
                      className="p-2 hover:bg-white rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-1">{pet.name}</h3>
                <p className="text-sm text-gray-600 mb-3 capitalize">{pet.species}</p>

                <div className="space-y-1 text-sm text-gray-700">
                  {pet.breed && <p>Raza: {pet.breed}</p>}
                  {pet.age && <p>Edad: {pet.age} años</p>}
                  {pet.weight && <p>Peso: {pet.weight} kg</p>}
                </div>

                {pet.medical_notes && (
                  <div className="mt-3 pt-3 border-t border-teal-200">
                    <p className="text-xs text-gray-600">
                      <span className="font-medium">Notas:</span> {pet.medical_notes}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <Dialog.Root open={showModal} onOpenChange={(open) => { if (!open) closeModal(); else setShowModal(true); }}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto z-50">
            <div className="flex justify-between items-center mb-6">
              <Dialog.Title className="text-xl font-bold text-gray-900">
                {editingPet ? 'Editar Mascota' : 'Nueva Mascota'}
              </Dialog.Title>
              <Dialog.Close asChild>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Cerrar">
                  <X className="w-5 h-5" />
                </button>
              </Dialog.Close>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Max, Luna, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Especie *
                </label>
                <select
                  required
                  value={formData.species}
                  onChange={(e) => {
                    const newSpecies = e.target.value;
                    // Reset breed and custom breed and weight when species changes
                    setFormData({ ...formData, species: newSpecies, breed: '', custom_breed: '', weight: '' });
                  }}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="">Seleccionar...</option>
                  <option value="perro">Perro</option>
                  <option value="gato">Gato</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Raza
                </label>
                <select
                  value={formData.breed}
                  onChange={(e) => {
                    const newBreed = e.target.value;
                    const approx = breedWeightLookup[newBreed];
                    if (newBreed !== 'otro' && approx && !formData.weight) {
                      setFormData({ ...formData, breed: newBreed, weight: approx.toString() });
                    } else {
                      setFormData({ ...formData, breed: newBreed });
                    }
                  }}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  disabled={!formData.species}
                >
                  <option value="">Seleccionar...</option>
                  {(breedsBySpecies[formData.species || ''] || []).map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>

                {formData.breed === 'otro' && (
                  <input
                    type="text"
                    value={formData.custom_breed}
                    onChange={(e) => setFormData({ ...formData, custom_breed: e.target.value })}
                    className="mt-2 w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Escribe la raza..."
                  />
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Edad (años)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Peso (kg)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notas Médicas
                </label>
                <textarea
                  value={formData.medical_notes}
                  onChange={(e) => setFormData({ ...formData, medical_notes: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Alergias, medicamentos, condiciones especiales..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Foto (opcional)</label>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                    {previewUrl ? (
                      <img src={previewUrl} alt="preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-gray-400 text-sm">Sin foto</div>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const f = e.target.files?.[0] ?? null;
                        if (f) {
                          setSelectedImageFile(f);
                          const url = URL.createObjectURL(f);
                          setPreviewUrl(url);
                        } else {
                          setSelectedImageFile(null);
                          setPreviewUrl(editingPet?.photo_url ?? null);
                        }
                      }}
                      className="text-sm"
                    />
                    {previewUrl && (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedImageFile(null);
                          setPreviewUrl(editingPet?.photo_url ?? null);
                        }}
                        className="mt-2 text-xs text-red-600 hover:underline"
                      >
                        Eliminar imagen
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Dialog.Close asChild>
                  <button
                    type="button"
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                </Dialog.Close>
                <button
                  type="submit"
                  className="flex-1 bg-teal-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all"
                >
                  {editingPet ? 'Actualizar' : 'Crear'}
                </button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <AlertDialog.Root open={!!deletingPet} onOpenChange={(open) => { if (!open) setDeletingPet(null); }}>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="fixed inset-0 bg-black/50" />
          <AlertDialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-6 max-w-md w-full z-50">
            <AlertDialog.Title className="text-lg font-semibold">Eliminar mascota</AlertDialog.Title>
            <AlertDialog.Description className="text-sm text-gray-600 mt-2">
              ¿Estás seguro que deseas eliminar <span className="font-medium">{deletingPet?.name}</span>? Esta acción no se puede deshacer.
            </AlertDialog.Description>

            <div className="mt-6 flex justify-end gap-3">
              <AlertDialog.Cancel asChild>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">Cancelar</button>
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild>
                <button onClick={confirmDelete} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:shadow">Eliminar</button>
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </div>
  );
}
