import { useState } from 'react';
import { Calendar, MapPin, User as UserIcon, Plus, ExternalLink } from 'lucide-react';
import { Customer, User, Visit } from '../../App';
import { AddVisitModal } from '../modals/AddVisitModal';

type VisitTabProps = {
  customer: Customer;
  currentUser: User;
};

export function VisitTab({ customer, currentUser }: VisitTabProps) {
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddVisit = (visit: Omit<Visit, 'id'>) => {
    // In real app, this would save to database
    console.log('Adding visit:', visit);
    alert('Dokumentasi kunjungan berhasil ditambahkan!');
    setShowAddModal(false);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Dokumentasi Kunjungan</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Tambah Kunjungan
        </button>
      </div>
      
      <div className="space-y-6">
        {customer.visitDocumentation.map((visit) => (
          <div key={visit.id} className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{visit.purpose}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(visit.date).toLocaleDateString('id-ID', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="flex items-start gap-3">
                <UserIcon className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Dikunjungi Oleh</p>
                  <p className="text-sm font-medium text-gray-900 mt-1">{visit.visitedBy}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Lokasi</p>
                  <p className="text-sm font-medium text-gray-900 mt-1">{visit.location.address}</p>
                  {visit.location.coordinates && (
                    <a
                      href={`https://www.google.com/maps?q=${visit.location.coordinates}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline mt-1"
                    >
                      Lihat di Google Maps
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Catatan</h4>
              <p className="text-sm text-gray-600">{visit.notes}</p>
            </div>

            {visit.photos.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Foto Dokumentasi</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {visit.photos.map((photo, index) => (
                    <div key={index} className="aspect-square bg-gray-100 rounded-lg overflow-hidden group cursor-pointer">
                      <img
                        src={photo}
                        alt={`Visit ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {customer.visitDocumentation.length === 0 && (
        <div className="text-center py-12">
          <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 mb-4">Belum ada dokumentasi kunjungan</p>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Tambah Kunjungan Pertama
          </button>
        </div>
      )}

      {showAddModal && (
        <AddVisitModal
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddVisit}
        />
      )}
    </div>
  );
}
