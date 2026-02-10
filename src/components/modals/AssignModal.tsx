import { useState } from 'react';
import { X, UserPlus } from 'lucide-react';
import { mockUsers, mockCustomers } from '../../data/mockData';

type AssignModalProps = {
  customerIds: string[];
  onClose: () => void;
};

export function AssignModal({ customerIds, onClose }: AssignModalProps) {
  const [selectedUser, setSelectedUser] = useState('');

  const users = mockUsers.filter(u => u.role === 'user');

  const handleAssign = () => {
    if (!selectedUser) {
      alert('Pilih user terlebih dahulu');
      return;
    }

    // In real app, this would update the database
    customerIds.forEach(customerId => {
      const customer = mockCustomers.find(c => c.id === customerId);
      if (customer) {
        customer.assignedTo = selectedUser;
      }
    });

    alert(`${customerIds.length} nasabah berhasil di-assign`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <UserPlus className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">Assign Nasabah</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <p className="text-sm text-gray-600 mb-4">
            Assign {customerIds.length} nasabah terpilih ke user:
          </p>

          <div className="space-y-3">
            {users.map(user => (
              <label
                key={user.id}
                className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="radio"
                  name="assignUser"
                  value={user.id}
                  checked={selectedUser === user.id}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  className="mr-3 text-blue-600 focus:ring-blue-500"
                />
                <div>
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="flex gap-3 p-6 border-t">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Batal
          </button>
          <button
            onClick={handleAssign}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Assign
          </button>
        </div>
      </div>
    </div>
  );
}
