import { DollarSign, Calendar, TrendingUp, AlertCircle } from 'lucide-react';
import { Customer } from '../../App';

type LoanDetailTabProps = {
  customer: Customer;
};

export function LoanDetailTab({ customer }: LoanDetailTabProps) {
  const loan = customer.activeLoan!;
  
  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysUntilDue = getDaysUntilDue(loan.nextPaymentDate);
  
  const monthsPassed = Math.ceil((new Date().getTime() - new Date(loan.startDate).getTime()) / (1000 * 60 * 60 * 24 * 30));
  const remainingMonths = loan.tenor - monthsPassed;

  const generateMonthlyBreakdown = () => {
    const breakdown = [];
    const monthlyInterestRate = loan.interestRate / 12 / 100;
    const principal = loan.amount;
    
    for (let i = 1; i <= loan.tenor; i++) {
      const remainingPrincipal = principal - ((principal / loan.tenor) * (i - 1));
      const interest = remainingPrincipal * monthlyInterestRate;
      const principalPayment = loan.monthlyPayment - interest;
      
      const paymentDate = new Date(loan.startDate);
      paymentDate.setMonth(paymentDate.getMonth() + i);
      
      breakdown.push({
        month: i,
        date: paymentDate.toLocaleDateString('id-ID', { month: 'short', year: 'numeric' }),
        principal: principalPayment,
        interest: interest,
        total: loan.monthlyPayment,
        isPaid: i <= monthsPassed
      });
    }
    
    return breakdown;
  };

  const monthlyBreakdown = generateMonthlyBreakdown();

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-5 h-5 text-blue-600" />
            <h3 className="text-sm text-gray-500">Jenis Kredit</h3>
          </div>
          <p className="text-xl font-bold text-gray-900">{loan.type}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-5 h-5 text-blue-600" />
            <h3 className="text-sm text-gray-500">Total Pinjaman</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            Rp {loan.amount.toLocaleString('id-ID')}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <h3 className="text-sm text-gray-500">Suku Bunga</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">{loan.interestRate}%</p>
          <p className="text-xs text-gray-500 mt-1">per tahun</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-5 h-5 text-purple-600" />
            <h3 className="text-sm text-gray-500">Tenor</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">{loan.tenor} Bulan</p>
          <p className="text-xs text-gray-500 mt-1">{remainingMonths} bulan tersisa</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-5 h-5 text-orange-600" />
            <h3 className="text-sm text-gray-500">Cicilan/Bulan</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            Rp {loan.monthlyPayment.toLocaleString('id-ID')}
          </p>
        </div>
      </div>

      {/* Payment Alert */}
      {daysUntilDue <= 7 && (
        <div className={`rounded-lg p-4 ${daysUntilDue < 0 ? 'bg-red-50 border border-red-200' : 'bg-orange-50 border border-orange-200'}`}>
          <div className="flex items-start gap-3">
            <AlertCircle className={`w-5 h-5 mt-0.5 ${daysUntilDue < 0 ? 'text-red-600' : 'text-orange-600'}`} />
            <div>
              <h3 className={`font-semibold ${daysUntilDue < 0 ? 'text-red-900' : 'text-orange-900'}`}>
                {daysUntilDue < 0 ? 'Pembayaran Jatuh Tempo!' : 'Pembayaran Mendekati Jatuh Tempo'}
              </h3>
              <p className={`text-sm mt-1 ${daysUntilDue < 0 ? 'text-red-700' : 'text-orange-700'}`}>
                {daysUntilDue < 0 
                  ? `Pembayaran terlambat ${Math.abs(daysUntilDue)} hari. Segera lakukan pembayaran untuk menghindari denda.`
                  : `Pembayaran berikutnya jatuh tempo dalam ${daysUntilDue} hari pada ${new Date(loan.nextPaymentDate).toLocaleDateString('id-ID')}.`
                }
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Loan Progress */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Progress Pembayaran</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Pokok Terbayar</span>
              <span className="text-sm font-semibold text-gray-900">
                Rp {loan.paidPrincipal.toLocaleString('id-ID')}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${(loan.paidPrincipal / loan.amount) * 100}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {((loan.paidPrincipal / loan.amount) * 100).toFixed(1)}% dari total pinjaman
            </p>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Sisa Pokok</span>
              <span className="text-sm font-semibold text-gray-900">
                Rp {loan.remainingPrincipal.toLocaleString('id-ID')}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-orange-600 h-2 rounded-full"
                style={{ width: `${(loan.remainingPrincipal / loan.amount) * 100}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {((loan.remainingPrincipal / loan.amount) * 100).toFixed(1)}% tersisa
            </p>
          </div>
        </div>

        <div className="border-t pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Total Bunga Terbayar</p>
              <p className="text-xl font-bold text-green-700">
                Rp {loan.paidInterest.toLocaleString('id-ID')}
              </p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Total Sudah Dibayar</p>
              <p className="text-xl font-bold text-blue-700">
                Rp {(loan.paidPrincipal + loan.paidInterest).toLocaleString('id-ID')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Breakdown */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Rincian Pembayaran Bulanan</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bulan</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tanggal</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pokok</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bunga</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {monthlyBreakdown.map((payment) => (
                <tr key={payment.month} className={payment.isPaid ? 'bg-green-50' : ''}>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    Bulan {payment.month}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{payment.date}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    Rp {payment.principal.toLocaleString('id-ID', { maximumFractionDigits: 0 })}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    Rp {payment.interest.toLocaleString('id-ID', { maximumFractionDigits: 0 })}
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                    Rp {payment.total.toLocaleString('id-ID', { maximumFractionDigits: 0 })}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {payment.isPaid ? (
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">Lunas</span>
                    ) : payment.month === monthsPassed + 1 ? (
                      <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">Jatuh Tempo</span>
                    ) : (
                      <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">Belum Jatuh Tempo</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
