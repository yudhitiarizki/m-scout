import { User, MapPin, Briefcase, DollarSign, CreditCard, Award } from 'lucide-react';
import { Customer } from '../../App';

type BiodataTabProps = {
  customer: Customer;
};

const getCreditScoreColor = (score: string) => {
  switch (score) {
    case 'Kol 1': return 'bg-green-100 text-green-700';
    case 'Kol 2': return 'bg-blue-100 text-blue-700';
    case 'Kol 3': return 'bg-yellow-100 text-yellow-700';
    case 'Kol 4': return 'bg-orange-100 text-orange-700';
    case 'Kol 5': return 'bg-red-100 text-red-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

export function BiodataTab({ customer }: BiodataTabProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Informasi Biodata</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <User className="w-5 h-5 text-gray-400 mt-1" />
            <div className="flex-1">
              <p className="text-sm text-gray-500">Nama Lengkap</p>
              <p className="text-base text-gray-900 mt-1">{customer.name}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CreditCard className="w-5 h-5 text-gray-400 mt-1" />
            <div className="flex-1">
              <p className="text-sm text-gray-500">NIK</p>
              <p className="text-base text-gray-900 mt-1">{customer.nik}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-gray-400 mt-1" />
            <div className="flex-1">
              <p className="text-sm text-gray-500">Alamat</p>
              <p className="text-base text-gray-900 mt-1">{customer.address}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Briefcase className="w-5 h-5 text-gray-400 mt-1" />
            <div className="flex-1">
              <p className="text-sm text-gray-500">Pekerjaan</p>
              <p className="text-base text-gray-900 mt-1">{customer.occupation}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <DollarSign className="w-5 h-5 text-gray-400 mt-1" />
            <div className="flex-1">
              <p className="text-sm text-gray-500">Penghasilan per Bulan</p>
              <p className="text-base text-gray-900 mt-1">
                Rp {customer.monthlyIncome.toLocaleString('id-ID')}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-5 h-5 mt-1" />
            <div className="flex-1">
              <p className="text-sm text-gray-500">Status Pinjaman</p>
              <p className="text-base text-gray-900 mt-1">
                {customer.hasLoan ? (
                  <span className="text-blue-600">Pernah Pinjam ({customer.loanHistory.length}x)</span>
                ) : (
                  <span className="text-gray-600">Belum Pernah Pinjam</span>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Award className="w-5 h-5 text-gray-400 mt-1" />
            <div className="flex-1">
              <p className="text-sm text-gray-500">Kolektibilitas / Skor Kredit</p>
              <div className="mt-1">
                <span className={`px-3 py-1 text-sm rounded-full font-semibold ${getCreditScoreColor(customer.creditScore)}`}>
                  {customer.creditScore}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {customer.loanHistory.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Riwayat Pinjaman</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tanggal</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Jenis</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Jumlah</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {customer.loanHistory.map((loan) => (
                  <tr key={loan.id}>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {new Date(loan.date).toLocaleDateString('id-ID')}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-700">
                        {loan.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      Rp {loan.amount.toLocaleString('id-ID')}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {loan.status === 'paid' && (
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">Lunas</span>
                      )}
                      {loan.status === 'active' && (
                        <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700">Aktif</span>
                      )}
                      {loan.status === 'overdue' && (
                        <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-700">Terlambat</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
