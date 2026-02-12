import { useState } from 'react';
import { CreditCard, LogOut, Filter, Search } from 'lucide-react';
import { Customer, User } from '../App';
import { mockCustomers } from '../data/mockData';

type DashboardProps = {
  currentUser: User;
  onSelectCustomer: (customer: Customer) => void;
  onLogout: () => void;
};

export function Dashboard({ currentUser, onSelectCustomer, onLogout }: DashboardProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLoanType, setFilterLoanType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const itemsPerPage = 10;

  // Filter customers based on user role
  const getFilteredCustomers = () => {
    let filtered = mockCustomers.filter(c => c.activeLoan); // Only show customers with active loans

    // Role-based filtering
    if (currentUser.role === 'user') {
      filtered = filtered.filter(c => c.assignedTo === currentUser.id);
    }

    // Search filtering
    if (searchQuery) {
      filtered = filtered.filter(c => 
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.phone.includes(searchQuery) ||
        c.nik.includes(searchQuery)
      );
    }

    // Loan type filtering
    if (filterLoanType !== 'all') {
      filtered = filtered.filter(c => c.activeLoan?.type === filterLoanType);
    }

    // Status filtering
    if (filterStatus !== 'all') {
      filtered = filtered.filter(c => {
        if (!c.activeLoan) return false;
        const daysUntilDue = getDaysUntilDue(c.activeLoan.nextPaymentDate);
        
        if (filterStatus === 'overdue') return daysUntilDue < 0;
        if (filterStatus === 'near') return daysUntilDue >= 0 && daysUntilDue <= 7;
        if (filterStatus === 'normal') return daysUntilDue > 7;
        return true;
      });
    }

    return filtered;
  };

  const filteredCustomers = getFilteredCustomers();
  const activeCredits = filteredCustomers;

  const getCurrentData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return activeCredits.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(activeCredits.length / itemsPerPage);

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusBadge = (daysUntilDue: number) => {
    if (daysUntilDue < 0) {
      return <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-700">Jatuh Tempo</span>;
    } else if (daysUntilDue <= 7) {
      return <span className="px-2 py-1 text-xs rounded-full bg-orange-100 text-orange-700">Mendekati Jatuh Tempo</span>;
    } else {
      return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">Normal</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Monitoring Kredit Cabang</h1>
              <p className="text-sm text-gray-500 mt-1">
                {currentUser.role === 'manager' ? 'Manager Dashboard' : `User: ${currentUser.name}`}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Kredit Aktif</p>
                <p className="text-2xl font-bold text-blue-600">{activeCredits.length}</p>
              </div>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-3 flex-1 w-full">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Cari nama, email, telepon, NIK..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={filterLoanType}
                onChange={(e) => {
                  setFilterLoanType(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Semua Jenis</option>
                <option value="KUR">KUR</option>
                <option value="KUM">KUM</option>
                <option value="KSM">KSM</option>
                <option value="Konsumtif">Konsumtif</option>
                <option value="Multiguna">Multiguna</option>
              </select>

              <select
                value={filterStatus}
                onChange={(e) => {
                  setFilterStatus(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Semua Status</option>
                <option value="normal">Normal</option>
                <option value="near">Mendekati Jatuh Tempo</option>
                <option value="overdue">Jatuh Tempo</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mt-6">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nama
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Telepon
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Jenis Kredit
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Jumlah Pinjaman
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cicilan/Bulan
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Jatuh Tempo Berikutnya
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {getCurrentData().map((customer) => {
                  const daysUntilDue = getDaysUntilDue(customer.activeLoan!.nextPaymentDate);
                  return (
                    <tr key={customer.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{customer.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-700">
                          {customer.activeLoan!.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          Rp {customer.activeLoan!.amount.toLocaleString('id-ID')}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          Rp {customer.activeLoan!.monthlyPayment.toLocaleString('id-ID')}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(customer.activeLoan!.nextPaymentDate).toLocaleDateString('id-ID')}
                        </div>
                        <div className="text-xs text-gray-500">
                          {daysUntilDue >= 0 ? `${daysUntilDue} hari lagi` : `Telat ${Math.abs(daysUntilDue)} hari`}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(daysUntilDue)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => onSelectCustomer(customer)}
                          className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                        >
                          Lihat Detail
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {getCurrentData().length === 0 && (
              <div className="text-center py-12">
                <CreditCard className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">Tidak ada data yang ditemukan</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Menampilkan {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, activeCredits.length)} dari {activeCredits.length} data
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Sebelumnya
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 border rounded-lg text-sm font-medium ${
                      currentPage === page
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Selanjutnya
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
