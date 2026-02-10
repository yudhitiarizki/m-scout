import { useState } from 'react';
import { X, FileText, Upload } from 'lucide-react';
import { Document } from '../../App';

type AddDocumentModalProps = {
  onClose: () => void;
  onSubmit: (document: Omit<Document, 'id'>) => void;
};

export function AddDocumentModal({ onClose, onSubmit }: AddDocumentModalProps) {
  const [name, setName] = useState('');
  const [type, setType] = useState('PDF');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      alert('Masukkan nama dokumen');
      return;
    }

    onSubmit({
      name: name.trim(),
      type,
      uploadDate: new Date().toISOString(),
      url: '#'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">Tambah Dokumen</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nama Dokumen
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Contoh: KTP, NPWP, Slip Gaji"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipe File
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="PDF">PDF</option>
              <option value="JPG">JPG</option>
              <option value="PNG">PNG</option>
              <option value="DOC">DOC</option>
              <option value="DOCX">DOCX</option>
            </select>
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-sm text-gray-600 mb-2">Upload file dokumen</p>
            <button
              type="button"
              className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              Pilih File
            </button>
            <p className="text-xs text-gray-500 mt-2">Max 5MB - PDF, JPG, PNG, DOC</p>
          </div>

          <div className="flex gap-3 pt-4">
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
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
