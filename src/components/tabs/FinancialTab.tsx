import { DollarSign, TrendingUp, Smartphone, Store } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Customer } from '../../App';

type FinancialTabProps = {
  customer: Customer;
};

export function FinancialTab({ customer }: FinancialTabProps) {
  const getLast6Months = () => {
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      months.push(date.toLocaleDateString('id-ID', { month: 'short' }));
    }
    return months;
  };

  const generateChartData = () => {
    const months = getLast6Months();
    return months.map((month, index) => {
      const livinTotal = customer.livinTransactions
        .filter((t, i) => i % 6 === index)
        .reduce((sum, t) => sum + t.amount, 0);
      
      const merchantTotal = customer.livinMerchantTransactions
        .filter((t, i) => i % 6 === index)
        .reduce((sum, t) => sum + t.amount, 0);

      return {
        month,
        livin: livinTotal,
        merchant: merchantTotal
      };
    });
  };

  const chartData = generateChartData();

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-50 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-sm text-gray-500">Total Tabungan</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            Rp {customer.savings.toLocaleString('id-ID')}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Smartphone className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-sm text-gray-500">Transaksi Livin (Bulan Ini)</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {customer.livinTransactions.length}x
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Rp {customer.livinTransactions.reduce((sum, t) => sum + t.amount, 0).toLocaleString('id-ID')}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Store className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-sm text-gray-500">Transaksi Livin Merchant (Bulan Ini)</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {customer.livinMerchantTransactions.length}x
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Rp {customer.livinMerchantTransactions.reduce((sum, t) => sum + t.amount, 0).toLocaleString('id-ID')}
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Grafik Penggunaan Livin & Livin Merchant</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip 
              formatter={(value: number) => `Rp ${value.toLocaleString('id-ID')}`}
            />
            <Legend />
            <Line type="monotone" dataKey="livin" stroke="#3b82f6" name="Livin" strokeWidth={2} />
            <Line type="monotone" dataKey="merchant" stroke="#8b5cf6" name="Livin Merchant" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Loan Payment History */}
      {customer.activeLoan && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">Histori Pembayaran Kredit</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tanggal</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pokok</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bunga</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {customer.activeLoan.paymentHistory.map((payment, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {new Date(payment.date).toLocaleDateString('id-ID')}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      Rp {payment.principal.toLocaleString('id-ID')}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      Rp {payment.interest.toLocaleString('id-ID')}
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                      Rp {payment.total.toLocaleString('id-ID')}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {payment.status === 'paid' && (
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">Lunas</span>
                      )}
                      {payment.status === 'pending' && (
                        <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">Pending</span>
                      )}
                      {payment.status === 'overdue' && (
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
