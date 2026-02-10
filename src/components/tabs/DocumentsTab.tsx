import { useState } from 'react';
import { FileText, Download, Eye, Plus } from 'lucide-react';
import { Customer, Document } from '../../App';
import { AddDocumentModal } from '../modals/AddDocumentModal';

type DocumentsTabProps = {
  customer: Customer;
};

export function DocumentsTab({ customer }: DocumentsTabProps) {
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddDocument = (document: Omit<Document, 'id'>) => {
    // In real app, this would save to database
    console.log('Adding document:', document);
    alert('Dokumen berhasil ditambahkan!');
    setShowAddModal(false);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Dokumen Penting</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Tambah Dokumen
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {customer.documents.map((doc) => (
          <div key={doc.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-gray-900 truncate">{doc.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{doc.type}</p>
                <p className="text-xs text-gray-400 mt-1">
                  Upload: {new Date(doc.uploadDate).toLocaleDateString('id-ID')}
                </p>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                <Eye className="w-4 h-4" />
                Lihat
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                <Download className="w-4 h-4" />
                Unduh
              </button>
            </div>
          </div>
        ))}
      </div>

      {customer.documents.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 mb-4">Belum ada dokumen yang diunggah</p>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Tambah Dokumen Pertama
          </button>
        </div>
      )}

      {showAddModal && (
        <AddDocumentModal
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddDocument}
        />
      )}
    </div>
  );
}
