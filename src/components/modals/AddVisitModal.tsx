import { useState } from 'react';
import { X, MapPin, Upload } from 'lucide-react';
import { Visit } from '../../App';

type AddVisitModalProps = {
  onClose: () => void;
  onSubmit: (visit: Omit<Visit, 'id'>) => void;
};

export function AddVisitModal({ onClose, onSubmit }: AddVisitModalProps) {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [purpose, setPurpose] = useState('');
  const [notes, setNotes] = useState('');
  const [visitedBy, setVisitedBy] = useState('');
  const [locationAddress, setLocationAddress] = useState('');
  const [coordinates, setCoordinates] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!purpose.trim() || !visitedBy.trim() || !locationAddress.trim()) {
      alert('Mohon lengkapi semua field yang wajib');
      return;
    }

    onSubmit({
      date,
      purpose: purpose.trim(),
      notes: notes.trim(),
      visitedBy: visitedBy.trim(),
      location: {
        address: locationAddress.trim(),
        coordinates: coordinates.trim() || '-6.2088,106.8456' // Default Jakarta coordinates
      },
      photos: []
    });
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = `${position.coords.latitude},${position.coords.longitude}`;
          setCoordinates(coords);
          alert('Lokasi berhasil didapatkan!');
        },
        (error) => {
          alert('Gagal mendapatkan lokasi: ' + error.message);
        }
      );
    } else {
      alert('Browser tidak mendukung geolocation');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white">
          <div className="flex items-center gap-3">
            <MapPin className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">Tambah Dokumentasi Kunjungan</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tanggal Kunjungan *
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dikunjungi Oleh *
              </label>
              <input
                type="text"
                value={visitedBy}
                onChange={(e) => setVisitedBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nama petugas"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tujuan Kunjungan *
            </label>
            <input
              type="text"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Contoh: Survey Lokasi Usaha, Verifikasi Data"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Alamat Lokasi *
            </label>
            <textarea
              value={locationAddress}
              onChange={(e) => setLocationAddress(e.target.value)}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Alamat lengkap lokasi kunjungan"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Koordinat Lokasi (Lat, Long)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={coordinates}
                onChange={(e) => setCoordinates(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="-6.2088,106.8456"
              />
              <button
                type="button"
                onClick={handleGetCurrentLocation}
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 whitespace-nowrap"
              >
                Lokasi Saat Ini
              </button>
            </div>
            {coordinates && (
              <a
                href={`https://www.google.com/maps?q=${coordinates}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline mt-1 inline-block"
              >
                Lihat di Google Maps
              </a>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Catatan
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Tambahkan catatan kunjungan..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Foto Dokumentasi
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-sm text-gray-600 mb-2">Upload foto dokumentasi kunjungan</p>
              <button
                type="button"
                className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Pilih Foto
              </button>
              <p className="text-xs text-gray-500 mt-2">Max 5MB per foto - JPG, PNG</p>
            </div>
          </div>

          <div className="flex gap-3 pt-4 sticky bottom-0 bg-white border-t -mx-6 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Simpan Kunjungan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
